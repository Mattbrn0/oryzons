/**
 * Validation et assainissement du formulaire de contact.
 *
 * Envoi des messages vers contact@oryzons.com :
 * - Définir `VITE_WEB3FORMS_ACCESS_KEY` (clé sur https://web3forms.com ) avec la boîte
 *   de réception **contact@oryzons.com** dans le tableau de bord → envoi réel par e-mail,
 *   objet = « Demande de devis » ou « Demande d'informations ».
 * - Sinon : `VITE_CONTACT_ENDPOINT` (+ optionnel `VITE_CONTACT_ACCESS_KEY`) pour un POST personnalisé.
 * - Sinon : ouverture du client mail (mailto) avec le même objet.
 *
 * La sécurité serveur (quota, filtrage) reste à charge du prestataire ou d’un backend dédié.
 */

export const PROJECT_TYPE_VALUES = [
  'vitrine',
  'refonte',
  'hebergement',
  'sur_mesure',
  'autre',
] as const

export type ProjectTypeValue = (typeof PROJECT_TYPE_VALUES)[number]
export type RequestKind = 'devis' | 'informations'

export const PROJECT_OPTIONS: { value: ProjectTypeValue; label: string }[] = [
  { value: 'vitrine', label: 'Création de site vitrine' },
  { value: 'refonte', label: 'Refonte de site existant' },
  { value: 'hebergement', label: 'Hébergement & maintenance' },
  { value: 'sur_mesure', label: 'Site personnalisé (sur mesure)' },
  { value: 'autre', label: 'Autre prestation (précisez)' },
]

export type ContactPayload = {
  requestKind: RequestKind
  name: string
  email: string
  phone: string
  company: string
  projectType: ProjectTypeValue | ''
  message: string
}

const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  company: 120,
  message: 5000,
} as const

/** Motif email raisonnable sans accepter des caractères dangereux pour les entêtes. */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

/** Retire les caractères de contrôle dangereux (sans regex littérale : compatible ESLint no-control-regex). */
function stripNullAndControl(s: string): string {
  let out = ''
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i)
    if (code <= 0x08 || code === 0x0b || code === 0x0c || (code >= 0x0e && code <= 0x1f) || code === 0x7f) {
      continue
    }
    out += s[i]!
  }
  return out
}

/** Champs courts : pas de retours à la ligne ni tabulations (évite les abus mailto / en-têtes). */
export function sanitizeText(s: string, max: number): string {
  return stripNullAndControl(s)
    .replace(/[\r\n\t\u00A0\u202F]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

export function sanitizeMultiline(s: string, max: number): string {
  return stripNullAndControl(s)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, max)
}

export function isValidEmail(email: string): boolean {
  if (email.length < 5 || email.length > LIMITS.email) return false
  if (email.includes('..') || email.startsWith('.') || email.includes('.@')) return false
  return EMAIL_RE.test(email)
}

/** Téléphone : chiffres et séparateurs courants uniquement (champ requis pour devis). */
export function isValidPhone(phone: string): boolean {
  const normalized = phone.replace(/[\s().+/-]/g, '')
  if (normalized.length < 8 || normalized.length > 15) return false
  return /^\d+$/.test(normalized)
}

export function isAllowedProjectType(v: string): v is ProjectTypeValue {
  return PROJECT_TYPE_VALUES.includes(v as ProjectTypeValue)
}

export type FieldErrors = Partial<Record<keyof ContactPayload | 'form', string>>

export function validateContactFields(raw: ContactPayload): { ok: true; data: ContactPayload } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {}

  const name = sanitizeText(raw.name, LIMITS.name)
  const message = sanitizeMultiline(raw.message, LIMITS.message)

  if (name.length < 2) errors.name = 'Indiquez au moins 2 caractères pour le nom.'

  if (raw.requestKind === 'informations') {
    if (message.length < 10) errors.message = 'Posez votre question en au moins 10 caractères.'
    if (Object.keys(errors).length > 0) return { ok: false, errors }
    return {
      ok: true,
      data: {
        requestKind: 'informations',
        name,
        email: '',
        phone: '',
        company: '',
        projectType: '',
        message,
      },
    }
  }

  const email = sanitizeText(raw.email, LIMITS.email).toLowerCase()
  const phone = sanitizeText(raw.phone.replace(/[^\d\s+()./-]/g, ''), LIMITS.phone)
  const company = sanitizeText(raw.company, LIMITS.company)

  if (!isValidEmail(email)) errors.email = 'Adresse e-mail invalide.'
  if (!isValidPhone(phone)) errors.phone = 'Indiquez un numéro de téléphone valide.'

  if (raw.projectType === '' || !isAllowedProjectType(raw.projectType)) {
    errors.projectType = 'Choisissez un type de projet.'
  }
  if (message.length < 10) errors.message = 'Décrivez votre projet en au moins 10 caractères.'

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    data: {
      requestKind: 'devis',
      name,
      email,
      phone,
      company,
      projectType: raw.projectType as ProjectTypeValue,
      message,
    },
  }
}

const SS_LAST = 'oryzons_contact_last'
const SS_COUNT = 'oryzons_contact_count'
const COOLDOWN_MS = 10_000
const MAX_SUBMISSIONS_PER_SESSION = 8

export function canSubmitNow(): { ok: true } | { ok: false; error: string } {
  try {
    const now = Date.now()
    const last = Number(sessionStorage.getItem(SS_LAST) || 0)
    if (now - last < COOLDOWN_MS) {
      return { ok: false, error: 'Veuillez patienter quelques secondes avant un nouvel envoi.' }
    }
    const count = Number(sessionStorage.getItem(SS_COUNT) || 0)
    if (count >= MAX_SUBMISSIONS_PER_SESSION) {
      return { ok: false, error: 'Trop de tentatives. Rechargez la page ou réessayez plus tard.' }
    }
  } catch {
    /* sessionStorage indisponible (navigateur privé strict) — on laisse passer */
  }
  return { ok: true }
}

