import { Link, useLocation } from 'react-router-dom'

const TITLES: Record<string, string> = {
  '/services': 'Prestations',
  '/support': 'Support',
  '/cgu': "Conditions générales d'utilisation",
  '/cgv': 'Conditions générales de vente',
}

export default function ComingSoonPage() {
  const { pathname } = useLocation()
  const label = TITLES[pathname] ?? 'Page'

  return (
    <main className="relative z-10 mx-auto max-w-[640px] px-6 pb-24 pt-28 md:px-10 md:pb-32 md:pt-32">
      <p className="text-center text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">{label}</p>
      <h1
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="mt-4 text-balance text-center text-[clamp(1.85rem,4.5vw,2.75rem)] leading-[1.12] text-ink"
      >
        Page en cours de création
      </h1>
      <p className="mt-5 text-center text-[0.95rem] font-light leading-[1.8] text-muted">
        Cette page sera bientôt disponible.
      </p>
      <div className="mt-10 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-[0.82rem] font-medium text-white no-underline shadow-[0_10px_24px_rgba(17,24,39,0.22)] transition-opacity hover:opacity-90"
        >
          Retour à l&apos;accueil
          <svg className="size-3.5 text-white/80" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </main>
  )
}
