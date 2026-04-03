#!/usr/bin/env bash
#
# backup.sh — Sauvegardes automatisées /var/www (+ MySQL/MariaDB optionnel, Ubuntu / NGINX)
#
# Par défaut : uniquement les fichiers sous /var/www (sites vitrine sans BDD, etc.).
# Pour activer les dumps MySQL : BACKUP_MYSQL=1 + config client (voir ci-dessous).
#
# Usage:
#   sudo ./backup.sh
#   sudo BACKUP_MYSQL=1 ./backup.sh
#   sudo BACKUP_RSYNC_TARGET=user@serveur:/chemin/backups ./backup.sh
#   sudo ./backup.sh --rsync user@serveur:/chemin/backups
#
# Prérequis MySQL (uniquement si BACKUP_MYSQL=1) — mot de passe jamais sur la ligne de commande :
#   install -m 600 /dev/null /root/.backup-my.cnf
#   printf '[client]\nuser=backup\npassword=VOTRE_MDP\nhost=127.0.0.1\n' > /root/.backup-my.cnf
#   Ou : mysql_config_editor set --login-path=backup --host=localhost --user=backup -p
#   Puis : export MYSQL_LOGIN_PATH=backup (ou MYSQL_DEFAULTS_FILE=/root/.backup-my.cnf)
#
# Cron (exemple 2h du matin, root) — fichiers seuls :
#   0 2 * * * /chemin/absolu/backup.sh >> /home/backups/logs/cron.log 2>&1
# Avec MySQL :
#   0 2 * * * BACKUP_MYSQL=1 /chemin/absolu/backup.sh >> /home/backups/logs/cron.log 2>&1
#
# Dépendances : bash, tar, gzip, find, date ; mysql/mysqldump si BACKUP_MYSQL=1 ; rsync (optionnel --rsync)
#

set -u

readonly SCRIPT_NAME="$(basename "$0")"
readonly BACKUP_ROOT="${BACKUP_ROOT:-/home/backups}"
readonly DIRS_FILES="${BACKUP_ROOT}/files"
readonly DIRS_DATABASES="${BACKUP_ROOT}/databases"
readonly DIRS_LOGS="${BACKUP_ROOT}/logs"
readonly LOG_FILE="${DIRS_LOGS}/backup.log"
readonly RETENTION_DAYS="${RETENTION_DAYS:-7}"
readonly WWW_ROOT="${WWW_ROOT:-/var/www}"

# Fichier d’identifiants MySQL (recommandé : chmod 600, propriétaire root)
readonly MYSQL_DEFAULTS_FILE="${MYSQL_DEFAULTS_FILE:-/root/.backup-my.cnf}"
# Si vous utilisez mysql_config_editor, définir MYSQL_LOGIN_PATH=backup et laisser MYSQL_DEFAULTS_FILE vide
readonly MYSQL_LOGIN_PATH="${MYSQL_LOGIN_PATH:-}"
# 0 = ne pas sauvegarder MySQL (défaut, ex. sites vitrine statiques). 1 ou yes = activer les dumps.
readonly BACKUP_MYSQL="${BACKUP_MYSQL:-0}"

RSYNC_TARGET="${BACKUP_RSYNC_TARGET:-}"
ERRORS=0

# ---------------------------------------------------------------------------
# journalisation
# ---------------------------------------------------------------------------

log() {
  local line="[$(date -Iseconds)] $*"
  printf '%s\n' "$line" | tee -a "$LOG_FILE"
}

log_error() {
  local line="[$(date -Iseconds)] ERREUR: $*"
  printf '%s\n' "$line" | tee -a "$LOG_FILE" >&2
}

ensure_log_writable() {
  mkdir -p "$DIRS_LOGS"
  if [[ ! -f "$LOG_FILE" ]]; then
    touch "$LOG_FILE" || exit 1
  fi
  if [[ ! -w "$LOG_FILE" ]]; then
    printf '%s: impossible d’écrire dans %s\n' "$SCRIPT_NAME" "$LOG_FILE" >&2
    exit 1
  fi
}

