import HalftoneImage from './HalftoneImage'
import BorderGlow from './BorderGlow'
import { Link } from 'react-router-dom'

const GLASS_BG   = '#ffffff'
const GLOW_COLOR = '220 25 55'
const COLORS     = ['#94a3b8', '#64748b', '#cbd5e1']

const services = [
  { num: '01', title: 'Création de site',            desc: 'Sites vitrines, landing pages, e-commerces. Un design unique, responsive et optimisé pour convertir vos visiteurs en clients.', span: 'md:col-span-3' },
  { num: '02', title: 'Hébergement & mise en ligne',  desc: 'Solutions performantes, sécurisées et adaptées à votre trafic. DNS, SSL et monitoring inclus dès le départ.',                span: 'md:col-span-3' },
  { num: '03', title: 'Évolution & maintenance',      desc: "Votre site évolue avec votre activité. Ajouts, refontes et optimisations — on intervient rapidement.",                         span: 'md:col-span-2' },
  { num: '04', title: 'SEO & visibilité',             desc: "Optimisation technique et éditoriale pour améliorer votre positionnement sur Google durablement.",                             span: 'md:col-span-2' },
  { num: '05', title: 'SAV & accompagnement',         desc: "Un interlocuteur dédié, disponible pour vous former et vous accompagner dans la durée.",                                      span: 'md:col-span-2' },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 min-h-svh px-8 py-24 md:px-16">
      <div className="mx-auto flex min-h-[calc(100svh-192px)] max-w-[1100px] items-center">

        {/* Header */}
        <div className="w-full">
        <div className="reveal mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-subtle">
              Services
            </span>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", color: '#2d2d2d' }} className="text-[clamp(2.2rem,6vw,5rem)] leading-none">
              Nos Services
            </h2>
            <p className="mt-3 max-w-[420px] text-[0.88rem] font-light leading-[1.75] text-muted">
              Tout ce qu'il faut pour lancer, faire grandir et pérenniser votre présence en ligne.
            </p>
          </div>
          <Link to="/services" className="btn-glass-dark mb-1 hidden shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[0.82rem] font-medium md:flex">
            En savoir plus
            <svg className="size-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {services.map((s, i) => {
            const isImage = i === 4

            if (isImage) {
              return (
                <BorderGlow
                  key={s.num}
                  className={`reveal ${s.span} cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]`}
                  backgroundColor={GLASS_BG}
                  glowColor={GLOW_COLOR}
                  colors={COLORS}
                  glowIntensity={2.2}
                  glowRadius={50}
                  borderRadius={16}
                  edgeSensitivity={5}
                  style={{ minHeight: '220px', transition: 'transform 0.55s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.45s ease' } as React.CSSProperties}
                >
                  <HalftoneImage src="/david.png" grid={5} className="block h-full w-full" />
                </BorderGlow>
              )
            }

            return (
              <BorderGlow
                key={s.num}
                className={`reveal ${s.span} cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]`}
                backgroundColor={GLASS_BG}
                glowColor={GLOW_COLOR}
                colors={COLORS}
                glowIntensity={2.2}
                glowRadius={50}
                borderRadius={16}
                edgeSensitivity={5}
                style={{ transition: 'transform 0.55s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.45s ease' } as React.CSSProperties}
              >
                <div className="flex flex-col justify-between p-8" style={{ minHeight: '200px' }}>
                  <div className="mb-8">
                    <span className="inline-flex size-8 items-center justify-center rounded-full bg-black/[0.05] text-[0.72rem] font-semibold text-subtle backdrop-blur-sm">
                      {s.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-syne mb-3 text-[1.1rem] font-bold leading-snug text-ink">{s.title}</h3>
                    <p className="text-[0.875rem] font-light leading-[1.75] text-muted">{s.desc}</p>
                  </div>
                </div>
              </BorderGlow>
            )
          })}
        </div>

        </div>
      </div>
    </section>
  )
}
