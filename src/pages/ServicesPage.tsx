import { useEffect } from 'react'
import Pricing from '../components/Pricing'

function useRevealOnce() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function ServicesPage() {
  useRevealOnce()

  return (
    <main className="relative z-10 mx-auto max-w-[1100px] px-6 pb-20 pt-28 md:px-10 md:pb-28">
      <header className="reveal">
        <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-subtle">
          Prestations
        </span>
        <h1 className="mt-4 text-balance font-syne text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">
          Des services clairs, des formules simples.
        </h1>
        <p className="mt-4 max-w-[78ch] text-[0.95rem] font-light leading-[1.9] text-muted">
          Ici, vous retrouvez nos prestations expliquées plus en détail, ainsi que nos formules (forfait de création + abonnement).
        </p>
      </header>

      <section className="reveal mt-12 rounded-[26px] bg-white p-6 shadow-[0_12px_26px_rgba(0,0,0,0.08)] ring-1 ring-black/5 md:p-8">
        <h2 className="font-syne text-[1.25rem] font-extrabold tracking-[-0.02em] text-ink">
          Ce que nous faisons
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              title: 'Création de site',
              items: [
                'Site vitrine, landing page, pages services',
                'Design moderne, responsive',
                'Structure claire pour convertir',
              ],
            },
            {
              title: 'Refonte & optimisation',
              items: [
                'Modernisation visuelle + UX',
                'Optimisation performance',
                'Mise à niveau SEO technique',
              ],
            },
            {
              title: 'SEO & visibilité',
              items: [
                'Balises, meta, sitemap, indexation',
                'Bonnes pratiques éditoriales',
                'Suivi (selon formule)',
              ],
            },
            {
              title: 'Hébergement & maintenance',
              items: [
                'Mise en ligne, SSL, sauvegardes',
                'Mises à jour & sécurité',
                'Support (selon formule)',
              ],
            },
          ].map(block => (
            <div key={block.title} className="rounded-2xl bg-surface p-5 ring-1 ring-black/5">
              <h3 className="font-syne text-[1.05rem] font-bold text-ink">{block.title}</h3>
              <ul className="mt-3 space-y-2 text-[0.9rem] font-light leading-[1.8] text-muted">
                {block.items.map(it => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[0.45rem] inline-flex size-2.5 shrink-0 items-center justify-center rounded-full border border-black/15">
                      <span className="size-1 rounded-full bg-black/15" />
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <Pricing />
      </div>
    </main>
  )
}

