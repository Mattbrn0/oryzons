import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Accueil',     href: '/#'         , external: false },
  { label: 'Prestations', href: '/#services' , external: false },
  { label: 'À propos',    href: '/#a-propos'  , external: false  },
  { label: 'Tarifs',      href: '/#pricing'  , external: false },
  { label: 'Contact',     href: '/#contact'  , external: false },
]

const glassStyle = (scrolled: boolean): React.CSSProperties => ({
  background: scrolled ? 'rgba(10,10,10,0.11)' : 'rgba(10,10,10,0.07)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  boxShadow: '0 2px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.6)',
  transition: 'background 0.35s ease, box-shadow 0.35s ease',
})

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [pill, setPill] = useState({ x: 0, w: 0, visible: false })
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <a
        href="#"
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
      </a>

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

        {links.map(l => l.external ? (
          <Link
            key={l.label}
            to={l.href}
            className="relative z-10 block rounded-full px-4 py-1.5 text-[0.82rem] font-medium text-muted no-underline transition-colors duration-200 hover:text-ink"
            onMouseEnter={movePill}
          >
            {l.label}
          </Link>
        ) : (
          <a
            key={l.label}
            href={l.href}
            className="relative z-10 block rounded-full px-4 py-1.5 text-[0.82rem] font-medium text-muted no-underline transition-colors duration-200 hover:text-ink"
            onMouseEnter={movePill}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* ── CTA bubble ──────────────────────────────── */}
      <a
        href="#contact"
        className="btn-glass-dark anim-pop-2 hidden items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-medium text-muted md:flex"
      >
        Démarrer votre projet
        <svg className="size-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" />
        </svg>
      </a>
    </header>
  )
}
