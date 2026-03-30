import { useState } from 'react'

const baseInput =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 text-[0.9rem] font-light text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-subtle focus:border-ink/40 focus:shadow-[0_0_0_3px_rgba(10,10,10,0.06)]'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="scroll-mt-20 border-t border-border bg-surface px-8 py-28 md:px-16">
      <div className="mx-auto max-w-[720px]">
        <div className="reveal mb-14 text-center">
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Travaillons ensemble</p>
          <h2 className="font-syne text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
            Prêt à démarrer<br />votre projet ?
          </h2>
          <p className="mx-auto mt-4 max-w-[400px] text-[0.95rem] font-light leading-[1.75] text-muted">
            Décrivez-nous votre projet — on vous répond sous 24h. Premier échange gratuit.
          </p>
        </div>

        <div className="reveal rounded-2xl border border-border bg-white p-10">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Prénom & nom</label>
              <input type="text" placeholder="Jean Dupont" className={baseInput} />
            </div>
            <div>
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Email</label>
              <input type="email" placeholder="jean@entreprise.fr" className={baseInput} />
            </div>
            <div>
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Entreprise</label>
              <input type="text" placeholder="Votre société (optionnel)" className={baseInput} />
            </div>
            <div>
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Type de projet</label>
              <select className={baseInput} defaultValue="" style={{ fontFamily: 'inherit' }}>
                <option value="" disabled>Sélectionner...</option>
                <option>Création de site vitrine</option>
                <option>Site e-commerce</option>
                <option>Refonte de site existant</option>
                <option>Hébergement & maintenance</option>
                <option>Autre prestation</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Budget estimé</label>
              <select className={baseInput} defaultValue="" style={{ fontFamily: 'inherit' }}>
                <option value="" disabled>Votre budget...</option>
                <option>Moins de 1 000 €</option>
                <option>1 000 – 3 000 €</option>
                <option>3 000 – 8 000 €</option>
                <option>Plus de 8 000 €</option>
                <option>À définir ensemble</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Délai souhaité</label>
              <select className={baseInput} defaultValue="" style={{ fontFamily: 'inherit' }}>
                <option value="" disabled>Votre délai...</option>
                <option>Urgent (- d'1 mois)</option>
                <option>1 à 2 mois</option>
                <option>2 à 4 mois</option>
                <option>Pas de contrainte</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Votre projet</label>
              <textarea
                placeholder="Décrivez votre entreprise, vos objectifs, ce que vous imaginez..."
                className={baseInput}
                style={{ resize: 'vertical', minHeight: '120px', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          <button
            disabled={sent}
            onClick={() => setSent(true)}
            className="btn-glass-dark mt-6 w-full rounded-full py-3.5 text-[0.9rem] font-medium disabled:opacity-50"
            style={{ fontFamily: 'inherit' }}
          >
            {sent ? '✓ Message envoyé — Merci !' : 'Envoyer ma demande →'}
          </button>
        </div>
      </div>
    </section>
  )
}