export function recordSubmitAttempt(): void {
  try {
    sessionStorage.setItem(SS_LAST, String(Date.now()))
    const count = Number(sessionStorage.getItem(SS_COUNT) || 0)
    sessionStorage.setItem(SS_COUNT, String(count + 1))
  } catch {
    /* ignore */
  }
}

function mailtoLines(data: ContactPayload): string {
  if (data.requestKind === 'informations') {
    return [`Type : Demande d'informations`, `Nom : ${data.name}`, '', 'Question :', data.message].join('\n')
  }
  const pt = PROJECT_OPTIONS.find(o => o.value === data.projectType)?.label ?? ''
  const lines = [
    `Type : Demande de devis`,
    `Nom : ${data.name}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.phone}`,
    data.company ? `Entreprise : ${data.company}` : '',
    `Type de projet : ${pt}`,
    '',
    'Projet :',
    data.message,
  ]
  return lines.filter(Boolean).join('\n')
}

/** Objet du message : uniquement le type de demande (filtre dans la boîte mail). */
function emailSubject(data: ContactPayload): string {
  return data.requestKind === 'informations' ? "Demande d'informations" : 'Demande de devis'
}

const WEB3FORMS_SUBMIT = 'https://api.web3forms.com/submit'

type Web3FormsResponse = {
  success?: boolean
  message?: string
  body?: { message?: string; data?: unknown }
}

function web3Success(json: unknown): boolean {
  return Boolean(json && typeof json === 'object' && (json as Web3FormsResponse).success === true)
}

function web3ErrorDetail(json: unknown): string {
  if (!json || typeof json !== 'object') return ''
  const j = json as Web3FormsResponse
  if (typeof j.message === 'string' && j.message.trim()) return j.message.trim()
  const m = j.body?.message
  if (typeof m === 'string' && m.trim()) return m.trim()
  return ''
}

/**
 * N’accepte que HTTPS (ou http en local) pour limiter les schémas dangereux (javascript:, data:, etc.).
 * Les clés VITE_* sont visibles dans le bundle : une vraie clé secrète doit passer par un backend.
 */
export function isPermittedContactEndpoint(url: string): boolean {
  try {
    const u = new URL(url)
    if (u.protocol === 'https:') return true
    if (
      import.meta.env.DEV &&
      u.protocol === 'http:' &&
      (u.hostname === 'localhost' || u.hostname === '127.0.0.1')
    ) {
      return true
    }
    return false
  } catch {
    return false
  }
}

async function postWeb3Forms(data: ContactPayload, accessKey: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const msg = mailtoLines(data)
  // Corps aligné sur l’API Web3Forms : https://docs.web3forms.com/getting-started/api-reference
  const body: Record<string, string> = {
    access_key: accessKey,
    subject: emailSubject(data),
    name: data.name,
    message: msg,
  }
  if (data.requestKind === 'devis') {
    body.email = data.email
  }

  try {
    const res = await fetch(WEB3FORMS_SUBMIT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      mode: 'cors',
    })
    let parsed: unknown = null
    try {
      parsed = await res.json()
    } catch {
      parsed = null
    }

    if (web3Success(parsed)) {
      return { ok: true }
    }

    const detail = web3ErrorDetail(parsed)
    if (!res.ok) {
      return {
        ok: false,
        error: detail || "L'envoi a échoué. Écrivez-nous à contact@oryzons.com.",
      }
    }
    return {
      ok: false,
      error: detail || "L'envoi a échoué. Écrivez-nous à contact@oryzons.com.",
    }
  } catch {
    return { ok: false, error: 'Connexion impossible. Vérifiez le réseau ou contactez-nous par e-mail.' }
  }
}

/**
 * Priorité : Web3Forms (e-mail vers la boîte configurée, ex. contact@oryzons.com) → endpoint
 * personnalisé → mailto.
 */
export async function deliverContact(data: ContactPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const web3Key = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim()
  if (web3Key) {
    return postWeb3Forms(data, web3Key)
  }

  const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim()

  if (endpoint) {
    if (!isPermittedContactEndpoint(endpoint)) {
      return {
        ok: false,
        error: "L'envoi est mal configuré. Écrivez-nous à contact@oryzons.com.",
      }
    }
    const accessKey = (import.meta.env.VITE_CONTACT_ACCESS_KEY as string | undefined)?.trim()
    try {
      const payload: Record<string, string> = {
        request_kind: data.requestKind,
        name: data.name,
        message: mailtoLines(data),
        subject: emailSubject(data),
      }
      if (data.requestKind === 'devis') {
        payload.email = data.email
        payload.phone = data.phone
        payload.company = data.company
        payload.project_type = data.projectType
      }
      if (accessKey) payload.access_key = accessKey

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      })
      if (!res.ok) {
        return { ok: false, error: "L'envoi a échoué. Écrivez-nous à contact@oryzons.com." }
      }
      return { ok: true }
    } catch {
      return { ok: false, error: 'Connexion impossible. Vérifiez le réseau ou contactez-nous par e-mail.' }
    }
  }

  const body = encodeURIComponent(mailtoLines(data))
  const subject = encodeURIComponent(emailSubject(data))
  window.location.href = `mailto:contact@oryzons.com?subject=${subject}&body=${body}`
  return { ok: true }
}
