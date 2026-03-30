const plans = [
  {
    name: 'Essentiel', price: '800 €', from: true,
    desc: 'Pour lancer votre présence en ligne',
    features: ["Site vitrine jusqu'à 5 pages", 'Design responsive', 'Formulaire de contact', 'SEO de base', '1 mois de support'],
    cta: 'Demander un devis', featured: false,
  },
  {
    name: 'Pro', price: '2 000 €', from: true,
    desc: 'Pour une image professionnelle & complète',
    features: ["Site jusqu'à 15 pages", 'Design premium sur-mesure', 'Blog / actualités', 'SEO avancé + analytics', 'Hébergement 1 an', '3 mois de support'],
    cta: 'Démarrer ce projet', featured: true,
  },
  {
    name: 'Sur-mesure', price: 'Devis', from: false,
    desc: 'Pour les projets complexes & e-commerce',
    features: ['E-commerce / boutique', 'Fonctionnalités sur mesure', 'Intégrations API', 'Tableau de bord admin', 'Hébergement dédié', 'Support prioritaire 12 mois'],
    cta: 'Nous contacter', featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 px-8 py-28 md:px-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="reveal mb-16 text-center">
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Tarifs</p>
          <h2 className="font-syne text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
            Investissement transparent
          </h2>
          <p className="mx-auto mt-4 max-w-[400px] text-[0.95rem] font-light leading-[1.75] text-muted">
            Des formules claires. Pas de surprise, pas de frais cachés.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map(p => (
            <div
              key={p.name}
              className={`reveal flex flex-col rounded-2xl border p-9 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] ${
                p.featured ? 'border-ink bg-ink text-white' : 'border-border bg-white'
              }`}
            >
              <div className={`font-syne mb-1 text-[0.8rem] font-semibold uppercase tracking-[0.1em] ${p.featured ? 'text-white/50' : 'text-subtle'}`}>
                {p.name}
              </div>
              {p.from && <div className={`mt-3 text-[0.75rem] font-light ${p.featured ? 'text-white/50' : 'text-subtle'}`}>À partir de</div>}
              <div className={`font-syne mt-1 text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] ${p.featured ? 'text-white' : 'text-ink'}`}>
                {p.price}
              </div>
              <p className={`mb-8 mt-2 text-[0.82rem] font-light ${p.featured ? 'text-white/60' : 'text-muted'}`}>{p.desc}</p>

              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-[0.85rem] font-light">
                    <span className={`inline-block size-1.5 shrink-0 rounded-full ${p.featured ? 'bg-white/40' : 'bg-ink/20'}`} />
                    <span className={p.featured ? 'text-white/80' : 'text-muted'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto inline-flex h-11 items-center justify-center rounded-full text-[0.875rem] font-medium ${
                  p.featured ? 'btn-glass' : 'btn-glass-dark'
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
