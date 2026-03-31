import { Link } from 'react-router-dom'

const serif = { fontFamily: "'Instrument Serif', serif" }

interface BlockProps { title: string; children: React.ReactNode }
function Block({ title, children }: BlockProps) {
  return (
    <div className="border-t border-border pt-10">
      <h3 style={serif} className="mb-5 text-[1.5rem] text-ink">{title}</h3>
      <div className="text-[0.95rem] font-light leading-[1.9] text-muted space-y-4">{children}</div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-svh bg-white">
      {/* Back nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[860px] items-center justify-between px-8 py-4">
          <Link to="/" className="flex items-center gap-2 text-[0.82rem] font-medium text-muted transition-colors hover:text-ink">
            <svg className="size-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.5 7H2.5M2.5 7L6 3.5M2.5 7L6 10.5" />
            </svg>
            Retour
          </Link>
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-subtle">Oryzons — À propos</span>
        </div>
      </header>

      <main className="mx-auto max-w-[860px] px-8 py-20 md:py-32">

        {/* Hero */}
        <div className="mb-20">
          <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Notre histoire</p>
          <h1 style={serif} className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.1] text-ink">
            Un site internet<br />n'est pas seulement<br />un outil, c'est une œuvre.
          </h1>
        </div>

        <div className="space-y-14">

          {/* Intro */}
          <Block title="L'origine">
            <p>
              Dans un monde où tout va vite, où les sites se ressemblent, où la technologie devient parfois froide et impersonnelle, Oryzons est né d'une volonté de créer une approche différente.
            </p>
            <p>
              Une approche où chaque projet est pensé comme une création unique, avec une intention, une identité et une direction.
            </p>
            <p>
              Je suis développeur web indépendant, passionné par la création digitale. Mais mon objectif n'a jamais été simplement de coder des pages ou d'assembler des fonctionnalités. Mon rôle est de donner un sens à votre présence digitale — de transformer une idée en expérience, de faire de votre site une signature.
            </p>
          </Block>

          {/* Le nom */}
          <Block title='Pourquoi "Oryzons" ?'>
            <p>
              Le nom vient du mot <em>Horizons</em>. Un horizon représente une direction, une vision, une possibilité, un futur.
            </p>
            <p>
              Mais Oryzons n'est pas seulement un horizon. Le mot a été transformé volontairement. Le <strong className="font-medium text-ink">« O »</strong> symbolise un cycle, un point de départ, une globalité — une vision complète du projet, de son début à son déploiement.
            </p>
          </Block>

          {/* L'étoile */}
          <Block title="L'étoile comme logo">
            <p>
              Depuis toujours, les étoiles servent à s'orienter. Elles montrent le chemin. L'étoile Oryzons symbolise l'idée de <em>vous guider dans votre transformation digitale</em>.
            </p>
            <p>
              Elle représente aussi la créativité, la précision, la constance. Une étoile n'est jamais immobile — elle rayonne. Comme une marque forte.
            </p>
          </Block>

          {/* David */}
          <Block title="Le David — la maîtrise">
            <p>
              Le David de Michel-Ange représente la précision, la discipline et la maîtrise d'un art. Michel-Ange n'a pas simplement sculpté une statue — il a révélé ce qui existait déjà dans la matière.
            </p>
            <p>
              C'est exactement ma vision du développement web : je ne crée pas seulement un site, <em>je révèle le potentiel d'une marque</em>.
            </p>
          </Block>

          {/* Création d'Adam */}
          <Block title="La Création d'Adam — l'étincelle">
            <p>
              Cette œuvre symbolise le moment où tout commence. Le passage de l'idée à la vie. La connexion entre une vision et sa réalisation.
            </p>
            <p>
              Dans le digital, ce moment correspond à la naissance d'un projet. Une idée devient une présence. Une entreprise devient visible. <em>Chaque site est une création.</em>
            </p>
          </Block>

          {/* Philosophie */}
          <Block title="La philosophie Oryzons">
            <p>Je ne crée pas simplement des sites internet. Je crée :</p>
            <ul className="space-y-2 pl-4">
              {['des identités digitales', 'des expériences', 'des fondations solides', 'des outils qui ont du sens'].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <span className="size-1 shrink-0 rounded-full bg-ink/30" />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Chaque projet est traité comme une œuvre. Chaque détail est pensé. Chaque ligne de code a une intention.
            </p>
            <p className="font-normal text-ink">
              Parce que derrière chaque création, il y a un créateur.<br />
              Et derrière chaque entreprise, il y a une vision.
            </p>
          </Block>

        </div>

        {/* CTA */}
        <div className="mt-24 flex flex-col items-start gap-4 border-t border-border pt-12 sm:flex-row sm:items-center sm:justify-between">
          <p style={serif} className="text-[1.4rem] text-ink">Prêt à créer quelque chose ?</p>
          <Link
            to="/#contact"
            className="btn-glass-dark flex items-center gap-2 rounded-full px-6 py-3 text-[0.82rem] font-medium"
          >
            Démarrer un projet
            <svg className="size-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
            </svg>
          </Link>
        </div>

      </main>
    </div>
  )
}
