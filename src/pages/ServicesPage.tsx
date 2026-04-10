import { useEffect } from 'react'
import EmbeddedDevisForm from '../components/EmbeddedDevisForm'
import ServicePointsCanvas from '../components/ServicePointsCanvas'

const serif = { fontFamily: "'Instrument Serif', serif" } as const

type VisualId = 'creation' | 'hebergement' | 'evolution' | 'seo' | 'sav'

type ServiceSection = {
  id: string
  num: string
  title: string
  intro: string
  bullets: readonly string[]
  visual: VisualId
  /** Court complément (pas une répétition des puces) */
  recap: string
}

const SECTIONS: ServiceSection[] = [
  {
    id: 'creation-site',
    num: '01',
    title: 'Création de site internet',
    intro:
      'Sites vitrines, pages de présentation et landing pages orientées conversion. Nous concevons une interface claire, une hiérarchie de l’information lisible et un rendu impeccable sur mobile comme sur grand écran.',
    bullets: [
      'Design sur mesure aligné sur votre secteur et vos objectifs',
      'Responsive : expérience fluide sur tous les appareils',
      'Formulaires et appels à l’action pour transformer les visites en demandes',
      'Performance et accessibilité pris en compte dès la conception',
    ],
    visual: 'creation',
    recap: 'Un site qui reflète votre activité, avec une navigation claire et des parcours pensés pour vos visiteurs.',
  },
  {
    id: 'hebergement',
    num: '02',
    title: 'Hébergement & mise en ligne',
    intro:
      'Mise en place d’un hébergement adapté à votre trafic, configuration du nom de domaine, certificats SSL et bonnes pratiques de sécurité. Votre site reste disponible, rapide et sauvegardé.',
    bullets: [
      'Choix d’une infrastructure adaptée (charge, localisation, conformité)',
      'DNS, HTTPS et renouvellements suivis',
      'Sauvegardes et supervision pour anticiper les incidents',
      'Mise en ligne contrôlée avec vérifications avant bascule',
    ],
    visual: 'hebergement',
    recap: 'Une base technique fiable : disponibilité, sécurité et sauvegardes sans charge mentale pour vous.',
  },
  {
    id: 'evolution-maintenance',
    num: '03',
    title: 'Évolution & maintenance',
    intro:
      'Votre activité change : le site doit suivre. Ajout de sections, mises à jour de contenu, ajustements graphiques et corrections — nous intervenons dans la continuité de votre projet.',
    bullets: [
      'Évolutions fonctionnelles et mises à jour de contenu',
      'Corrections et petites refontes ciblées sans tout reconstruire',
      'Veille technique : dépendances, compatibilité navigateurs',
      'Temps de réponse adapté à votre formule d’accompagnement',
    ],
    visual: 'evolution',
    recap: 'Votre site reste aligné sur votre activité, avec des correctifs et des évolutions dans un cadre défini.',
  },
  {
    id: 'seo-visibilite',
    num: '04',
    title: 'SEO & visibilité',
    intro:
      'Référencement naturel : structure sémantique, balisage, performance et cohérence éditoriale pour améliorer votre visibilité sur Google de manière durable — sans promesses irréalistes.',
    bullets: [
      'SEO technique : indexation, sitemap, données structurées quand c’est pertinent',
      'Optimisation des titres, méta-descriptions et contenus clés',
      'Mesure des indicateurs et pistes d’amélioration dans le temps',
      'Accompagnement éditorial possible selon votre offre',
    ],
    visual: 'seo',
    recap: 'Des bases solides pour être compris par les moteurs — et surtout par vos futurs clients.',
  },
  {
    id: 'sav-accompagnement',
    num: '05',
    title: 'SAV & accompagnement',
    intro:
      'Un interlocuteur pour vous former aux bases de votre site, répondre à vos questions et vous guider après la mise en ligne. La relation continue fait partie de notre façon de travailler.',
    bullets: [
      'Support par e-mail (et selon formule : échanges élargis ou prioritaires)',
      'Conseils pour tenir à jour vos contenus en autonomie',
      'Formation courte aux bonnes pratiques (médias, textes, formulaires)',
      'Transparence sur les délais et le périmètre des interventions',
    ],
    visual: 'sav',
    recap: 'Une ligne directe pour avancer sereinement : réponses claires et délais annoncés.',
  },
]

