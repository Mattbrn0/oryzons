import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2v4M12 18v4M2 12h4M18 12h4M5.64 5.64l2.83 2.83M15.54 15.54l2.83 2.83M5.64 18.36l2.83-2.83M15.54 8.46l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const glassPillBar =
  'rounded-full border border-[#D4D9DB]/45 bg-[#D4D9DB]/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_8px_32px_-8px_rgba(16,36,48,0.22)] backdrop-blur-xl'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Policies', href: '#policies' },
  { label: 'Contact', href: '#contact' },
] as const

const bubbleEase = 'cubic-bezier(0.33, 1.18, 0.64, 1)'

type BubbleRect = { left: number; top: number; width: number; height: number; visible: boolean }

const bubbleTransition = [
  `left 0.52s ${bubbleEase}`,
  `top 0.52s ${bubbleEase}`,
  `width 0.52s ${bubbleEase}`,
  `height 0.52s ${bubbleEase}`,
  'opacity 0.34s ease',
  'box-shadow 0.45s ease',
].join(', ')

export type GlassPillBubbleItem = {
  key: string
  href: string
  children: ReactNode
  target?: string
  rel?: string
  ariaLabel?: string
}

const bubbleNavLinkText =
  'relative z-10 shrink-0 rounded-full px-3.5 py-2 text-[11px] font-medium text-[#1a2d38]/88 outline-none transition-colors duration-300 ease-out hover:text-[#102430] focus-visible:text-[#102430] sm:px-4 sm:text-[13px]'

export const bubbleNavLinkIcon =
  'relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full text-[#1a2d38]/88 outline-none transition-colors duration-300 ease-out hover:text-[#102430] focus-visible:text-[#102430]'

type GlassPillBubbleNavProps = {
  ariaLabel: string
  items: GlassPillBubbleItem[]
  linkClassName: string
  navClassName?: string
  scrollable?: boolean
  /** Faux : pas de pilule / bordure autour du groupe de liens (nav principale sur fond sombre). */
  framed?: boolean
}

export function GlassPillBubbleNav({
  ariaLabel,
  items,
  linkClassName,
  navClassName = '',
  scrollable = true,
  framed = true,
}: GlassPillBubbleNavProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [bubble, setBubble] = useState<BubbleRect>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  })

  const moveBubble = useCallback((target: HTMLElement) => {
    const row = rowRef.current
    if (!row) return
    const rr = row.getBoundingClientRect()
    const tr = target.getBoundingClientRect()
    setBubble({
      left: tr.left - rr.left,
      top: tr.top - rr.top,
      width: tr.width,
      height: tr.height,
      visible: true,
    })
  }, [])

  const hideBubble = useCallback(() => {
    setBubble((b) => ({ ...b, visible: false }))
  }, [])

  const row = (
    <div
      ref={rowRef}
      className={`relative flex w-max items-center ${framed ? 'gap-0.5 sm:gap-1' : 'gap-2 sm:gap-3'}`}
    >
      <span
        className="pointer-events-none absolute z-0 rounded-full bg-white/52 shadow-[0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-black/[0.045] will-change-[left,top,width,height]"
        style={{
          left: bubble.left,
          top: bubble.top,
          width: bubble.width,
          height: bubble.height,
          opacity: bubble.visible ? 1 : 0,
          transition: bubbleTransition,
        }}
        aria-hidden
      />
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target={item.target}
          rel={item.rel}
          aria-label={item.ariaLabel}
          className={linkClassName}
          onMouseEnter={(e) => moveBubble(e.currentTarget)}
          onFocus={(e) => moveBubble(e.currentTarget)}
          onBlur={(e) => {
            const next = e.relatedTarget
            if (!next || !rowRef.current?.contains(next)) hideBubble()
          }}
        >
          {item.children}
        </a>
      ))}
    </div>
  )

  const navShell = framed
    ? `${glassPillBar} py-1 pl-1.5 pr-1.5 sm:py-1.5 sm:pl-2 sm:pr-2`
    : 'border-0 bg-transparent p-0 shadow-none ring-0 backdrop-blur-none'

  return (
    <nav
      className={`${navShell} ${navClassName}`}
      aria-label={ariaLabel}
      onMouseLeave={hideBubble}
    >
      {scrollable ? (
        <div className="min-w-0 max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {row}
        </div>
      ) : (
        row
      )}
    </nav>
  )
}

function GlassNavLinks() {
  return (
    <GlassPillBubbleNav
      ariaLabel="Navigation principale"
      navClassName="w-max max-w-full"
      linkClassName={bubbleNavLinkText}
      items={navLinks.map((item) => ({
        key: item.href,
        href: item.href,
        children: item.label,
      }))}
      scrollable
    />
  )
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const threshold = 10
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent">
      <div
        className={`pointer-events-auto mx-auto grid max-w-[100vw] grid-cols-3 items-center gap-2 px-5 transition-[transform,padding] duration-[480ms] motion-reduce:translate-y-0 motion-reduce:transition-none sm:px-8 ${scrolled ? '-translate-y-0.5 py-2.5 sm:-translate-y-1 sm:py-3' : 'translate-y-0 py-4 sm:py-5'}`}
        style={{ transitionTimingFunction: bubbleEase }}
      >
        <div className="flex justify-start">
          <a
            href="#hero"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#2F424C]/30 bg-[#FEFEFE]/80 text-[#1a2d38] shadow-sm backdrop-blur-md transition-colors hover:bg-[#FEFEFE]"
            aria-label="Accueil"
          >
            <SparkleIcon className="size-4" />
          </a>
        </div>

        <div className="flex min-w-0 justify-center">
          <GlassNavLinks />
        </div>

        <div className="flex justify-end" aria-hidden>
          <span className="size-9 shrink-0" />
        </div>
      </div>
    </header>
  )
}
