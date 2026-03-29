import { useLayoutEffect, useRef } from 'react'

import { GlassPillBubbleNav, bubbleNavLinkIcon } from './SiteHeader'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
      <path d="M17.5 7.5h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm1 4h3v10H6V7zm1.5-4.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM11 7h3v1.5h.05c.42-.8 1.44-1.64 2.97-1.64 3.17 0 3.75 2.09 3.75 4.8V17h-3v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.97V17h-3V7z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.2h2.7l.4-3.2h-3.1V8.6c0-.9.25-1.5 1.6-1.5h1.7V4.1A23 23 0 0014.5 4c-2.5 0-4.2 1.5-4.2 4.3v2.2H7.5v3.2h2.8V22h3.2z" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h12" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

const socialLinks = [
  {
    key: 'instagram',
    href: 'https://www.instagram.com/',
    ariaLabel: 'Instagram',
    icon: InstagramIcon,
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/',
    ariaLabel: 'LinkedIn',
    icon: LinkedInIcon,
  },
  {
    key: 'facebook',
    href: 'https://www.facebook.com/',
    ariaLabel: 'Facebook',
    icon: FacebookIcon,
  },
] as const

/** Fond : base stable sous ~50 %, blanc qui monte doucement puis halos radiaux décalés (ligne de fusion ondulée). */
const heroBackgroundImage = [
  'radial-gradient(ellipse 125% 78% at 48% -12%, rgba(254,254,254,0.99) 0%, rgba(254,254,254,0.58) 26%, rgba(254,254,254,0.12) 52%, transparent 72%)',
  'radial-gradient(ellipse 100% 62% at 14% 2%, rgba(254,254,254,0.52) 0%, rgba(254,254,254,0.14) 42%, transparent 64%)',
  'radial-gradient(ellipse 100% 62% at 86% -2%, rgba(254,254,254,0.5) 0%, rgba(254,254,254,0.12) 44%, transparent 66%)',
  'radial-gradient(ellipse 78% 52% at 34% 28%, rgba(254,254,254,0.26) 0%, transparent 58%)',
  'radial-gradient(ellipse 78% 52% at 66% 32%, rgba(254,254,254,0.24) 0%, transparent 56%)',
  'radial-gradient(ellipse 62% 42% at 22% 36%, rgba(16,36,48,0.42) 0%, transparent 68%)',
  'radial-gradient(ellipse 62% 42% at 78% 33%, rgba(16,36,48,0.38) 0%, transparent 66%)',
  'radial-gradient(ellipse 100% 48% at 50% 44%, rgba(47,66,76,0.45) 0%, transparent 70%)',
  'linear-gradient(to top, #102430 0%, #2F424C 28%, #2F424C 52%, #344a52 62%, #3d545d 76%, #455e68 92%, #4e6872 100%)',
].join(', ')

function SocialGlassNav() {
  return (
    <GlassPillBubbleNav
      ariaLabel="Réseaux sociaux"
      navClassName="w-max"
      linkClassName={bubbleNavLinkIcon}
      scrollable={false}
      items={socialLinks.map((item) => {
        const Icon = item.icon
        return {
          key: item.key,
          href: item.href,
          target: '_blank',
          rel: 'noopener noreferrer',
          ariaLabel: item.ariaLabel,
          children: <Icon className="size-[18px]" />,
        }
      })}
    />
  )
}

/** Zone (px) sur `naturalTop - headerBottom` : début / fin de la fusion visuelle avec la navbar (smoothstep). */
const BLEND_REST = 44
const BLEND_DOCKED = -10

