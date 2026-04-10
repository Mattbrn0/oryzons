import { Link } from 'react-router-dom'
import { LEGAL_LAST_UPDATED } from '../lib/legalEntity'

const serif = { fontFamily: "'Instrument Serif', serif" } as const

type Props = {
  eyebrow: string
  title: string
  children: React.ReactNode
}

export default function LegalDocumentLayout({ eyebrow, title, children }: Props) {
  return (
    <div className="mx-auto max-w-[720px] px-6 pb-28 pt-28 md:px-10 md:pb-36 md:pt-32">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">{eyebrow}</p>
      <h1 style={serif} className="mt-4 text-balance text-[clamp(1.85rem,4vw,2.55rem)] leading-[1.12] text-ink">
        {title}
      </h1>
      <p className="mt-3 text-[0.82rem] font-light text-muted">
        Dernière mise à jour&nbsp;: {LEGAL_LAST_UPDATED}
      </p>

      <article className="mt-12 border-t border-border pt-10 text-[0.92rem] font-light leading-[1.85] text-muted [&_strong]:font-medium [&_strong]:text-ink">
        {children}
      </article>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-border pt-10">
        <Link
          to="/plan-du-site"
          className="text-[0.82rem] font-medium text-ink no-underline underline-offset-4 hover:underline"
        >
          Plan du site
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[0.82rem] font-medium text-ink no-underline underline-offset-4 hover:underline"
        >
          Accueil
          <svg className="size-3.5 text-ink/55" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-[1.05rem] font-medium text-ink">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}