# ---------------------------------------------------------------------------
# utilitaires
# ---------------------------------------------------------------------------

mysql_base_cmd() {
  if [[ -n "$MYSQL_LOGIN_PATH" ]]; then
    mysql --login-path="$MYSQL_LOGIN_PATH" "$@"
  else
    mysql --defaults-extra-file="$MYSQL_DEFAULTS_FILE" "$@"
  fi
}

mysqldump_base_cmd() {
  if [[ -n "$MYSQL_LOGIN_PATH" ]]; then
    mysqldump --login-path="$MYSQL_LOGIN_PATH" "$@"
  else
    mysqldump --defaults-extra-file="$MYSQL_DEFAULTS_FILE" "$@"
  fi
}

mysql_backup_enabled() {
  case "${BACKUP_MYSQL:-0}" in
    1 | yes | true | TRUE | Yes | YES | on | ON) return 0 ;;
    *) return 1 ;;
  esac
}

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --rsync)
        if [[ $# -lt 2 ]]; then
          printf '%s: --rsync nécessite une cible user@hôte:/chemin\n' "$SCRIPT_NAME" >&2
          exit 1
        fi
        RSYNC_TARGET="$2"
        shift 2
        ;;
      -h | --help)
        sed -n '1,35p' "$0"
        exit 0
        ;;
      *)
        printf '%s: argument inconnu: %s\n' "$SCRIPT_NAME" "$1" >&2
        exit 1
        ;;
    esac
  done
}

rotate_old_files() {
  log "Rotation : suppression des fichiers de plus de ${RETENTION_DAYS} jours dans files/ et databases/"
  local deleted=0
  while IFS= read -r -d '' f; do
    rm -f "$f" && deleted=$((deleted + 1)) || log_error "Échec suppression $f"
  done < <(find "$DIRS_FILES" -type f \( -name '*.tar.gz' -o -name '*.tgz' \) -mtime "+${RETENTION_DAYS}" -print0 2>/dev/null)
  while IFS= read -r -d '' f; do
    rm -f "$f" && deleted=$((deleted + 1)) || log_error "Échec suppression $f"
  done < <(find "$DIRS_DATABASES" -type f -name '*.sql.gz' -mtime "+${RETENTION_DAYS}" -print0 2>/dev/null)
  log "Rotation terminée (${deleted} fichier(s) supprimé(s), approximation)."
}

backup_www() {
  local stamp="$1"
  local archive="${DIRS_FILES}/www-${stamp}.tar.gz"

  if [[ ! -d "$WWW_ROOT" ]]; then
    log_error "Répertoire $WWW_ROOT introuvable — sauvegarde fichiers ignorée."
    ERRORS=$((ERRORS + 1))
    return 1
  fi

  log "Sauvegarde des sites (tar.gz) : $WWW_ROOT -> $archive"
  if tar -czf "$archive" -C "$WWW_ROOT" . 2>>"$LOG_FILE"; then
    log "Archive fichiers OK : $(du -h "$archive" | cut -f1)"
    return 0
  fi
  log_error "Échec création archive $archive"
  rm -f "$archive"
  ERRORS=$((ERRORS + 1))
  return 1
}

should_skip_db() {
  local db="$1"
  case "$db" in
    information_schema | performance_schema) return 0 ;;
    *) return 1 ;;
  esac
}