function smoothstep01(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const socialWrapRef = useRef<HTMLDivElement>(null)
  const reduceMotionRef = useRef(false)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const socialWrap = socialWrapRef.current
    if (!hero || !socialWrap) return

    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotionRef.current = mqReduce.matches

    const getHeader = () => document.querySelector('header')

    const layoutPads = () => {
      const sm = window.matchMedia('(min-width: 640px)').matches
      return { bottomPad: sm ? 32 : 24, rightPad: sm ? 32 : 20 }
    }

    const applySocialLayout = () => {
      const header = getHeader()
      if (!header || !socialWrap) return
      const hr = header.getBoundingClientRect()
      const heroRect = hero.getBoundingClientRect()
      const h = socialWrap.offsetHeight
      const { bottomPad, rightPad } = layoutPads()
      const naturalTop = heroRect.bottom - bottomPad - h
      const dockTop = hr.top + hr.height / 2 - h / 2

      const delta = naturalTop - hr.bottom
      const span = BLEND_REST - BLEND_DOCKED
      let blend = span > 0 ? (BLEND_REST - delta) / span : delta <= BLEND_DOCKED ? 1 : 0

      if (reduceMotionRef.current) {
        blend = blend >= 0.5 ? 1 : 0
      } else {
        blend = smoothstep01(blend)
      }

      const top = naturalTop * (1 - blend) + dockTop * blend
      const scale = 1 - 0.035 * blend

      socialWrap.style.position = 'fixed'
      socialWrap.style.top = `${top}px`
      socialWrap.style.right = `${rightPad}px`
      socialWrap.style.bottom = 'auto'
      socialWrap.style.left = 'auto'
      socialWrap.style.zIndex = '60'
      socialWrap.style.transform = scale !== 1 ? `scale(${scale})` : ''
      socialWrap.style.transformOrigin = 'right center'
    }

    const update = () => applySocialLayout()

    update()

    let scheduled = false
    const onScrollOrResize = () => {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(() => {
        scheduled = false
        update()
      })
    }
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    hero.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    const onReduceMotion = () => {
      reduceMotionRef.current = mqReduce.matches
      update()
    }
    mqReduce.addEventListener('change', onReduceMotion)

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => requestAnimationFrame(update))
        : null
    ro?.observe(socialWrap)
    ro?.observe(hero)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      hero.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      mqReduce.removeEventListener('change', onReduceMotion)
      ro?.disconnect()
      socialWrap.style.removeProperty('position')
      socialWrap.style.removeProperty('top')
      socialWrap.style.removeProperty('right')
      socialWrap.style.removeProperty('bottom')
      socialWrap.style.removeProperty('left')
      socialWrap.style.removeProperty('z-index')
      socialWrap.style.removeProperty('transform')
      socialWrap.style.removeProperty('transform-origin')
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-20 isolate flex min-h-dvh flex-col overflow-y-auto overflow-x-hidden bg-[#102430] scroll-mt-[5.5rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[#102430]"
        style={{ backgroundImage: heroBackgroundImage }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-20 pt-[6.25rem] text-center sm:px-8 sm:pb-28 sm:pt-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <span className="mb-4 block size-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]" aria-hidden />

          <p className="mb-8 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-md sm:text-[13px]">
            1,335 People are on waitlist
          </p>

          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl md:leading-[1.08]">
            Clarity in Complexity
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/88 sm:text-lg">
            We help you decode the noise. One insight at a time.
            <span className="mt-2 block text-white/75 sm:mt-3">
              Transform chaos into clarity with intelligent solutions built for scale.
            </span>
          </p>

          <a
            href="#contact"
            className="mt-10 group relative inline-flex items-center justify-center gap-3 rounded-full px-2 py-2 text-[15px] font-semibold tracking-tight text-white/85 transition-[transform,color] duration-300 ease-out hover:-translate-y-0.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 motion-reduce:transition-none"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-8 opacity-0 blur-2xl transition-[opacity,transform] duration-700 ease-out group-hover:opacity-100 group-hover:scale-105 motion-reduce:hidden"
              style={{
                background:
                  'radial-gradient(55% 60% at 78% 55%, rgba(212,217,219,0.42) 0%, rgba(212,217,219,0.18) 38%, transparent 72%)',
              }}
            />
            <span className="relative px-4 py-1 transition-[transform,letter-spacing] duration-500 ease-out group-hover:translate-x-[1px] group-hover:tracking-[0.01em]">
              <span className="relative">
                Nous contacter
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/75 to-transparent transition-transform duration-700 ease-out delay-75 group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </span>
            </span>
            <span className="relative inline-flex size-10 items-center justify-center rounded-full border border-[#D4D9DB]/45 bg-[#D4D9DB]/30 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_44px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-[transform,background-color,box-shadow] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:bg-[#D4D9DB]/40 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_18px_64px_-28px_rgba(0,0,0,0.75)] motion-reduce:transition-none">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:opacity-100 group-hover:translate-x-[55%] motion-reduce:hidden"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.5) 45%, transparent 60%)',
                  transform: 'translateX(-55%)',
                }}
              />
              <ArrowRightIcon className="relative size-5 opacity-90 transition-transform duration-500 ease-out group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </a>
        </div>
      </div>

      <div
        ref={socialWrapRef}
        className="pointer-events-auto fixed bottom-auto left-auto z-[60] will-change-[top,transform] sm:bottom-auto"
      >
        <SocialGlassNav />
      </div>
    </section>
  )
}
