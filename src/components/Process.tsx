import { Link } from 'react-router-dom'
import HalftoneImage from './HalftoneImage'

const serif = { fontFamily: "'Instrument Serif', serif" }

const pillarLabels = ['Vision', 'Sens', 'Maîtrise']

/** Dégradé vers le contenu (canvas à gauche, grand écran) */
const fadeFromCanvasLeft = {
  background:
    'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 36%, rgba(255,255,255,0.94) 58%, rgba(255,255,255,1) 82%)',
}

/** Dégradé vers le contenu (canvas à droite, laptop / max-2xl) */
const fadeFromCanvasRight = {
  background:
    'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 36%, rgba(255,255,255,0.94) 58%, rgba(255,255,255,1) 82%)',
}

function PillarBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`mt-10 border-t border-border pt-10 ${className}`}>
      <p className="text-center text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Nos piliers</p>
      <div className="mt-7 grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {pillarLabels.map((label, idx) => (
          <div
            key={label}
            className="reveal group flex items-center justify-center px-4 py-5 sm:py-6"
            style={{ transitionDelay: `${idx * 90}ms` }}
          >
            <span style={serif} className="text-[1.35rem] text-ink transition-transform duration-300 group-hover:-translate-y-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BodyCopy({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-[0.95rem] font-light leading-[1.9] text-muted">
        Dans un monde où tout va vite et où les sites se ressemblent, j'ai voulu créer une approche différente :
        <span className="font-normal text-ink"> chaque projet est une création unique</span>, pensée avec une intention, une identité et une
        direction.
      </p>
      <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-muted">
        Mon rôle n'est pas simplement de coder. C'est de <span className="font-normal text-ink">donner du sens</span> à votre présence digitale,
        de transformer une idée en expérience, et de faire de votre site une signature.
      </p>
      <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-muted">
        Concrètement, cela signifie écouter, clarifier, puis construire avec exigence : une structure lisible, un design qui raconte, et une
        technique fiable.
        <span className="font-normal text-ink"> Vous obtenez un site qui inspire confiance</span>, guide vos visiteurs et soutient votre croissance,
        sans compromis sur l'élégance.
      </p>
    </div>
  )
}

function CtaDiscover({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/a-propos"
      className={`btn-hover inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-5 py-2.5 text-[0.82rem] font-medium text-ink shadow-[0_10px_24px_rgba(0,0,0,0.10)] ring-1 ring-black/10 backdrop-blur transition-colors hover:bg-white ${className}`}
    >
      Nous découvrir
      <svg className="size-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
      </svg>
    </Link>
  )
}

export default function Process() {
  return (
    <section id="a-propos" className="relative isolate min-h-svh overflow-hidden scroll-mt-20 border-t border-border bg-white px-6 py-24 sm:px-8 md:px-16">
      {/* Canvas à gauche — uniquement très grand écran (évite titre sur halftone sombre sur laptop) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[40vw] max-w-[520px] 2xl:block 2xl:w-[44vw] 2xl:max-w-[560px]">
        <div className="absolute inset-0 -translate-x-[24%] 2xl:-translate-x-[18%]">
          <HalftoneImage src="/pillars.png" grid={6} reveal="leftToRight" className="block h-full w-full" />
        </div>
        <div className="absolute inset-0" style={fadeFromCanvasLeft} />
      </div>

      {/* Canvas à droite — md à &lt;2xl (MacBook, laptops) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38vw] max-w-[480px] md:block 2xl:hidden lg:w-[42vw] lg:max-w-[520px]">
        <div className="absolute inset-0 translate-x-[20%] lg:translate-x-[14%]">
          <HalftoneImage src="/pillars.png" grid={6} reveal="rightToLeft" className="block h-full w-full" />
        </div>
        <div className="absolute inset-0" style={fadeFromCanvasRight} />
      </div>

      <div className="relative z-10 mx-auto min-h-[calc(100svh-176px)] max-w-[1100px] items-center 2xl:flex">
        {/* ── ≥2xl : mise en page d’origine (titre à gauche sur dégradé, texte à droite) */}
        <div className="reveal hidden w-full gap-12 2xl:grid 2xl:grid-cols-12">
          <div className="2xl:col-span-5 2xl:pl-10">
            <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-subtle">
              À propos
            </span>
            <h2 style={serif} className="mt-6 text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.08] text-ink">
              Un site internet<br />
              n'est pas seulement<br />
              un outil, c'est une vision.
            </h2>
            <CtaDiscover className="mt-7" />
          </div>
          <div className="2xl:col-span-7 2xl:pt-1">
            <BodyCopy />
            <PillarBlock />
          </div>
        </div>

        {/* ── &lt;2xl : flux de lecture clair, fond safe — canvas en filigrane à droite (md+) */}
        <div className="reveal flex w-full flex-col gap-10 2xl:hidden md:max-w-[min(100%,52rem)] md:pr-[min(12vw,3rem)] lg:pr-[min(14vw,4rem)]">
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-white px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-subtle shadow-sm ring-1 ring-black/[0.04]">
            À propos
          </span>
          <h2 style={serif} className="max-w-[20ch] text-[clamp(1.85rem,4.8vw,3rem)] leading-[1.08] tracking-[-0.02em] text-ink sm:max-w-[24ch]">
            Un site internet n'est pas seulement un outil, c'est une vision.
          </h2>
          <BodyCopy />
          <CtaDiscover />
          <PillarBlock className="!mt-0" />
        </div>
      </div>
    </section>
  )
}
