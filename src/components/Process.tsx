const steps = [
  { num: '01', title: 'Découverte & brief',      desc: "On échange sur vos objectifs, cibles et contraintes. Premier contact gratuit, sans engagement." },
  { num: '02', title: 'Proposition & devis',     desc: "Architecture, fonctionnalités, design et planning — tout est validé avant le démarrage." },
  { num: '03', title: 'Design & développement',  desc: "Maquettes puis développement. Vous suivez l'avancement via un lien de prévisualisation dédié." },
  { num: '04', title: 'Livraison & lancement',   desc: "Tests finaux, mise en ligne, formation et remise des accès. Livraison clé en main." },
  { num: '05', title: 'Suivi & évolution',       desc: "La relation ne s'arrête pas à la livraison — on reste disponibles pour faire grandir votre site." },
]

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 border-t border-border bg-surface px-8 py-28 md:px-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="reveal mb-16">
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Notre méthode</p>
          <h2 className="font-syne text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
            Simple, transparent<br />&amp; efficace
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-5">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="reveal group relative border-l border-border pb-10 pl-7 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-8 md:pt-7"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute -left-[5px] top-0 size-[9px] rounded-full bg-ink md:-top-[5px] md:left-0" />
              <span className="font-syne mb-4 mt-3 block text-[0.72rem] font-semibold tracking-[0.1em] text-subtle md:mt-7">{s.num}</span>
              <h3 className="font-syne mb-2.5 text-[0.95rem] font-bold leading-snug text-ink">{s.title}</h3>
              <p className="text-[0.82rem] font-light leading-[1.7] text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
