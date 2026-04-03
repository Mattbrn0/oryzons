import { useEffect, useId, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'

const serif = { fontFamily: "'Instrument Serif', serif" } as const
const faqEase = [0.22, 1, 0.36, 1] as const
const FAQ_PAGE_SIZE = 10

type CategoryId = 'tout' | 'agence' | 'projet' | 'technique' | 'tarifs' | 'accompagnement'

type FaqEntry = {
  id: string
  category: Exclude<CategoryId, 'tout'>
  q: string
  a: string
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'tout', label: 'Tout' },
  { id: 'agence', label: 'Agence' },
  { id: 'projet', label: 'Projet' },
  { id: 'technique', label: 'Technique' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'accompagnement', label: 'Après livraison' },
]

const FAQ_DATA: FaqEntry[] = [
  /* ── Agence & confiance ── */
  
  {
    id: 'confiance-agence',
    category: 'agence',
    q: 'Pourquoi devrais-je vous faire confiance plutôt qu’à une autre agence ?',
    a: "Parce que nous privilégions la transparence (tarifs et périmètre affichés, devis explicite), des fondations techniques durables et un suivi honnête. Pas de promesses SEO irréalistes : nous nous engageons sur ce qui est livré dans nos offres — vitrine, refonte ou sur-mesure — avec le détail des services (hébergement, support, SEO selon l’offre).",
  },
  {
    id: 'entreprises-similaires',
    category: 'agence',
    q: 'Avez-vous déjà réalisé des sites pour des entreprises comme la mienne ?',
    a: "Nous accompagnons des indépendants, PME et marques qui veulent un site vitrine, une refonte ou une présence plus ambitieuse. Chaque secteur a ses codes : au cadrage, nous parlons de vos objectifs et de vos références pour aligner le projet sur votre réalité.",
  },
  {
    id: 'contact-probleme',
    category: 'agence',
    q: 'Est-ce que je peux vous contacter facilement en cas de problème ?',
    a: "Oui : formulaire de contact sur le site, e-mail et coordonnées affichées en pied de page. Selon votre formule, le support est par mail (formule vitrine) ou élargi (refonte / sur-mesure avec possibilité d’assistance téléphone sur l’offre la plus haute).",
  },
  {
    id: 'suivi-apres-ligne',
    category: 'agence',
    q: 'Proposez-vous un suivi après la mise en ligne ?',
    a: "Oui. Nos formules incluent un abonnement mensuel avec hébergement, sauvegardes et niveau de support adapté : du support mail de base sur la formule vitrine au suivi prioritaire et mises à jour plus poussées sur refonte et sur-mesure — comme détaillé sur la page Tarifs.",
  },
  {
    id: 'insatisfaction',
    category: 'agence',
    q: 'Que se passe-t-il si je ne suis pas satisfait ?',
    a: "Le cadrage et les jalons précisent ce qui est attendu ; nous ajustons dans le cadre des allers-retours prévus au devis. En cas de désaccord, la solution est le dialogue et, si besoin, les modalités contractuelles définies avant le démarrage. L’objectif est toujours un résultat professionnel et livrable.",
  },
  {
    id: 'distance-remote',
    category: 'agence',
    q: 'Travaillez-vous avec des clients situés loin géographiquement ?',
    a: "Oui. Visioconférence, e-mail et outils partagés suffisent pour avancer efficacement ; l’important est la clarté des briefs et des échéances.",
  },

  /* ── Prestations & types de sites ── */
  {
    id: 'types-sites',
    category: 'technique',
    q: 'Quels types de sites créez-vous ?',
    a: "Je me concentre sur les sites vitrines et présentations professionnelles : pages services, à-propos, portfolio, blog ou landing pour capter des demandes, plus les refontes et le sur-mesure pour des besoins plus riches — sans boutique en ligne. Je ne réalise pas de sites e-commerce (pas de panier, paiement en ligne, gestion de stocks). Présenter des offres ou un catalogue informatif, sans tunnel d’achat, reste possible. Création, hébergement, maintenance et SEO sont détaillés sur les pages Services et Tarifs.",
  },
  {
    id: 'vitrine-ecommerce',
    category: 'technique',
    q: 'Proposez-vous des boutiques en ligne ou des sites e-commerce ?',
    a: "Non : je ne crée pas de sites e-commerce — ni panier, ni commande en ligne, ni paiement intégré, ni gestion de stocks. Les formules « Site vitrine », « Refonte » et « Sur-mesure » couvrent une vitrine professionnelle : contacts, mise en avant de produits ou prestations à titre informatif, formulaires. Pour une vraie boutique en ligne, il vaut mieux s’adresser à un spécialiste e-commerce.",
  },
  {
    id: 'refonte-existant',
    category: 'projet',
    q: 'Proposez-vous la refonte de sites existants ?',
    a: "Oui : c’est l’offre « Refonte » — audit rapide, modernisation de l’interface des sections clés, performance, SEO technique de base et indexation Google, avec un hébergement et un support renforcés par rapport au vitrine.",
  },
  {
    id: 'seo-offre',
    category: 'technique',
    q: 'Est-ce que vous vous occupez du référencement (SEO) ?',
    a: "Toutes nos formules incluent au minimum un SEO technique de base (balises, meta, sitemap, bonnes pratiques). La formule sur-mesure / premium ajoute un accompagnement SEO plus complet, analytics et reporting mensuel. La rédaction de contenu ciblé peut s’ajouter sur devis.",
  },
  {
    id: 'logo-identite',
    category: 'projet',
    q: 'Est-ce que vous pouvez créer un logo ou une identité visuelle ?',
    a: "Nous pouvons définir une identité visuelle cohérente pour votre site (couleurs, typographies, style visuel) et intégrer un logo existant. Si vous avez besoin d’une création de logo sur mesure, nous pouvons vous accompagner ou collaborer avec un designer spécialisé.",
  },
  {
    id: 'hebergement-domaine',
    category: 'technique',
    q: 'Est-ce que vous proposez l’hébergement et le nom de domaine ?',
    a: "Oui. Chaque formule inclut un niveau d’hébergement adapté (mutualisé sécurisé pour le vitrine, VPS / cloud pour refonte, haute performance pour sur-mesure) avec sauvegardes. Le nom de domaine peut être géré ou enregistré à votre nom selon ce qui est prévu au devis.",
  },
  {
    id: 'gerer-apres',
    category: 'accompagnement',
    q: 'Est-ce que vous pouvez gérer mon site après sa création ?',
    a: "Oui : c’est l’objet de l’abonnement mensuel — hébergement, mises à jour selon la formule, assistance et interventions (niveau variable selon vitrine, refonte ou sur-mesure).",
  },
  {
    id: 'google-reseaux',
    category: 'technique',
    q: 'Est-ce que vous pouvez connecter mon site à Google ou aux réseaux sociaux ?',
    a: "Oui : liens vers vos profils, balises pour le partage, intégration d’outils d’analyse type Google (selon besoin), Search Console / indexation dans le cadre des offres. Les intégrations avancées (CRM, newsletter) relèvent surtout du sur-mesure.",
  },
  {
    id: 'sur-mesure',
    category: 'technique',
    q: 'Est-ce que vous proposez des solutions sur mesure ?',
    a: "Oui : l’offre « Sur-mesure / Premium » couvre un design poussé, des pages et sections avancées, des intégrations utiles (CRM, newsletter, analytics) — toujours hors e-commerce. SEO complet avec reporting, support prioritaire et hébergement haute performance, comme sur la page Tarifs.",
  },
  {
    id: 'responsive',
    category: 'technique',
    q: 'Le site sera-t-il adapté aux mobiles et tablettes ?',
    a: "Oui. Toutes les formules prévoient un site responsive mobile et tablette, avec une approche adaptée aux parcours tactiles et aux temps de chargement.",
  },
  {
    id: 'stack-tech',
    category: 'technique',
    q: 'Proposez-vous du sur-mesure, des outils no-code ou WordPress ?',
    a: "Nous choisissons la stack en fonction de la maintenance souhaitée, de votre budget et de vos évolutions : développement moderne durable, ou CMS lorsque c’est le meilleur compromis. C’est acté ensemble avant le développement.",
  },

  /* ── Tarifs & budget ── */
  {
    id: 'cout-site',
    category: 'tarifs',
    q: 'Combien coûte un site internet ?',
    a: "Sur la page Tarifs, les exemples de formules partent d’une mise en place à partir de 700 € (vitrine), 800 € (refonte) et 1 200 € (sur-mesure), avec un forfait mensuel pour hébergement et services associés (20 €, 25 € ou 30 € / mois en mensuel — réduction possible en paiement annuel). Le devis final dépend du nombre de pages et des options.",
  },
  {
    id: 'frais-mensuels',
    category: 'tarifs',
    q: 'Y a-t-il des frais mensuels ?',
    a: "Oui : l’abonnement couvre l’hébergement, les sauvegardes et le niveau de support prévu pour chaque offre. C’est ce qui permet de garder un site à jour, sécurisé et suivi après la livraison.",
  },
  {
    id: 'devis-gratuit',
    category: 'tarifs',
    q: 'Le devis est-il gratuit ?',
    a: "Oui : la demande et l’échange de cadrage pour établir un devis sont sans frais. Vous décidez ensuite si vous lancez le projet.",
  },
  {
    id: 'cout-maintenance',
    category: 'tarifs',
    q: 'Combien coûte la maintenance ?',
    a: "Elle est intégrée au forfait mensuel de votre formule (vitrine, refonte ou sur-mesure), avec un périmètre précis : mises à jour, type d’hébergement, niveau d’assistance. Les travaux hors forfait sont chiffrés avant intervention.",
  },
  {
    id: 'paiement-echelonne',
    category: 'tarifs',
    q: 'Puis-je payer en plusieurs fois ?',
    a: "En règle générale : acompte au démarrage, puis versements selon des jalons ou le solde à la livraison. Des facilités d’échelonnement peuvent se discuter sur devis pour les projets plus conséquents.",
  },
  {
    id: 'prix-heberg-domaine',
    category: 'tarifs',
    q: 'Est-ce que le prix inclut l’hébergement et le nom de domaine ?',
    a: "L’hébergement correspondant à votre formule est inclus dans l’abonnement mensuel. Le nom de domaine peut être inclus ou facturé selon ce qui est explicité dans votre proposition commerciale — nous le clarifions avant signature.",
  },
  {
    id: 'modif-apres-livraison',
    category: 'tarifs',
    q: 'Combien coûte une modification après la mise en ligne ?',
    a: "Les petites demandes peuvent relever du support selon votre offre. Les évolutions de contenu ou de fonctionnalité plus larges font l’objet d’un devis complémentaire ou d’un créneau prévu dans le contrat pour les niveaux supérieurs.",
  },
  {
    id: 'couts-caches',
    category: 'tarifs',
    q: 'Y a-t-il des coûts cachés ?',
    a: "Non : nous listons dans le devis la mise en place, l’abonnement, ce qui est inclus (pages, SEO, hébergement, support) et ce qui est en option. Pas de surprise sur les postes prévus contractuellement.",
  },
  {
    id: 'devis-flow',
    category: 'tarifs',
    q: 'Comment se déroule une demande de devis ?',
    a: "Vous remplissez le formulaire « Demande de devis » sur le site. Nous revenons vers vous sous 24h ouvrées en moyenne pour affiner le besoin, puis nous vous envoyons une proposition avec périmètre, prix et délais.",
  },
  {
    id: 'facturation-general',
    category: 'tarifs',
    q: 'Quelles modalités de facturation proposez-vous ?',
    a: "Acompte au lancement, puis jalons ou solde à la livraison selon la taille du projet ; détail dans le devis. L’abonnement démarre selon ce qui est convenu (souvent à la mise en ligne ou selon calendrier défini).",
  },

  /* ── Méthode & projet ── */
  {
    id: 'deroulement-creation',
    category: 'projet',
    q: 'Comment se déroule la création de mon site ?',
    a: "Cadrage et validation du périmètre, puis conception / maquettes si prévues, développement, contenu, recette ensemble, mise en ligne et formation minimale si un outil d’édition est livré. Les jalons sont posés avec vous pour garder le contrôle sur le résultat.",
  },
  {
    id: 'delais-creation',
    category: 'projet',
    q: 'Combien de temps faut-il pour créer un site ?',
    a: "Pour un site vitrine structuré, la livraison se fait en trois semaines maximum après cadrage, selon la complexité et votre réactivité sur les contenus. Refonte ou sur-mesure peut prendre plus longtemps : le planning figure au devis.",
  },
  {
    id: 'besoin-demarrer',
    category: 'projet',
    q: 'De quoi avez-vous besoin pour commencer ?',
    a: "Votre brief (objectifs, public, références), les textes ou une base à retravailler, vos visuels ou accès logo / charte, et les accès utiles (nom de domaine, hébergement actuel si refonte). Nous vous envoyons une checklist lors du cadrage.",
  },
  {
    id: 'suivi-avancement',
    category: 'projet',
    q: 'Est-ce que je peux suivre l’avancement du projet ?',
    a: "Oui : points d’étape par mail ou visio, validation des jalons avant de passer à la phase suivante, et visibilité sur ce qui est terminé ou en attente de votre côté (souvent les contenus).",
  },
  {
    id: 'tours-inclus',
    category: 'projet',
    q: 'Combien de modifications sont incluses ?',
    a: "Inclus dans le forfait : les allers-retour raisonnables sur la phase de recette définie au devis (par exemple ajustements de mise en page ou textes sur pages déjà livrées). Des refontes majeures ou de nouvelles pages sont traitées en supplément ou phase 2.",
  },
  {
    id: 'modifier-soi-meme',
    category: 'accompagnement',
    q: 'Est-ce que je peux modifier mon site moi-même ?',
    a: "Si nous livrons une solution avec édition (CMS ou outil adapté), oui — avec une courte formation ou une doc. Pour un site très statique, les changements mineurs passent souvent par nous ou une petite intervention.",
  },
  {
    id: 'vous-occupez-tout',
    category: 'projet',
    q: 'Est-ce que vous vous occupez de tout ?',
    a: "Nous gérons la technique, l’intégration, la mise en ligne et l’hébergement selon l’offre. Vous restez décisionnaire sur le contenu et les validations ; la rédaction ou les shootings peuvent être ajoutés au projet si besoin.",
  },
  {
    id: 'apres-formulaire',
    category: 'projet',
    q: "Que se passe-t-il après l'envoi du formulaire ?",
    a: "Vous recevez une confirmation technique d’envoi ; nous vous répondons par e-mail (ou téléphone pour un devis si vous l’avez demandé) dans les meilleurs délais, en général sous 24h ouvrées.",
  },
  {
    id: 'refonte-detail',
    category: 'projet',
    q: 'Que comprend une refonte de site ?',
    a: "Audit rapide, refonte UI des zones principales, amélioration des performances, SEO technique de base et mise en conformité indexation, hébergement premium et support étendu avec mises à jour incluses — selon l’offre Refonte affichée sur la page Tarifs.",
  },

  /* ── Sécurité, propriété, conformité ── */
  {
    id: 'propriete-site',
    category: 'technique',
    q: 'Est-ce que mon site m’appartient ?',
    a: "Le contenu et la marque vous appartiennent. Le code et les livrables vous sont transférés selon les termes du contrat ; l’hébergement peut rester sous notre gestion tant que l’abonnement est actif ou être basculé si vous reprenez la main.",
  },
  {
    id: 'securite',
    category: 'technique',
    q: 'Est-ce que mon site sera sécurisé ?',
    a: "Bonnes pratiques HTTPS, hébergement adapté, mises à jour et configuration soignée. Les formules premium renforcent monitoring et sécurité. Aucun site n’est « inviolable », mais nous réduisons les risques courants.",
  },
  {
    id: 'sauvegardes',
    category: 'technique',
    q: 'Est-ce que vous faites des sauvegardes ?',
    a: "Oui : sauvegardes automatiques sur hébergement mutualisé (vitrine) ; quotidiennes ou multiples selon refonte et sur-mesure — comme indiqué pour chaque niveau d’offre.",
  },
  {
    id: 'panne',
    category: 'technique',
    q: 'Que se passe-t-il si mon site tombe en panne ?',
    a: "Contactez-nous via les canaux prévus selon votre formule : diagnostic et remise en ligne prioritaire sur les offres avec support étendu ou prioritaire. Nous distinguons panne d’hébergement, bug applicatif ou problème tiers.",
  },
  {
    id: 'changer-hebergeur',
    category: 'technique',
    q: 'Puis-je changer d’hébergeur plus tard ?',
    a: "Oui, à condition de respecter les délais contractuels et de prévoir une migration propre (export, DNS, SSL). Nous pouvons réaliser ou accompagner cette migration sur devis.",
  },
  {
    id: 'rgpd',
    category: 'technique',
    q: 'Est-ce que mon site sera conforme au RGPD ?',
    a: "Nous intégrons les bases attendues : mentions légales, politique de confidentialité si vous fournissez le texte validé par un conseil, cookies et formulaires configurés proprement. La conformité juridique complète relève de votre responsabilité et de vos obligations métiers ; nous vous guidons sur les aspects techniques.",
  },
  {
    id: 'emails-pro',
    category: 'technique',
    q: 'Est-ce que vous gérez les e-mails professionnels ?',
    a: "La configuration des boîtes (MX, SPF, etc.) peut être assurée ou coordonnée avec votre hébergeur / outil mail selon le devis. La facturation des boîtes mail chez un tiers (Google Workspace, etc.) reste en général à votre charge.",
  },
]

