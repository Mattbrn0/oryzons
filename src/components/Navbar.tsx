import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type NavbarMode = 'home' | 'about'

const homeLinks = [
  { label: 'Accueil',     href: '/#',          section: ''          },
  { label: 'Prestations', href: '/#services',  section: 'services'  },
  { label: 'À propos',    href: '/#a-propos',  section: 'a-propos'  },
  { label: 'Tarifs',      href: '/#pricing',   section: 'pricing'   },
  { label: 'Contact',     href: '/#contact',   section: 'contact'   },
]

const aboutLinks = [
  { label: 'Origine',     href: '#origine',    section: 'origine'   },
  { label: 'Oryzons',     href: '#nom',        section: 'nom'       },
  { label: 'Étoile',      href: '#etoile',     section: 'etoile'    },
  { label: 'David',       href: '#david',      section: 'david'     },
  { label: 'Adam',        href: '#adam',        section: 'adam'      },
]

const glassStyle = (scrolled: boolean): React.CSSProperties => ({
  background: scrolled ? 'rgba(10,10,10,0.11)' : 'rgba(10,10,10,0.07)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  boxShadow: '0 2px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.6)',
  transition: 'background 0.35s ease, box-shadow 0.35s ease',
})

export default function Navbar({ mode = 'home' }: { mode?: NavbarMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [pill, setPill] = useState({ x: 0, w: 0, visible: false })
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const links = mode === 'about' ? aboutLinks : homeLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Surligner le lien actif selon la section visible
  useEffect(() => {
    const sectionIds = links.map(l => l.section).filter(Boolean)
    if (!sectionIds.length) return
    const observers: IntersectionObserver[] = []
    const visibleMap: Record<string, number> = {}

    const pick = () => {
      const best = Object.entries(visibleMap).sort((a, b) => b[1] - a[1])[0]
      setActiveSection(best ? best[0] : '')
    }

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visibleMap[id] = entry.intersectionRatio
          else delete visibleMap[id]
          pick()
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [links])

  const movePill = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const nav = navRef.current
    if (!nav) return
    const navRect  = nav.getBoundingClientRect()
    const linkRect = e.currentTarget.getBoundingClientRect()
    setPill({ x: linkRect.left - navRect.left, w: linkRect.width, visible: true })
  }

  const hidePill = () => setPill(p => ({ ...p, visible: false }))

  return (
    <header className="fixed left-0 right-0 top-4 z-[100] flex items-center justify-between px-5">

      {/* ── Logo bubble ─────────────────────────────── */}
      <Link
        to="/"
        className="anim-pop-0 flex items-center gap-2 rounded-full px-4 py-2.5 no-underline"
        style={{
          ...glassStyle(scrolled),
          transform: 'scale(1)',
          transition: 'background 0.35s ease, box-shadow 0.35s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04) translateY(-1px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1) translateY(0)')}
      >
        <img src="/oryzons.svg" alt="Oryzons" className="size-4" />
          <span className="text-[0.82rem] font-medium text-muted">Oryzons</span>
      </Link>

      {/* ── Mobile menu button ─────────────────────── */}
      <button
        type="button"
        onClick={() => setMobileOpen(v => !v)}
        className="btn-glass-dark anim-pop-1 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-medium text-muted md:hidden"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
      >
        Menu
        <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 4.5h10M3 8h10M3 11.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {/* ── Links bubble ────────────────────────────── */}
      <nav
        ref={navRef}
        className="anim-pop-1 relative hidden items-center gap-0.5 rounded-full px-2 py-2 md:flex"
        style={glassStyle(scrolled)}
        onMouseLeave={hidePill}
      >
        {/* Sliding pill indicator */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-2 rounded-full bg-black/[0.08]"
          style={{
            left: 0,
            height: 'calc(100% - 16px)',
            width:  pill.w,
            transform: `translateX(${pill.x}px)`,
            opacity: pill.visible ? 1 : 0,
            transition: pill.visible
              ? 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1), width 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.15s ease'
              : 'opacity 0.2s ease',
          }}
        />

        {links.map(l => (
          <a
            key={l.label}
            href={l.href}
            className={`relative z-10 block rounded-full px-4 py-1.5 text-[0.82rem] font-medium no-underline transition-colors duration-200 hover:text-ink ${
              activeSection === l.section ? 'text-ink' : 'text-muted'
            }`}
            onMouseEnter={movePill}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* ── CTA bubble ──────────────────────────────── */}
      {mode === 'about' ? (
        <Link
          to="/"
          className="btn-glass-dark anim-pop-2 hidden items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-medium text-muted md:flex"
        >
          Retour à l'accueil
          <svg className="size-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11.5 7H2.5M2.5 7L6 3.5M2.5 7L6 10.5" />
          </svg>
        </Link>
      ) : (
        <a
          href="#contact"
          className="btn-glass-dark anim-pop-2 hidden items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-medium text-muted md:flex"
        >
          Démarrer votre projet
          <svg className="size-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
          </svg>
        </a>
      )}

      {/* ── Mobile dropdown ─────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="anim-drop-pop absolute left-5 right-5 top-[3.6rem] overflow-hidden rounded-2xl md:hidden"
          style={glassStyle(true)}
        >
          <div className="rounded-2xl p-2 ring-1 ring-white/10">
            <nav className="flex flex-col gap-1">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className={`rounded-xl px-4 py-3 text-[0.95rem] font-medium no-underline transition-colors ${
                    activeSection === l.section ? 'bg-black/[0.08] text-ink' : 'text-muted hover:bg-black/[0.06] hover:text-ink'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href={mode === 'about' ? '/' : '#contact'}
                className="mt-1 inline-flex items-center justify-between rounded-xl bg-black/[0.08] px-4 py-3 text-[0.95rem] font-medium text-ink no-underline"
                onClick={() => setMobileOpen(false)}
              >
                {mode === 'about' ? "Retour à l'accueil" : 'Démarrer votre projet'}
                <svg className="size-4 text-ink/70" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
