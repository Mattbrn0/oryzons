import { useState } from 'react'
import HalftoneImage from './HalftoneImage'

const baseInput =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 text-[0.9rem] font-light text-ink outline-none transition-[border-color] duration-200 placeholder:text-subtle focus:border-ink/40 focus:ring-0 focus:shadow-none'

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="relative isolate scroll-mt-20 min-h-svh overflow-hidden border-t border-border bg-surface px-8 py-28 md:px-16">
      {/* Logo Oryzons en fond — centré derrière le formulaire */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[92svh] w-[92svh] -translate-x-1/2 -translate-y-1/2 opacity-[0.10]">
          <HalftoneImage
            src="/oryzons.svg"
            grid={7}
            reveal="bottomToTop"
            fit="contain"
            className="block h-full w-full"
          />
        </div>
        {/* voile doux pour conserver la lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 52%, rgba(249,250,251,0.0) 0%, rgba(249,250,251,0.62) 55%, rgba(249,250,251,0.92) 78%, rgba(249,250,251,1) 100%)',
          }}
        />
      </div>
      <div className="mx-auto flex min-h-[calc(100svh-224px)] max-w-[720px] items-center">
        <div className="relative z-10 w-full">
        <div className="reveal mb-14 text-center">
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-subtle">Travaillons ensemble</p>
          <h2 className="font-syne text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
            Prêt à démarrer<br />votre projet ?
          </h2>
          <p className="mx-auto mt-4 max-w-[400px] text-[0.95rem] font-light leading-[1.75] text-muted">
            Décrivez-nous votre projet — on vous répond sous 24h.
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
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Téléphone</label>
              <input type="tel" placeholder="06 12 34 56 78" className={baseInput} inputMode="tel" />
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
                <option>Refonte de site existant</option>
                <option>Hébergement & maintenance</option>
                <option>Site personnalisé (sur mesure)</option>
                <option>Autre prestation</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.1em] text-subtle">Budget estimé</label>
              <select className={baseInput} defaultValue="" style={{ fontFamily: 'inherit' }}>
                <option value="" disabled>Votre budget...</option>
                <option>Moins de 1 000 €</option>
                <option>1 000 – 3 000 €</option>
                <option>3 000 – 5 000 €</option>
                <option>À définir ensemble</option>
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
      </div>
    </section>
  )
}