/** Révélations au scroll — uniquement pour le haut de page (le reste se met à jour au filtre sans IO). */
function useFaqHeroReveal() {
  useEffect(() => {
    const root = document.getElementById('faq-hero')
    if (!root) return
    const els = root.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/\p{M}/gu, '')
}

function matchesQuery(entry: FaqEntry, raw: string): boolean {
  const q = stripDiacritics(raw.trim().toLowerCase())
  if (!q) return true
  const haystack = stripDiacritics(`${entry.q} ${entry.a}`.toLowerCase())
  const tokens = q.split(/\s+/).filter(Boolean)
  return tokens.every(t => haystack.includes(t))
}

function FaqAccordionItem({
  item,
  reduceMotion,
}: {
  item: FaqEntry
  reduceMotion: boolean | null
}) {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  const headingId = useId()
  const instant = Boolean(reduceMotion)
  const dur = instant ? 0 : 0.44

  return (
    <div
      className={`rounded-2xl border border-border bg-white ring-1 ring-black/[0.03] transition-[box-shadow] duration-300 ${
        open ? 'shadow-[0_12px_40px_rgba(0,0,0,0.08)]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen(o => !o)}
        className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span id={headingId} style={serif} className="text-[1.05rem] leading-snug text-ink sm:text-[1.12rem]">
          {item.q}
        </span>
        <span
          className={`mt-1.5 shrink-0 rounded-full border border-border bg-surface/80 p-1 text-muted transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        >
          <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 6.5 8 10.5 12 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <motion.div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          height: { duration: dur, ease: faqEase },
          opacity: { duration: instant ? 0 : dur * 0.55, ease: faqEase },
        }}
        style={{ overflow: 'hidden' }}
      >
        <div className="border-t border-border px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
          <p className="pt-4 text-[0.92rem] font-light leading-[1.85] text-muted">{item.a}</p>
        </div>
      </motion.div>
    </div>
  )
}

