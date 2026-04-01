import { Link } from 'react-router-dom'
import HalftoneImage from './HalftoneImage'

const serif = { fontFamily: "'Instrument Serif', serif" }

const pillarLabels = ['Vision', 'Sens', 'Maîtrise']

export default function Process() {
  return (
    <section id="a-propos" className="relative isolate min-h-svh overflow-hidden scroll-mt-20 border-t border-border bg-white px-8 py-22 md:px-16">
      {/* Background (left side only) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[44vw] max-w-[560px] md:block">
        <div className="absolute inset-0" style={{ transform: 'translateX(-18%)' }}>
          <HalftoneImage src="/pillars.png" grid={6} reveal="leftToRight" className="block h-full w-full" />
        </div>
        {/* Fade out towards content so it never sits behind text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.20) 48%, rgba(255,255,255,0.92) 66%, rgba(255,255,255,1) 92%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-176px)] max-w-[1100px] items-center">

        {/* Top layout (like reference) */}
        <div className="reveal grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
          {/* Left */}
          <div className="md:col-span-5">
            <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-subtle">
              À propos
            </span>
            <h2 style={serif} className="mt-6 text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.08] text-ink">
              Un site internet<br />
              n'est pas seulement<br />
              un outil, c'est une vision.
            </h2>

            <Link
              to="/a-propos"
              className="btn-glass-dark mt-7 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[0.82rem] font-medium"
            >
              Nous découvrir
              <svg className="size-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
              </svg>
            </Link>
          </div>

          {/* Right */}
          <div className="md:col-span-7">
            <p className="text-[0.95rem] font-light leading-[1.9] text-muted">
              Dans un monde où tout va vite et où les sites se ressemblent, j'ai voulu créer une approche différente :
              <span className="font-normal text-ink"> chaque projet est une création unique</span>, pensée avec une intention,
              une identité et une direction.
            </p>
            <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-muted">
              Mon rôle n'est pas simplement de coder. C'est de <span className="font-normal text-ink">donner du sens</span> à votre présence digitale,
              de transformer une idée en expérience, et de faire de votre site une signature.
            </p>
            <p className="mt-6 text-[0.95rem] font-light leading-[1.9] text-muted">
              Concrètement, cela signifie écouter, clarifier, puis construire avec exigence : une structure lisible, un design qui raconte, et une technique fiable.
              <span className="font-normal text-ink"> Vous obtenez un site qui inspire confiance</span>, guide vos visiteurs et soutient votre croissance, sans compromis sur l’élégance.
            </p>

            <div className="mt-10 border-t border-border pt-10">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Nos piliers</p>

              <div className="mt-7 grid grid-cols-3 divide-x divide-border">
                {pillarLabels.map((label, idx) => (
                  <div
                    key={label}
                    className="reveal group flex items-center justify-center px-4 py-6"
                    style={{ transitionDelay: `${idx * 90}ms` }}
                  >
                    <span
                      style={serif}
                      className="text-[1.35rem] text-ink transition-transform duration-300 group-hover:-translate-y-1"
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
