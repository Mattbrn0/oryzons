import { Link } from 'react-router-dom'

const serif = { fontFamily: "'Instrument Serif', serif" } as const

type NavItem = { to: string; hash?: string; label: string }

const principal: NavItem[] = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/services', label: 'Services détaillés' },
  { to: '/FAQ', label: 'FAQ' },
]

const accueilSections: NavItem[] = [
  { to: '/', hash: 'services', label: 'Prestations (accueil)' },
  { to: '/', hash: 'a-propos', label: 'Notre démarche (accueil)' },
  { to: '/', hash: 'pricing', label: 'Tarifs & abonnements' },
  { to: '/', hash: 'contact', label: 'Contact / devis' },
]

const ressources: NavItem[] = [
  { to: '/FAQ', hash: 'conseils-digitaux', label: 'Conseils digitaux' },
  { to: '/support', label: 'Support' },
]

const legal: NavItem[] = [
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/cgu', label: 'Conditions générales d’utilisation' },
  { to: '/cgv', label: 'Conditions générales de vente' },
  { to: '/plan-du-site', label: 'Plan du site (cette page)' },
]

function NavCard({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/50 px-5 py-6 ring-1 ring-black/[0.04] sm:px-6 sm:py-7">
      <h2 className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-subtle">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map(({ to, hash, label }) => (
          <li key={`${to}${hash ?? ''}-${label}`}>
            <Link
              to={{ pathname: to, hash: hash ? `#${hash}` : undefined }}
              className="text-[0.9rem] font-light text-muted no-underline transition-colors hover:text-ink"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 pb-28 pt-28 md:px-10 md:pb-36 md:pt-32">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Navigation</p>
      <h1 style={serif} className="mt-4 text-balance text-[clamp(1.85rem,4vw,2.55rem)] leading-[1.12] text-ink">
        Plan du site
      </h1>
      <p className="mt-4 max-w-[56ch] text-[0.95rem] font-light leading-[1.85] text-muted">
        Accédez rapidement aux pages principales d’Oryzons — création de sites, hébergement, maintenance, SEO et accompagnement à{' '}
        <span className="font-normal text-ink">Lyon</span> et en France.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <NavCard title="Pages" items={principal} />
        <NavCard title="Accueil (sections)" items={accueilSections} />
        <NavCard title="Ressources" items={ressources} />
        <NavCard title="Informations légales" items={legal} />
      </div>

      <p className="mt-12 text-[0.82rem] font-light leading-[1.7] text-muted">
        Une question ou un projet&nbsp;? Écrivez-nous via la section{' '}
        <Link to={{ pathname: '/', hash: '#contact' }} className="font-medium text-ink underline underline-offset-2 hover:no-underline">
          Contact
        </Link>
        {' '}sur l’accueil.
      </p>
    </div>
  )
}
