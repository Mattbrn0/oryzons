import BorderGlow from './BorderGlow'

const services = [
  {
    title: 'Audit & vision',
    description:
      'Cartographie de vos enjeux, priorités et irritants pour bâtir une feuille de route claire et actionnable.',
  },
  {
    title: 'Produit & design',
    description:
      'Interfaces sobres et parcours utilisateur pensés pour réduire la friction et faire émerger l’essentiel.',
  },
  {
    title: 'Tech & mise à l’échelle',
    description:
      'Fondations techniques solides, automatisation et suivi pour faire grandir votre offre sans complexité inutile.',
  },
] as const

/**
 * Même teinte que le bas du hero : premier arrêt du `linear-gradient(to top, …)` dans Hero (#102430).
 * On prolonge en restant sur cette couleur, puis on assombrit très progressivement — sans repartir plus clair.
 */
const HERO_GRADIENT_FLOOR = '#102430'

const servicesBackground = `linear-gradient(to bottom,
  ${HERO_GRADIENT_FLOOR} 0%,
  ${HERO_GRADIENT_FLOOR} 52%,
  #0f2129 82%,
  #0c1c24 100%
)`

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate flex min-h-dvh flex-col overflow-y-auto bg-[#102430] scroll-mt-[5.5rem] text-white"
      aria-labelledby="services-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundImage: servicesBackground }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-12 max-w-2xl sm:mb-14">
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.2em] text-white/50">Mes services</p>
          <h2 id="services-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight">
            Des blocs simples pour avancer vite, sans le flou
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            Chaque offre est pensée comme un widget : digeste, transparent sur le contenu, et prêt à s’aligner sur vos
            objectifs business.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {services.map((item) => (
            <li key={item.title}>
              <BorderGlow
                className="h-full"
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#102430"
                borderRadius={16}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                fillOpacity={0}
              >
                <article className="flex h-full flex-col rounded-[15px] bg-[rgba(212,217,219,0.10)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:p-9">
                  <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/65 sm:text-[15px]">{item.description}</p>
                </article>
              </BorderGlow>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
