import { useEffect } from 'react'
import HalftoneImage from '../components/HalftoneImage'

const serif = { fontFamily: "'Instrument Serif', serif" }

const features = [
  {
    title: 'Identités digitales',
    desc: 'Une direction, une intention, une signature. Chaque détail sert votre vision.',
    icon: (
      <svg className="size-4 text-ink" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 2.5l1.6 4.7h4.9l-4 2.9 1.5 4.7-4-2.9-4 2.9 1.5-4.7-4-2.9h4.9L10 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Expériences',
    desc: 'Transformer une idée en expérience : claire, fluide, mémorable.',
    icon: (
      <svg className="size-4 text-ink" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M6.5 3.5h7A2 2 0 0 1 15.5 5.5v9A2 2 0 0 1 13.5 16.5h-7A2 2 0 0 1 4.5 14.5v-9A2 2 0 0 1 6.5 3.5Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 7.2h6M7 10h6M7 12.8h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Fondations solides',
    desc: 'Une base technique précise, durable, pensée pour grandir avec vous.',
    icon: (
      <svg className="size-4 text-ink" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M5 4.5h10v12H5v-12Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.2 7h5.6M7.2 9.8h5.6M7.2 12.6h3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
] as const

function useRevealOnce() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function AboutPage() {
  useRevealOnce()

  return (
    <div className="relative min-h-svh bg-white">
      {/* Fond doux (comme la référence) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 520px at 50% 20%, rgba(10,10,10,0.06), rgba(10,10,10,0) 62%), radial-gradient(900px 420px at 74% 70%, rgba(10,10,10,0.035), rgba(10,10,10,0) 64%)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(to right, rgba(10,10,10,0.25) 1px, transparent 1px)', backgroundSize: '180px 100%' }} />
      </div>

      {/* HERO (plein écran, comme la home) */}
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
        {/* Image de fond (statue) en points (canvas) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[92svh] w-[92svh] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.22] md:opacity-[0.26]">
            <HalftoneImage
              src="/about-hero-statue.png"
              grid={6}
              reveal="edges"
              fit="contain"
              className="block h-full w-full"
            />
          </div>
          {/* Fade pour éviter que l’image soit trop présente derrière le texte */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 50% at 50% 44%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 55%, rgba(255,255,255,0.92) 78%, rgba(255,255,255,1) 100%)',
            }}
          />
        </div>

        {/* Voile radial — lisibilité au centre */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: 'radial-gradient(ellipse 52% 42% at 50% 50%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.82) 38%, rgba(255,255,255,0.30) 65%, rgba(255,255,255,0) 82%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <h1
            style={serif}
            className="anim-title text-[clamp(2.6rem,5.2vw,4.2rem)] leading-[1.02] tracking-[-0.02em] text-ink"
          >
            L’histoire d’Oryzons
          </h1>

          <p className="anim-subtitle mt-6 max-w-[46ch] text-[0.95rem] font-light leading-[1.9] text-muted md:text-[1rem]">
            Oryzons est né d’une conviction simple&nbsp;:
            <span className="font-normal text-ink"> un site internet n’est pas seulement un outil, c’est une vision.</span>
          </p>

          <a
            href="#origine"
            className="btn-glass-dark anim-fade-2 mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[0.82rem] font-medium"
          >
            Découvrir l’histoire
            <svg className="size-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 2.5v8.3M7 10.8l-3-3M7 10.8l3-3" />
            </svg>
          </a>
        </div>

        {/* Indice de scroll */}
        <div className="anim-fade-5 absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-subtle">
          <span>Scroll</span>
          <div className="anim-scroll-line h-12 w-px bg-subtle/50" />
        </div>
      </section>

      {/* Contenu sous le hero */}
      <main className="relative z-10 mx-auto max-w-[1060px] px-3 pb-16 md:px-4 md:pb-24">
        {/* Sections (ancres navbar) */}
        <section id="origine" className="scroll-mt-28 pb-8 pt-14 md:scroll-mt-36 md:pb-10">
          <div className="mx-auto max-w-[880px]">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Origine</p>
            <h2 style={serif} className="mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.06] text-ink">
              Un site internet n’est pas seulement un outil, c’est une œuvre.
            </h2>
            <div className="mt-6 space-y-5 text-[0.95rem] font-light leading-[1.95] text-muted">
              <p>
                Dans un monde où tout va vite, où les sites se ressemblent, où la technologie devient parfois froide et impersonnelle, j’ai voulu créer une approche différente.
                Une approche où chaque projet est pensé comme une création unique, avec une intention, une identité et une direction.
              </p>
              <p>
                Je suis développeur web indépendant, passionné par la création digitale. Mais mon objectif n’a jamais été simplement de coder des pages ou d’assembler des fonctionnalités.
              </p>
              <p>
                Mon rôle est de <span className="font-normal text-ink">donner un sens</span> à votre présence digitale. De transformer une idée en expérience. De faire de votre site une signature.
              </p>
            </div>
          </div>
        </section>

        <section className="reveal mt-10 border-t border-border pt-10 md:mt-14">
          <div className="mx-auto max-w-[980px]">
            <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
              {features.map((f, idx) => (
                <div key={f.title} className="group px-2 py-10 md:px-8 md:py-0" style={{ transitionDelay: `${idx * 90}ms` }}>
                  <div className="flex items-center justify-center gap-3 md:justify-start">
                    <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-white">
                      {f.icon}
                    </span>
                    <p className="text-[0.8rem] font-medium text-ink">{f.title}</p>
                  </div>
                  <p className="mt-4 text-center text-[0.86rem] font-light leading-[1.8] text-muted md:text-left">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="david" className="scroll-mt-28 border-t border-border pb-8 pt-14 md:scroll-mt-36 md:pb-10">
          <div className="mx-auto max-w-[880px]">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Le David — la maîtrise</p>
            <h2 style={serif} className="mt-5 text-[clamp(1.7rem,3.1vw,2.5rem)] leading-[1.08] text-ink">
              Révéler le potentiel d’une marque.
            </h2>
            <div className="mt-6 space-y-5 text-[0.95rem] font-light leading-[1.95] text-muted">
              <p>
                Le David représente la précision, la discipline et la maîtrise d’un art. Michel-Ange n’a pas simplement sculpté une statue. Il a révélé ce qui existait déjà dans la matière.
              </p>
              <p>
                C’est exactement ma vision du développement web&nbsp;: je ne crée pas seulement un site, je révèle le potentiel d’une marque.
              </p>
            </div>
          </div>
        </section>

        <section id="adam" className="scroll-mt-28 border-t border-border pb-8 pt-14 md:scroll-mt-36 md:pb-10">
          <div className="mx-auto max-w-[880px]">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">La Création d’Adam — l’étincelle</p>
            <h2 style={serif} className="mt-5 text-[clamp(1.7rem,3.1vw,2.5rem)] leading-[1.08] text-ink">
              Le moment où tout commence.
            </h2>
            <div className="mt-6 space-y-5 text-[0.95rem] font-light leading-[1.95] text-muted">
              <p>
                Cette œuvre symbolise le passage de l’idée à la vie&nbsp;: la connexion entre une vision et sa réalisation. Dans le digital, ce moment correspond à la naissance d’un projet.
              </p>
              <p>
                Une idée devient une présence. Une entreprise devient visible. Chaque site est une création.
              </p>
            </div>
          </div>
        </section>

        <section id="nom" className="scroll-mt-28 border-t border-border pb-8 pt-14 md:scroll-mt-36 md:pb-10">
          <div className="mx-auto max-w-[880px]">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Pourquoi le nom “Oryzons”&nbsp;?</p>
            <h2 style={serif} className="mt-5 text-[clamp(1.7rem,3.1vw,2.5rem)] leading-[1.08] text-ink">
              Un horizon… transformé volontairement.
            </h2>
            <div className="mt-6 space-y-5 text-[0.95rem] font-light leading-[1.95] text-muted">
              <p>
                Le nom Oryzons vient du mot <span className="font-normal text-ink">Horizons</span>. Un horizon représente une direction, une vision, une possibilité, un futur.
                Mais Oryzons n’est pas seulement un horizon&nbsp;: le mot a été transformé volontairement.
              </p>
              <p>
                Le <span className="font-normal text-ink">“O”</span> symbolise un cycle, un point de départ, une globalité, une vision complète.
                Le <span className="font-normal text-ink">“ryz”</span> est une signature unique, moderne et technologique — un nom qui ne ressemble à aucun autre.
              </p>
              <p>
                Oryzons signifie&nbsp;: une nouvelle vision, un nouveau départ, un nouveau champ des possibles.
              </p>
            </div>
          </div>
        </section>

        <section id="etoile" className="scroll-mt-28 border-t border-border pb-20 pt-14 md:scroll-mt-36 md:pb-28">
          <div className="mx-auto max-w-[880px]">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Pourquoi une étoile comme logo&nbsp;?</p>
            <h2 style={serif} className="mt-5 text-[clamp(1.7rem,3.1vw,2.5rem)] leading-[1.08] text-ink">
              Vous guider dans votre transformation digitale.
            </h2>
            <div className="mt-6 space-y-5 text-[0.95rem] font-light leading-[1.95] text-muted">
              <p>
                L’étoile est un symbole universel. Elle représente la direction, la guidance, l’excellence, l’ambition, la lumière dans l’obscurité.
                Depuis toujours, les étoiles servent à s’orienter — elles montrent le chemin.
              </p>
              <p>
                Dans Oryzons, l’étoile signifie vous guider dans votre transformation digitale. Elle symbolise aussi la créativité, l’innovation, la précision et la constance.
              </p>
              <p>
                Une étoile n’est jamais immobile. Elle rayonne. Comme une marque forte.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-white/60 px-6 py-6 backdrop-blur">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">La philosophie d’Oryzons</p>
                <p className="mt-4 text-[0.95rem] font-light leading-[1.95] text-muted">
                  Je ne crée pas simplement des sites internet. Je crée des identités digitales, des expériences, des fondations solides, des outils qui ont du sens.
                  Chaque projet est traité comme une œuvre. Chaque détail est pensé. Chaque ligne de code a une intention.
                  Parce que derrière chaque création, il y a un créateur. Et derrière chaque entreprise, il y a une vision.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
