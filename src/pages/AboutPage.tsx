import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HalftoneImage from '../components/HalftoneImage'

const serif = { fontFamily: "'Instrument Serif', serif" } as const

/** lg breakpoint — aligné sur Tailwind `lg` (1024px) pour fit canvas cover / contain. */
function useIsLgUp() {
  const [lg, setLg] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const apply = () => setLg(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return lg
}

function useRevealOnce() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function AboutPage() {
  useRevealOnce()
  const isLgUp = useIsLgUp()

  return (
    <div className="relative overflow-x-hidden bg-white text-ink">
      {/* Hero — buste fragmenté (fond blanc, image centrée) */}
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-white">
          <div className="absolute left-1/2 top-1/2 h-[min(96svh,980px)] w-[min(92vw,780px)] -translate-x-1/2 -translate-y-1/2">
            <HalftoneImage
              src="/about-hero-david-bust.png"
              grid={6}
              reveal="bottomToTop"
              fit="contain"
              className="block h-full w-full opacity-[0.94] md:opacity-[0.98]"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 56% 50% at 50% 44%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 52%, rgba(255,255,255,0.94) 78%, #ffffff 100%)',
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 48% 42% at 50% 48%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.52) 38%, rgba(255,255,255,0.14) 62%, rgba(255,255,255,0) 80%)',
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

        <div className="anim-fade-5 absolute bottom-9 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-subtle">
          <span>Scroll</span>
          <div className="anim-scroll-line h-12 w-px bg-subtle/50" />
        </div>
      </section>

      {/* ── 2. Origine — grille editorial + carte verre (pas de canvas) */}
      <section
        id="origine"
        className="relative isolate flex min-h-svh scroll-mt-24 items-center border-t border-border bg-surface px-6 py-20 sm:px-8 sm:py-24 md:scroll-mt-28 md:px-12 md:py-28 lg:px-16 lg:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(10,10,10,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.05) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col justify-center gap-10 py-4 lg:flex-row lg:items-center lg:gap-12 lg:py-6">
          <div className="reveal flex-1 lg:max-w-[460px]">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Origine</p>
            <h2 style={serif} className="mt-5 text-[clamp(2rem,4vw,3.4rem)] leading-[1.06] text-ink">
              Quand le web devient une matière à sculpter.
            </h2>
            <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-muted">
              Face à l’uniformisation et à la vitesse des lancements, j’ai voulu une autre manière de construire&nbsp;:{' '}
              <span className="font-normal text-ink">écouter, clarifier, puis façonner</span> une présence digitale avec une intention nette.
            </p>
            <a
              href="#adam"
              className="btn-hover mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[0.82rem] font-medium text-ink shadow-[0_10px_24px_rgba(0,0,0,0.10)] ring-1 ring-black/10"
            >
              La Création d’Adam — l’étincelle
              <svg className="size-3.5 shrink-0 text-ink/55" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3.5 5.35 7 8.85 10.5 5.35" />
              </svg>
            </a>
          </div>

          <div className="reveal flex flex-1 flex-col gap-4 lg:max-w-[480px]" style={{ transitionDelay: '90ms' }}>
            <div className="rounded-[22px] border border-black/10 bg-white/85 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)] ring-1 ring-white/80 backdrop-blur-md md:p-8">
              <p className="text-[0.8rem] font-medium text-ink">Une genèse simple</p>
              <p className="mt-4 text-[0.92rem] font-light leading-[1.85] text-muted">
                Oryzons naît du constat que trop de sites se contentent d’exister. Le vrai travail, c’est de révéler ce que votre activité porte déjà en elle — structure,
                crédibilité, envie — et de le traduire dans une expérience lisible.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex flex-1 flex-col justify-center rounded-2xl border border-black/8 bg-white/70 px-5 py-4 text-[0.82rem] font-light text-muted backdrop-blur">
                <span className="font-syne text-[1.65rem] font-extrabold tabular-nums text-ink">01</span>
                <span className="mt-1 text-[0.78rem] uppercase tracking-[0.12em] text-subtle">Position</span>
                <span className="mt-2 leading-snug">Indépendant, projet par projet, relation directe.</span>
              </div>
              <div className="flex flex-1 flex-col justify-center rounded-2xl border border-black/8 bg-white/70 px-5 py-4 text-[0.82rem] font-light text-muted backdrop-blur">
                <span className="font-syne text-[1.65rem] font-extrabold tabular-nums text-ink">∞</span>
                <span className="mt-1 text-[0.78rem] uppercase tracking-[0.12em] text-subtle">Ambition</span>
                <span className="mt-2 text-[0.9rem] leading-snug text-muted">Des fondations techniques propres pour durer.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Adam — grille 50/50 écran : ligne exactement au milieu | canvas à droite */}
      <section id="adam" className="flex min-h-svh scroll-mt-24 flex-col border-t border-border bg-[#eceef1] md:scroll-mt-28">
        <div className="grid min-h-svh flex-1 grid-cols-1 divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <div className="order-1 flex min-w-0 flex-col justify-center px-6 py-12 sm:px-10 lg:order-none lg:py-16 lg:pl-12 lg:pr-10 xl:pl-16 xl:pr-12">
            <div className="max-w-[540px]">
              <p className="reveal text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">La Création d’Adam — l’étincelle</p>
              <h2
                style={serif}
                className="reveal mt-5 text-[clamp(1.85rem,3.5vw,2.85rem)] leading-[1.1] tracking-[-0.02em] text-ink"
              >
                Le passage de l’idée à la vie.
              </h2>
              <p className="reveal mt-6 text-[0.95rem] font-light leading-[1.9] text-muted" style={{ transitionDelay: '60ms' }}>
                Cette œuvre symbolise le moment où tout commence. <span className="font-normal text-ink">Le passage de l’idée à la vie.</span> La connexion entre une vision et sa réalisation.
              </p>
              <p className="reveal mt-5 text-[0.95rem] font-light leading-[1.9] text-muted" style={{ transitionDelay: '100ms' }}>
                Dans le digital, ce moment correspond à la naissance d’un projet. Une idée devient une présence. Une entreprise devient visible.{' '}
                <span className="font-normal text-ink">Chaque site est une création.</span>
              </p>
              <a
                href="#david"
                className="reveal btn-hover mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#111827] px-6 py-2.5 text-[0.82rem] font-medium text-white shadow-[0_12px_28px_rgba(17,24,39,0.22)]"
                style={{ transitionDelay: '140ms' }}
              >
                Le David — la maîtrise
                <svg className="size-3.5 shrink-0 text-white/80" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3.5 5.35 7 8.85 10.5 5.35" />
                </svg>
              </a>
            </div>
          </div>

          <div className="order-2 relative flex min-h-[48svh] min-w-0 flex-1 items-stretch justify-end overflow-hidden bg-[#eceef1] pb-10 pt-0 sm:pb-12 lg:order-none lg:min-h-0 lg:pb-0 lg:pt-0">
            <div
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                background:
                  'radial-gradient(520px 480px at 100% 44%, rgba(255,255,255,0.4), rgba(236,238,241,0) 65%)',
              }}
            />
            <div
              className="reveal relative z-[1] w-full max-lg:max-w-none max-lg:px-0 lg:mx-0 lg:h-full lg:min-h-0 lg:px-0"
              style={{ transitionDelay: '80ms' }}
            >
              <div className="relative aspect-[4/5] w-full min-h-[min(58svh,420px)] overflow-hidden max-lg:aspect-auto max-lg:min-h-[min(62svh,520px)] lg:aspect-auto lg:h-full lg:min-h-full lg:w-full">
                <HalftoneImage
                  src="/hands.png"
                  grid={9}
                  reveal="bottomToTop"
                  fit={isLgUp ? 'containY' : 'cover'}
                  hAlign={isLgUp ? 'right' : 'center'}
                  className="block h-full min-h-[min(58svh,420px)] w-full max-lg:min-h-[min(62svh,520px)] lg:min-h-full"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(236,238,241,0.55) 0%, rgba(236,238,241,0) 18%), linear-gradient(90deg, rgba(236,238,241,0.55) 0%, rgba(236,238,241,0.1) 42%, rgba(236,238,241,0) 68%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. David — halftone à gauche, texte à droite (desktop) */}
      <section
        id="david"
        className="relative flex min-h-svh scroll-mt-24 flex-col border-t border-border bg-white lg:scroll-mt-28 lg:min-h-svh lg:flex-row"
      >
        <div className="relative order-2 flex min-h-[min(48svh,420px)] flex-1 items-stretch bg-surface lg:order-1 lg:min-h-0">
          <div className="relative h-full min-h-[min(48svh,420px)] w-full lg:min-h-0">
            <HalftoneImage
              src="/david.png"
              grid={5}
              reveal="edges"
              fit="contain"
              hAlign="left"
              className="block h-full min-h-[min(48svh,420px)] w-full lg:min-h-full"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(249,250,251,0.65) 0%, rgba(249,250,251,0) 22%), linear-gradient(90deg, rgba(249,250,251,0) 0%, rgba(249,250,251,0.22) 58%, rgba(255,255,255,0.9) 100%)',
              }}
            />
          </div>
        </div>

        <div className="order-1 flex flex-1 items-center px-6 py-12 sm:px-10 lg:order-2 lg:py-10 lg:pl-12 lg:pr-16">
          <div className="reveal mx-auto w-full max-w-[520px]">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Le David — la maîtrise</p>
            <h2 style={serif} className="mt-5 text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] text-ink">
              Précision, discipline et maîtrise.
            </h2>
            <div className="mt-6 rounded-2xl border border-border bg-surface/80 p-6 ring-1 ring-black/[0.04] md:p-7">
              <p className="text-[0.95rem] font-light leading-[1.9] text-muted">
                Le David représente la <span className="font-normal text-ink">précision, la discipline et la maîtrise d’un art</span>. Michel-Ange n’a pas simplement sculpté une statue. Il a révélé ce qui
                existait déjà dans la matière.
              </p>
              <p className="mt-5 text-[0.95rem] font-light leading-[1.9] text-muted">
                C’est exactement ma vision du développement web&nbsp;:{' '}
                <span className="font-normal text-ink">je ne crée pas seulement un site, je révèle le potentiel d’une marque.</span>
              </p>
            </div>
            <a
              href="#justice"
              className="btn-glass-dark mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.82rem] font-medium"
            >
              Lady Justice — l’équité
              <svg className="size-3.5 shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3.5 5.35 7 8.85 10.5 5.35" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. Lady Justice — texte à gauche, visuel collé à droite */}
      <section id="justice" className="relative flex min-h-svh scroll-mt-24 flex-col border-t border-border bg-[#f4f5f7] lg:scroll-mt-28 lg:flex-row lg:min-h-svh">
        <div className="order-1 flex flex-1 items-center px-6 py-12 sm:px-10 lg:order-1 lg:py-14 lg:pl-12 lg:pr-10 xl:py-16 xl:pl-16 xl:pr-12">
          <div className="mx-auto w-full max-w-[560px] pb-3 pt-2 sm:pb-4 sm:pt-3 lg:mx-0 lg:pb-5 lg:pt-4">
            <p className="reveal text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Lady Justice — l’équité</p>
            <h2 style={serif} className="reveal mt-5 text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.06] tracking-[-0.02em] text-ink">
              L’équilibre, la transparence et la justesse.
            </h2>

            <div
              className="reveal mt-7 rounded-[22px] border border-black/[0.07] bg-white/75 p-6 shadow-[0_18px_48px_rgba(0,0,0,0.07)] ring-1 ring-white/90 backdrop-blur-md md:p-8"
              style={{ transitionDelay: '50ms' }}
            >
              <p className="text-[0.98rem] font-light leading-[1.9] text-ink md:text-[1.02rem]">
                Lady Justice représente{' '}
                <span className="font-medium text-ink">l’équilibre, la transparence et la justesse</span>. Elle incarne l’idée que chaque décision doit être prise avec rigueur et impartialité.
              </p>
              <div
                className="my-8 h-px w-full bg-gradient-to-r from-black/[0.12] via-black/[0.06] to-transparent"
                aria-hidden
              />
              <ul className="list-none space-y-5 text-[0.93rem] font-light leading-[1.9] text-muted md:text-[0.95rem]">
                <li className="reveal flex gap-4" style={{ transitionDelay: '90ms' }}>
                  <span className="mt-[0.65rem] h-px w-10 shrink-0 bg-ink/20" aria-hidden />
                  <span>
                    Dans mon travail, cette symbolique se traduit par une conviction simple&nbsp;: un projet doit être clair, compréhensible et juste pour toutes les parties.
                  </span>
                </li>
                <li className="reveal flex gap-4" style={{ transitionDelay: '145ms' }}>
                  <span className="mt-[0.65rem] h-px w-10 shrink-0 bg-ink/20" aria-hidden />
                  <span>Mes tarifs ne sont pas fixés au hasard. Ils sont construits avec logique, transparence et respect du travail fourni.</span>
                </li>
                <li className="reveal flex gap-4" style={{ transitionDelay: '200ms' }}>
                  <span className="mt-[0.65rem] h-px w-10 shrink-0 bg-ink/20" aria-hidden />
                  <span>
                    Je crois qu’une relation professionnelle solide repose sur la confiance. Et la confiance commence par l’équité.
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="#philosophie"
              className="reveal btn-hover mt-7 inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-2.5 text-[0.82rem] font-medium text-white shadow-[0_12px_28px_rgba(17,24,39,0.22)]"
              style={{ transitionDelay: '300ms' }}
            >
              Philosophie
              <svg className="size-3.5 shrink-0 text-white/80" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3.5 5.35 7 8.85 10.5 5.35" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative order-2 flex min-h-[min(72svh,580px)] flex-1 items-stretch justify-end bg-[#f4f5f7] lg:order-2 lg:max-w-[min(52%,720px)] lg:min-h-0 lg:shrink-0">
          <div className="relative h-full min-h-[min(72svh,580px)] w-full max-w-full lg:ml-auto lg:min-h-0 lg:w-full">
            <HalftoneImage
              src="/lady-justice.png"
              grid={6}
              reveal="rightToLeft"
              fit={isLgUp ? 'containY' : 'contain'}
              hAlign="right"
              className="block h-full min-h-[min(72svh,580px)] w-full lg:min-h-svh"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(244,245,247,0.65) 0%, rgba(244,245,247,0) 22%), linear-gradient(90deg, rgba(244,245,247,0.55) 0%, rgba(244,245,247,0.08) 45%, rgba(244,245,247,0) 72%)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── 6. Philosophie — texte centré, halftone en filigrane à gauche (comme avant à droite) */}
      <section
        id="philosophie"
        className="relative isolate flex min-h-svh scroll-mt-24 flex-col items-center justify-center overflow-hidden border-t border-border bg-white px-6 py-48 text-center sm:py-52 md:scroll-mt-28 md:py-56 lg:py-48 xl:py-52"
      >
        {/* Mobile — halftone en fond + fondu blanc (comme le hero) */}
        <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute left-1/2 top-[44%] h-[min(80svh,760px)] w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2">
            <HalftoneImage
              src="/about-hero-statue.png"
              grid={7}
              reveal="bottomToTop"
              fit="contain"
              className="block h-full w-full opacity-[0.48]"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 56% 52% at 50% 44%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 50%, rgba(255,255,255,0.94) 78%, #ffffff 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 48% 46% at 50% 40%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.5) 38%, rgba(255,255,255,0.12) 64%, rgba(255,255,255,0) 82%)',
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-y-0 z-0 hidden w-[min(52vw,640px)] lg:left-8 lg:block xl:left-12">
          <div className="absolute inset-0 opacity-[0.16]">
            <HalftoneImage
              src="/about-hero-statue.png"
              grid={7}
              reveal="leftToRight"
              fit="containY"
              hAlign="left"
              className="h-full w-full"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 55%, #ffffff 92%)',
            }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-0 max-lg:hidden"
          style={{
            background:
              'radial-gradient(900px 480px at 50% 35%, rgba(10,12,14,0.045), transparent 68%), radial-gradient(520px 280px at 50% 100%, rgba(10,12,14,0.04), transparent 55%)',
          }}
        />
        <div className="reveal relative z-[1] mx-auto max-w-[640px] text-center">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Philosophie</p>
          <h2 style={serif} className="mt-5 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.08] text-ink">
            Chaque détail porte une intention.
          </h2>
          <p className="mt-5 text-[0.95rem] font-light leading-[1.9] text-muted">
            Derrière chaque section, chaque interaction, il y a une décision — pas du remplissage. C’est cette exigence qui définit Oryzons.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={{ pathname: '/', hash: 'contact' }}
              state={{ contactKind: 'devis' }}
              className="btn-hover inline-flex h-12 items-center gap-2 rounded-full bg-[#111827] px-8 text-[0.88rem] font-medium text-white shadow-[0_14px_34px_rgba(17,24,39,0.28)]"
            >
              Démarrer un projet
              <svg className="size-3.5 text-white/80" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
              </svg>
            </Link>
            <Link
              to={{ pathname: '/', hash: 'pricing' }}
              state={{}}
              className="btn-hover inline-flex h-12 items-center gap-2 rounded-full border border-border bg-white px-8 text-[0.88rem] font-medium text-ink shadow-[0_8px_22px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-colors hover:bg-[#f6f7fb]"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