/** Paginé : remonter avec `key` (query + catégorie) pour réinitialiser le compteur sans effet. */
function FaqPaginatedList({
  filtered,
  reduceMotion,
}: {
  filtered: FaqEntry[]
  reduceMotion: boolean | null
}) {
  const [visibleCount, setVisibleCount] = useState(FAQ_PAGE_SIZE)
  const visibleEntries = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount])
  const hasMoreFaq = filtered.length > visibleCount
  const nextBatchSize = Math.min(FAQ_PAGE_SIZE, filtered.length - visibleCount)

  return (
    <>
      <motion.ul
        key="faq-list"
        role="list"
        className="space-y-3"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: faqEase }}
      >
        <AnimatePresence initial={false}>
          {visibleEntries.map((item, index) => (
            <motion.li
              key={item.id}
              layout
              className="list-none"
              initial={reduceMotion ? false : { opacity: 0, y: 22, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{
                duration: reduceMotion ? 0 : 0.38,
                delay: reduceMotion ? 0 : Math.min(index, 14) * 0.042,
                ease: faqEase,
                layout: { duration: reduceMotion ? 0 : 0.28, ease: faqEase },
              }}
            >
              <FaqAccordionItem item={item} reduceMotion={reduceMotion} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {hasMoreFaq ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount(c => Math.min(c + FAQ_PAGE_SIZE, filtered.length))}
            className="group flex size-12 items-center justify-center rounded-full border border-border bg-white/90 text-muted shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] transition-[box-shadow,transform,border-color,color] hover:border-ink/12 hover:text-ink hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] active:scale-[0.97]"
            aria-label={`Afficher ${nextBatchSize} question${nextBatchSize > 1 ? 's' : ''} de plus`}
          >
            <svg
              className="size-5 transition-transform duration-200 group-hover:translate-y-0.5"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <path d="M4 5.5 8 9.5 12 5.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ) : null}
    </>
  )
}

export default function FAQPage() {
  useFaqHeroReveal()
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId>('tout')

  const filtered = useMemo(() => {
    return FAQ_DATA.filter(e => {
      if (category !== 'tout' && e.category !== category) return false
      return matchesQuery(e, query)
    })
  }, [query, category])

  const listResetKey = `${category}:${query}`

  return (
    <div className="relative overflow-x-hidden bg-white text-ink">
      <section id="faq-hero" className="relative border-b border-border bg-surface px-6 pb-16 pt-28 sm:px-8 md:px-12 md:pb-20 md:pt-32 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(10,10,10,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="relative z-[1] mx-auto max-w-[720px] text-center">
          <p className="reveal text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">FAQ</p>
          <h1 style={serif} className="reveal mt-4 text-[clamp(2rem,4.5vw,3.1rem)] leading-[1.06] tracking-[-0.02em] text-ink">
            Questions fréquentes
          </h1>
          <p className="reveal mx-auto mt-5 max-w-[48ch] text-[0.95rem] font-light leading-[1.85] text-muted">
            Réponses sur les délais, la technique, les tarifs et le suivi de projet. Utilisez la recherche pour filtrer par mot-clé.
          </p>

          <div className="reveal mx-auto mt-10 max-w-[560px]" style={{ transitionDelay: '60ms' }}>
            <label htmlFor="faq-search" className="sr-only">
              Rechercher dans la FAQ
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" aria-hidden>
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ex. délai, SEO, maintenance, devis…"
                autoComplete="off"
                className="w-full rounded-full border border-black/10 bg-white py-3.5 pl-12 pr-14 text-[0.9rem] font-light text-ink shadow-[0_8px_28px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] transition-[box-shadow,border-color] placeholder:text-subtle focus:border-ink/20 focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[0.72rem] font-medium text-muted transition-colors hover:bg-black/[0.06] hover:text-ink"
                  aria-label="Effacer la recherche"
                >
                  Effacer
                </button>
              ) : null}
            </div>
          </div>

          <div
            className="reveal mx-auto mt-6 flex max-w-[640px] flex-wrap justify-center gap-2"
            style={{ transitionDelay: '100ms' }}
            role="tablist"
            aria-label="Filtrer par thème"
          >
            {CATEGORIES.map(cat => {
              const active = category === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-[0.78rem] font-medium transition-all ${
                    active
                      ? 'bg-[#111827] text-white shadow-[0_6px_20px_rgba(17,24,39,0.25)]'
                      : 'border border-border bg-white/80 text-muted ring-1 ring-black/[0.04] hover:border-ink/15 hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-8 md:px-12 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[720px]">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="faq-empty"
                role="status"
                className="rounded-2xl border border-dashed border-border bg-surface/80 px-6 py-14 text-center"
                initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: faqEase }}
              >
                <p style={serif} className="text-[1.25rem] text-ink">
                  Aucun résultat
                </p>
                <p className="mx-auto mt-3 max-w-[40ch] text-[0.9rem] font-light text-muted">
                  Essayez un autre mot-clé ou réinitialisez les filtres. Vous pouvez aussi nous écrire directement.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setCategory('tout')
                    }}
                    className="rounded-full border border-border bg-white px-5 py-2.5 text-[0.82rem] font-medium text-ink shadow-sm ring-1 ring-black/[0.04] transition-colors hover:bg-[#f6f7fb]"
                  >
                    Réinitialiser
                  </button>
                  <Link
                    to={{ pathname: '/', hash: 'contact' }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-[0.82rem] font-medium text-white no-underline shadow-[0_10px_24px_rgba(17,24,39,0.22)] transition-opacity hover:opacity-92"
                  >
                    Contacter Oryzons
                  </Link>
                </div>
              </motion.div>
            ) : (
              <FaqPaginatedList key={listResetKey} filtered={filtered} reduceMotion={reduceMotion} />
            )}
          </AnimatePresence>

          <div className="mx-auto mt-16 max-w-[560px] rounded-2xl border border-border bg-surface/90 p-8 text-center ring-1 ring-black/[0.04]">
            <p style={serif} className="text-[1.35rem] leading-snug text-ink">
              Une question plus précise ?
            </p>
            <p className="mx-auto mt-3 max-w-[42ch] text-[0.9rem] font-light text-muted">
              Écrivez-nous : nous vous répondons sous 24h ouvrées en moyenne.
            </p>
            <Link
              to={{ pathname: '/', hash: 'contact' }}
              className="btn-hover mt-6 inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-2.5 text-[0.82rem] font-medium text-white no-underline shadow-[0_12px_28px_rgba(17,24,39,0.22)]"
            >
              Formulaire de contact
              <svg className="size-3.5 text-white/80" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
