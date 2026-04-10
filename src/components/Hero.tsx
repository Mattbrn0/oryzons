import DotScatter from './DotScatter'
import GradientText from './GradientText'

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      <DotScatter />

      {/* Radial veil — sur mobile : fondu blanc plus large (pas de « carton »), pour lisibilité sans masquer le canvas */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            'radial-gradient(ellipse 96% 64% at 50% 46%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0.72) 52%, rgba(255,255,255,0.38) 70%, rgba(255,255,255,0.14) 84%, rgba(255,255,255,0) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background: 'radial-gradient(ellipse 52% 42% at 50% 50%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.82) 38%, rgba(255,255,255,0.30) 65%, rgba(255,255,255,0) 82%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">

        {/* Headline */}
        <h1 className="anim-title w-full max-w-[900px] uppercase text-[clamp(2.2rem,5.2vw,4.6rem)] leading-[1.08] font-black" style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 900 }}>
          <GradientText
            colors={["#06141B", "#9BA8AB", "#040C11"]}
            animationSpeed={8}
            showBorder={false}
            className="w-full text-center"
          >
            Repoussez les limites<br />du digital
          </GradientText>
        </h1>

        {/* Subtitle */}
        <p
          className="anim-subtitle mt-7 max-w-[480px] text-[1rem] font-light leading-[1.75] text-muted"
          style={{ textShadow: '0 1px 16px rgba(255,255,255,0.85)' }}
        >
        Chez Oryzons, nous concevons des sites internet sur mesure qui valorisent votre image et transforment vos visiteurs en clients.
        </p>

        {/* CTA */}
        <div className="anim-fade-5 mt-10 flex justify-center">
          <a
            href="#services"
            className="btn-glass-dark inline-flex h-11 items-center gap-2 rounded-full px-7 text-[0.9rem] font-medium"
          >
            Découvrir nos services
            <svg className="size-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2.5 2.5L11.5 11.5M11.5 11.5H5M11.5 11.5V4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="anim-fade-5 absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-subtle">
        <span>Scroll</span>
        <div
          className="anim-scroll-line h-12 w-px bg-subtle/50"
        />
      </div>
    </section>
  )
}
