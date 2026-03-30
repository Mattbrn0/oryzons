const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Méthode',  href: '#process'  },
  { label: 'Tarifs',   href: '#pricing'  },
  { label: 'Contact',  href: '#contact'  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white px-8 py-12 md:px-16">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="#" className="flex items-center gap-2 no-underline">
            <img src="/oryzons.svg" alt="Oryzons" className="size-5" />
            <span className="font-syne text-[1rem] font-bold tracking-tight text-ink">Oryzons</span>
          </a>
          <p className="mt-2 text-[0.8rem] font-light text-subtle">Développement Web · Paris</p>
        </div>

        <nav className="flex gap-8">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="text-[0.85rem] font-light text-muted no-underline transition-colors duration-200 hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-1 text-right">
          <a href="mailto:contact@oryzons.fr" className="text-[0.85rem] font-light text-muted no-underline transition-colors duration-200 hover:text-ink">
            contact@oryzons.fr
          </a>
          <span className="text-[0.75rem] font-light text-subtle">© 2025 Oryzons</span>
        </div>
      </div>
    </footer>
  )
}
