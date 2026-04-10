import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import HalftoneImage from './HalftoneImage'

type Billing = 'monthly' | 'annually'

type Plan = {
  id: 'starter' | 'professional' | 'genius'
  name: string
  desc: string
  setupFee: number
  monthly: number
  annually: number
  features: string[]
  cta: string
  featured?: boolean
}

const basePlans: Plan[] = [
  {
    id: 'starter',
    name: 'Site vitrine',
    desc: 'Un site clair et efficace pour présenter votre activité et capter des demandes.',
    setupFee: 800,
    monthly: 20,
    annually: 17,
    features: [
      "Page d’accueil",
      'Pages (jusqu’à 5)',
      'Formulaire de contact',
      'Responsive mobile / tablette',
      'SEO technique de base (balises, meta, sitemap)',
      'Support basique : assistance par mail pour bugs ou problèmes techniques',
      'Hébergement standard : serveur mutualisé sécurisé, sauvegardes automatiques',
    ],
    cta: 'Demander un devis',
    featured: true,
  },
  {
    id: 'professional',
    name: 'Refonte',
    desc: 'Modernisation d’un site existant : design actualisé, contenus clés et optimisation des performances.',
    setupFee: 700,
    monthly: 25,
    annually: 22,
    features: [
      'Audit rapide + recommandations',
      'Refonte UI des sections principales',
      'Optimisation de la performance et temps de chargement',
      'SEO technique de base + indexation Google',
      'Support étendu : assistance par mail + suivi des tickets, mises à jour du site incluses',
      'Hébergement premium : VPS ou cloud léger, sauvegardes quotidiennes, monitoring de performance',
    ],
    cta: 'Demander un devis',
  },
  {
    id: 'genius',
    name: 'Sur‑mesure / Premium',
    desc: 'Pour une marque ambitieuse : design premium, intégrations et évolutions régulières.',
    setupFee: 1200,
    monthly: 30,
    annually: 27,
    features: [
      'Design sur‑mesure (direction artistique complète)',
      'Pages supplémentaires + sections avancées (blog, portfolio, landing pages)',
      'Intégrations : CRM, newsletter, analytics avancé',
      'SEO complet + suivi analytics + reporting mensuel',
      'Support prioritaire : assistance mail + téléphone, modifications rapides, mises à jour régulières, gestion des urgences',
      'Hébergement haute performance : serveur dédié ou cloud performant, sauvegardes multiples, monitoring pro et sécurité renforcée',
    ],
    cta: 'Demander un devis',
  },
]

function PlanIcon({ id, className = '' }: { id: Plan['id']; className?: string }) {
  if (id === 'starter') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="3" y="3" width="10" height="10" rx="2.2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 6h4M6 8h4M6 10h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'professional') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M8 2.6l1.2 2.6 2.9.3-2.2 1.9.7 2.8L8 8.8l-2.6 1.4.7-2.8-2.2-1.9 2.9-.3L8 2.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5.1v5.8M5.1 8h5.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function Bullet({ className = '' }: { className?: string }) {
  return (
    <span className={`mt-[0.32rem] inline-flex size-2.5 shrink-0 items-center justify-center rounded-full border border-black/15 ${className}`}>
      <span className="size-1 rounded-full bg-black/15" />
    </span>
  )
}

function PlanFeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-2.5">
      {features.map(f => (
        <li key={f} className="flex gap-3 text-[0.8rem] font-light text-muted">
          <Bullet />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  )
}

function AnimatedCount({
  value,
  durationMs = 520,
  className = '',
}: {
  value: number
  durationMs?: number
  className?: string
}) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const from = prev.current
    const to = value
    prev.current = value

    if (raf.current) cancelAnimationFrame(raf.current)
    if (from === to) {
      // évite setState synchro dans un effect (lint) + garde la valeur cohérente
      raf.current = requestAnimationFrame(() => setDisplay(to))
      return () => {
        if (raf.current) cancelAnimationFrame(raf.current)
      }
    }

    const start = performance.now()
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = easeOutCubic(t)
      const next = Math.round(from + (to - from) * eased)
      setDisplay(next)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [value, durationMs])

  return <span className={className}>{display}</span>
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')

  const plans = useMemo(
    () =>
      basePlans.map(p => ({
        ...p,
        price: billing === 'monthly' ? p.monthly : p.annually,
        period: billing === 'monthly' ? '/mois' : '/mois',
        badge: billing === 'monthly' ? 'Abonnement' : 'Abonnement (annuel)',
      })),
    [billing],
  )

  return (
    <section id="pricing" className="relative isolate scroll-mt-20 min-h-svh overflow-hidden bg-white px-6 py-24 sm:px-8 sm:py-28 md:px-16">

      {/* Lady Justice — entre md et 2xl : gauche + miroir (regard vers la droite, piliers Process à droite) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[44vw] max-w-[560px] md:block 2xl:hidden">
        <div className="absolute inset-0 -scale-x-100">
          <HalftoneImage
            src="/lady-justice.png"
            grid={5}
            minVisibleRadius={0.2}
            thresholdNoise={0.035}
            toneGamma={1.1}
            dprCap={2}
            reveal="leftToRight"
            fit="containY"
            className="block h-full w-full"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 48%, rgba(255,255,255,0.92) 66%, rgba(255,255,255,1) 92%)',
          }}
        />
      </div>

      {/* Lady Justice — ≥2xl : droite (Process place les piliers à gauche → composition équilibrée, sans miroir) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[44vw] max-w-[560px] 2xl:block">
        <div className="absolute inset-0">
          <HalftoneImage
            src="/lady-justice.png"
            grid={5}
            minVisibleRadius={0.2}
            thresholdNoise={0.035}
            toneGamma={1.1}
            dprCap={2}
            reveal="rightToLeft"
            fit="containY"
            className="block h-full w-full"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 48%, rgba(255,255,255,0.92) 66%, rgba(255,255,255,1) 92%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="reveal mb-8 text-center">
          <h2
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="mx-auto max-w-[22ch] text-balance text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.08] text-ink"
          >
            Tarifs & <span className="text-ink">abonnements</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[72ch] text-[0.92rem] font-light leading-[1.8] text-muted">
            Des prix simples : un <span className="font-normal text-ink">forfait de création</span> + un{" "}
            <span className="font-normal text-ink">abonnement mensuel</span> qui inclut support, hébergement et maintenance.
          </p>

          <div className="mt-6 inline-flex items-center gap-1 rounded-xl bg-white px-1.5 py-1 shadow-[0_8px_22px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className={`rounded-lg px-3 py-2 text-[0.72rem] font-medium transition-colors ${
                billing === 'monthly' ? 'bg-[#f0f2f7] text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              Mensuel
            </button>
            <label className="mx-0.5 inline-flex cursor-pointer items-center">
              <span className="sr-only">Toggle billing period</span>
              <input
                type="checkbox"
                checked={billing === 'annually'}
                onChange={e => setBilling(e.target.checked ? 'annually' : 'monthly')}
                className="sr-only"
              />
              <span className="h-5 w-9 rounded-full bg-black/10 p-[2px] ring-1 ring-black/10 transition-colors">
                <span
                  className={`block size-4 rounded-full bg-white shadow transition-transform duration-200 ${
                    billing === 'annually' ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </span>
            </label>
            <button
              type="button"
              onClick={() => setBilling('annually')}
              className={`rounded-lg px-3 py-2 text-[0.72rem] font-medium transition-colors ${
                billing === 'annually' ? 'bg-[#f0f2f7] text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              Annuel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
            {plans.map(p => (
              <div
                key={p.id}
                className={`reveal flex flex-col rounded-[26px] p-6 transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.34,1.2,0.64,1)] hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.12)] ${
                  p.featured
                    ? 'bg-surface shadow-[0_18px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 hover:ring-black/10'
                    : 'bg-white shadow-[0_12px_26px_rgba(0,0,0,0.08)] ring-1 ring-black/5 hover:ring-black/10'
                }`}
              >
                <div className="flex items-center gap-2 text-ink">
                  <PlanIcon id={p.id} className="size-4 text-ink/70" />
                  <span className="text-[0.9rem] font-medium">{p.name}</span>
                </div>

                {/* Forfait + abonnement */}
                <div className="mt-5 rounded-2xl bg-white/60 p-4 ring-1 ring-black/5 lg:p-3.5">
                  <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="min-w-0 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle lg:text-[0.65rem] lg:tracking-[0.14em]">
                      Forfait création
                    </span>
                    <span className="shrink-0 whitespace-nowrap font-syne text-[1.55rem] font-extrabold leading-none tracking-[-0.04em] text-ink lg:text-[1.32rem]">
                      {p.setupFee.toLocaleString('fr-FR')}
                      {'\u202F'}€
                    </span>
                  </div>

                  <div className="mt-3 flex min-w-0 flex-wrap items-end justify-between gap-x-3 gap-y-1 border-t border-black/5 pt-3 lg:mt-2.5 lg:items-baseline lg:gap-1.5 lg:pt-2.5">
                    <div className="min-w-0 lg:flex-1">
                      <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle lg:text-[0.65rem] lg:tracking-[0.14em]">
                        Abonnement
                      </p>
                      <p className="mt-1 text-[0.78rem] font-light leading-snug text-muted lg:mt-0.5 lg:text-[0.7rem]">
                        Support • hébergement • maintenance
                      </p>
                    </div>
                    <div className="flex shrink-0 items-baseline gap-x-1.5 whitespace-nowrap lg:gap-1">
                      <span className="inline-flex shrink-0 items-baseline whitespace-nowrap font-syne text-[1.7rem] font-extrabold leading-none tracking-[-0.04em] text-ink lg:text-[1.4rem]">
                        <AnimatedCount value={p.price} />
                        {'\u202F'}€
                      </span>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={`${p.id}-${billing}-period`}
                          className="inline-flex shrink-0 pb-1 text-[0.78rem] font-light text-muted lg:pb-0.5 lg:text-[0.7rem]"
                          initial={{ y: 4, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -4, opacity: 0 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {p.period}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[0.8rem] font-light leading-[1.65] text-muted">
                  {p.desc}
                </p>

                <details className="group mt-5 rounded-2xl ring-1 ring-black/10 lg:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 text-[0.8rem] font-medium text-ink transition-colors hover:bg-black/[0.04] [&::-webkit-details-marker]:hidden">
                    <span>Voir ce qui est inclus</span>
                    <svg
                      className="size-4 shrink-0 text-ink/45 transition-transform duration-200 group-open:rotate-180"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="border-t border-black/10 px-4 pb-4 pt-3">
                    <PlanFeatureList features={p.features} />
                  </div>
                </details>

                <div className="mt-5 hidden lg:block">
                  <PlanFeatureList features={p.features} />
                </div>

                <div className="mt-auto pt-6">
                  {p.featured ? (
                    <a
                      href="#contact"
                      className="btn-hover inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 text-[0.8rem] font-medium text-white shadow-[0_10px_24px_rgba(17,24,39,0.28)]"
                    >
                      {p.cta}
                      <svg className="size-3.5 text-white/70" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="btn-hover inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-[0.8rem] font-medium text-ink shadow-[0_10px_24px_rgba(0,0,0,0.10)] ring-1 ring-black/10 transition-colors hover:bg-[#f6f7fb]"
                    >
                      Demander un devis
                      <svg className="size-3.5 text-ink/60" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