function ServiceAside({ visual, recap }: { visual: VisualId; recap: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-0">
      <div
        className="relative flex aspect-[4/3] items-center justify-center px-4 py-6 sm:aspect-[16/11] sm:px-10 sm:py-8"
        aria-hidden
      >
        <div className="mx-auto h-[min(220px,max(140px,42vw))] w-full max-w-[min(300px,100%)] sm:h-[220px] sm:max-w-[300px]">
          <ServicePointsCanvas variant={visual} />
        </div>
      </div>
      <div className="px-0 py-5 sm:py-6">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-subtle">En résumé</p>
        <p className="mt-2 text-[0.9rem] font-light leading-[1.65] text-muted">{recap}</p>
      </div>
    </div>
  )
}

function useReveal() {
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
      { threshold: 0.08 },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function ServicesPage() {
  useReveal()

  return (
    <div className="min-h-svh min-w-0 bg-white">
      <header className="border-b border-border bg-surface/50 px-4 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-12 md:px-16 md:pt-16">
        <div className="mx-auto max-w-[1100px]">
          <span className="reveal inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-subtle">
            Prestations
          </span>
          <h1
            style={serif}
            className="reveal mt-5 text-[clamp(2.2rem,6vw,3.75rem)] font-normal leading-[1.05] text-ink"
          >
            Nos services
          </h1>
          <p className="reveal mt-5 max-w-[52ch] text-[0.95rem] font-light leading-[1.75] text-muted">
            De la conception à l’hébergement, en passant par le référencement et le suivi : une offre structurée pour les
            indépendants et les PME qui veulent une présence web professionnelle et durable — sans e-commerce (pas de
            panier ni paiement en ligne).
          </p>
          <nav
            className="reveal mt-8 flex flex-wrap gap-1.5 sm:mt-10 sm:gap-2"
            aria-label="Accès rapide aux prestations"
          >
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="max-w-full rounded-full border border-border bg-white px-3 py-1.5 text-[0.72rem] font-medium text-muted no-underline transition-colors hover:border-ink/15 hover:text-ink sm:px-3.5 sm:text-[0.78rem]"
              >
                {s.num} · {s.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-8 sm:py-14 md:px-12 md:py-20">
        {SECTIONS.map((section, index) => {
          const reverse = index % 2 === 1
          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-20 border-t border-border py-12 first:border-t-0 first:pt-0 sm:scroll-mt-24 sm:py-16 md:py-20"
            >
              <div className="reveal grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
                <div className={`min-w-0 ${reverse ? 'lg:order-2' : ''}`}>
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-black/[0.06] text-[0.72rem] font-semibold text-subtle">
                    {section.num}
                  </span>
                  <h2 style={serif} className="mt-5 text-[1.65rem] leading-tight text-ink sm:text-[1.85rem]">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-[0.93rem] font-light leading-[1.8] text-muted">{section.intro}</p>
                  <ul className="mt-6 space-y-3">
                    {section.bullets.map(line => (
                      <li key={line} className="flex gap-3 text-[0.88rem] font-light leading-[1.65] text-ink">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/35" aria-hidden />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`min-w-0 ${
                    reverse
                      ? 'lg:order-1 lg:border-r lg:border-border lg:pr-8 xl:pr-14'
                      : 'lg:border-l lg:border-border lg:pl-8 xl:pl-14'
                  }`}
                >
                  <ServiceAside visual={section.visual} recap={section.recap} />
                </div>
              </div>
            </section>
          )
        })}

        <div className="reveal mt-6">
          <EmbeddedDevisForm
            description="Consultez nos formules sur la page d’accueil (lien ci-dessous) ou décrivez votre projet pour recevoir un devis personnalisé."
            showPricingLink
          />
        </div>
      </div>
    </div>
  )
}
