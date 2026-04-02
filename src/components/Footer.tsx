export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Bloc marque */}
          <div className="md:col-span-5">
            <a href="/#" className="inline-flex items-center gap-2 no-underline">
              <img src="/oryzons.svg" alt="Oryzons" className="size-5" />
              <span className="text-[0.95rem] font-medium text-ink">Oryzons</span>
            </a>
            <p className="mt-3 max-w-[32ch] text-[0.85rem] font-light leading-[1.7] text-muted">
            Développement web, design et stratégie
            pour les entreprises qui veulent se démarquer.
            </p>

            {/* Réseaux & contact */}
            <div className="mt-5 flex items-center gap-4 text-muted">
              <a href="/" aria-label="Instagram" className="transition-colors hover:text-ink">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <path d="M16 11.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>
              <a href="/" aria-label="LinkedIn" className="transition-colors hover:text-ink">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v2" />
                  <path d="M2 9h4v12H2z" />
                  <path d="M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
                </svg>
              </a>
              <a
                href="mailto:contact@oryzons.com"
                aria-label="Envoyer un e-mail"
                className="transition-colors hover:text-ink"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
              <a href="tel:+33643121415" aria-label="Appeler par téléphone" className="transition-colors hover:text-ink">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.31 1.8.57 2.65a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.29-1.29a2 2 0 0 1 2.13-.45c.87.26 1.76.45 2.67.56A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>

            {/* Status */}
            <div className="mt-6 inline-flex items-center gap-2 text-[0.78rem] font-light text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Site sécurisé</span>
            </div>
          </div>

          {/* Colonnes liens */}
          <div className="md:col-span-7 md:pl-6">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-[0.78rem] font-medium text-ink">Oryzons</p>
                <ul className="mt-4 space-y-2">
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/#a-propos">À propos</a></li>
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/#Prestations">Prestations</a></li>
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/#pricing">Tarifs</a></li>
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/#contact">Contact</a></li>

                </ul>
              </div>
              <div>
                <p className="text-[0.78rem] font-medium text-ink">Services</p>
                <ul className="mt-4 space-y-2">
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/services">Création de site web</a></li>
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/services">Refonte de site</a></li>
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/services">Maintenance</a></li>
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/services">Optimisation SEO</a></li>
                </ul>
              </div>
              <div>
                <p className="text-[0.78rem] font-medium text-ink">Ressources</p>
                <ul className="mt-4 space-y-2">
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/FAQ">FAQ</a></li>
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/FAQ">Conseils digitaux</a></li>
                  <li><a className="text-[0.85rem] font-light text-muted no-underline hover:text-ink" href="/support">Support</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-[0.78rem] font-light text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Oryzons — Tous droits réservés</span>   
          <details className="group">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1 text-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10">
              <span>Informations complémentaires</span>
              <svg
                className="size-3 text-muted transition-transform duration-200 group-open:rotate-90"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>

            <div className="mt-2 rounded-lg bg-white/70 p-3 backdrop-blur">
              <ul className="space-y-2">
                <li>
                  <a className="text-[0.82rem] font-light text-muted no-underline hover:text-ink" href="/cgu">
                    CGU
                  </a>
                </li>
                <li>
                  <a className="text-[0.82rem] font-light text-muted no-underline hover:text-ink" href="/cgv">
                    CGV
                  </a>
                </li>
                <li>
                  <a className="text-[0.82rem] font-light text-muted no-underline hover:text-ink" href="/plan-du-site">
                    Plan du site
                  </a>
                </li>
              </ul>
            </div>
          </details>
   
        </div>
      </div>
    </footer>
  )
}