backup_databases() {
  local stamp="$1"

  if [[ -z "$MYSQL_LOGIN_PATH" && ! -f "$MYSQL_DEFAULTS_FILE" ]]; then
    log_error "Aucun accès MySQL configuré (${MYSQL_DEFAULTS_FILE} absent et MYSQL_LOGIN_PATH vide). Bases ignorées."
    ERRORS=$((ERRORS + 1))
    return 1
  fi

  if [[ -z "$MYSQL_LOGIN_PATH" ]]; then
    local mode perm
    mode=$(stat -c '%a' "$MYSQL_DEFAULTS_FILE" 2>/dev/null || echo '')
    if [[ "$mode" != "600" && "$mode" != "400" ]]; then
      log "Avertissement : permissions recommandées 600 ou 400 pour $MYSQL_DEFAULTS_FILE (actuel : ${mode:-inconnu})"
    fi
  fi

  log "Liste des bases (dump individuel, poursuite en cas d’échec partiel)…"
  local databases
  if ! databases="$(mysql_base_cmd -N -e 'SHOW DATABASES;' 2>>"$LOG_FILE")"; then
    log_error "Impossible de lister les bases MySQL."
    ERRORS=$((ERRORS + 1))
    return 1
  fi

  local db ok=0 fail=0
  while IFS= read -r db; do
    [[ -z "$db" ]] && continue
    if should_skip_db "$db"; then
      log "  (ignoré) $db"
      continue
    fi
    local out="${DIRS_DATABASES}/${db}-${stamp}.sql.gz"
    log "  Dump : $db -> $(basename "$out")"
    mysqldump_base_cmd \
      --single-transaction \
      --quick \
      --routines \
      --events \
      --triggers \
      --databases "$db" 2>>"$LOG_FILE" | gzip -c >"$out"
    local -a ps=("${PIPESTATUS[@]}")
    if [[ "${ps[0]}" -eq 0 && "${ps[1]}" -eq 0 ]]; then
      ok=$((ok + 1))
    else
      log_error "Échec dump base : $db (mysqldump=${ps[0]:-?}, gzip=${ps[1]:-?})"
      rm -f "$out"
      fail=$((fail + 1))
      ERRORS=$((ERRORS + 1))
    fi
  done <<<"$databases"

  log "Bases terminées : $ok OK, $fail échec(s)."
}

sync_remote() {
  local target="$1"
  if ! command -v rsync >/dev/null 2>&1; then
    log_error "rsync non installé — synchronisation distante ignorée."
    ERRORS=$((ERRORS + 1))
    return 1
  fi

  log "Synchronisation rsync vers : $target"
  # Note : clé SSH déployée (authorized_keys) pour une exécution sans mot de passe.
  # Créez sur le distant : .../backups/files/ et .../backups/databases/ ou utilisez un chemin unique.
  local r=0
  if ! rsync -az "${DIRS_FILES}/" "${target}/files/" 2>>"$LOG_FILE"; then
    r=1
  fi
  if ! rsync -az "${DIRS_DATABASES}/" "${target}/databases/" 2>>"$LOG_FILE"; then
    r=1
  fi
  if [[ "$r" -eq 0 ]]; then
    log "rsync terminé avec succès."
    return 0
  fi
  log_error "Échec rsync vers $target (voir $LOG_FILE)"
  ERRORS=$((ERRORS + 1))
  return 1
}

# ---------------------------------------------------------------------------
# principal
# ---------------------------------------------------------------------------

main() {
  parse_args "$@"

  umask 077
  mkdir -p "$DIRS_FILES" "$DIRS_DATABASES" "$DIRS_LOGS"
  ensure_log_writable

  local stamp
  stamp="$(date +'%Y-%m-%d_%H%M%S')"

  log "========== Début sauvegarde ($SCRIPT_NAME) =========="
  log "Racine : $BACKUP_ROOT | Sites : $WWW_ROOT | Rétention : ${RETENTION_DAYS} jours | MySQL : $(mysql_backup_enabled && echo activé || echo désactivé)"

  backup_www "$stamp"
  if mysql_backup_enabled; then
    backup_databases "$stamp"
  else
    log "Sauvegarde MySQL ignorée (BACKUP_MYSQL=${BACKUP_MYSQL} — mettre 1 ou yes pour activer + fichier /root/.backup-my.cnf ou MYSQL_LOGIN_PATH)."
  fi
  rotate_old_files

  if [[ -n "$RSYNC_TARGET" ]]; then
    sync_remote "$RSYNC_TARGET"
  fi

  log "========== Fin sauvegarde =========="
  if [[ "$ERRORS" -eq 0 ]]; then
    log "Backup completed successfully"
    printf '\n%s\n' "Backup completed successfully"
    return 0
  fi
  log "Backup completed with errors (compteur interne: $ERRORS)"
  printf '\n%s\n' "Backup completed with errors"
  return 1
}

main "$@"
