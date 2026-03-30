const services = [
  { num: '01', title: 'Création de site',            desc: 'Sites vitrines, landing pages, e-commerces. Un design unique, responsive et optimisé pour convertir vos visiteurs en clients.',        tag: 'Design sur-mesure' },
  { num: '02', title: 'Hébergement & mise en ligne', desc: 'Solutions performantes, sécurisées et adaptées à votre trafic. DNS, SSL et monitoring inclus.',                                        tag: 'Haute disponibilité' },
  { num: '03', title: 'Évolution & maintenance',     desc: 'Votre site évolue avec votre activité. Ajouts, refontes, performances — on intervient rapidement.',                                    tag: 'Réactivité garantie' },
  { num: '04', title: 'Sécurité & sauvegardes',      desc: 'Mises à jour régulières, sauvegardes automatiques et surveillance proactive de votre infrastructure.',                                 tag: "Tranquillité d'esprit" },
  { num: '05', title: 'SEO & visibilité',            desc: 'Optimisation technique et éditoriale pour améliorer votre positionnement sur Google durablement.',                                     tag: 'Référencement naturel' },
  { num: '06', title: 'SAV & accompagnement',        desc: 'Un interlocuteur dédié, disponible pour vous former et vous accompagner sur le long terme.',                                           tag: 'Suivi personnalisé' },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 px-8 py-28 md:px-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="reveal mb-16 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Ce que nous faisons</p>
            <h2 className="font-syne max-w-[480px] text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
              Des solutions web<br />complètes & pérennes
            </h2>
          </div>
          <p className="max-w-[320px] text-[0.95rem] font-light leading-[1.75] text-muted">
            Du premier pixel jusqu'au déploiement, on maîtrise toute la chaîne.
          </p>
        </div>

        <div className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {services.map((s, i) => (
            <div
              key={s.num}
              className="reveal group px-8 py-10 transition-colors duration-300 hover:bg-surface"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <span className="font-syne mb-6 block text-[0.75rem] font-semibold tracking-[0.1em] text-subtle">{s.num}</span>
              <h3 className="font-syne mb-3 text-[1.05rem] font-bold text-ink">{s.title}</h3>
              <p className="mb-6 text-[0.875rem] font-light leading-[1.7] text-muted">{s.desc}</p>
              <span className="rounded-full border border-border px-3 py-1 text-[0.7rem] font-medium tracking-[0.06em] text-subtle">{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
