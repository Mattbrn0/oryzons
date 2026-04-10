import { useEffect, useRef } from 'react'

export type ServicePointsVariant = 'creation' | 'hebergement' | 'evolution' | 'seo' | 'sav'

const INK = '10, 10, 10'

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, a: number) {
  if (a <= 0.01) return
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${INK},${a})`
  ctx.fill()
}

/** Points régulièrement espacés sur un segment */
function dotsOnSegment(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  spacing: number,
  r: number,
  baseA: number,
  wobble: number,
  t: number,
  phase: number,
) {
  const dx = x1 - x0
  const dy = y1 - y0
  const len = Math.hypot(dx, dy) || 1
  const n = Math.max(2, Math.floor(len / spacing))
  for (let i = 0; i <= n; i++) {
    const u = i / n
    const x = x0 + dx * u
    const y = y0 + dy * u
    const a = baseA + wobble * Math.sin(t * 1.3 + phase + u * 4)
    dot(ctx, x, y, r, Math.min(0.92, Math.max(0.06, a)))
  }
}

function cornerArcDots(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
  steps: number,
) {
  for (let i = 0; i <= steps; i++) {
    const u = i / steps
    const a = a0 + (a1 - a0) * u
    dot(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1.15, 0.3)
  }
}

/** Création : fenêtre de navigateur lisible (chrome, barre d’adresse, zones contenu + CTA) */
function drawCreation(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const m = Math.min(w, h) * 0.06
  const x0 = m
  const y0 = m
  const fw = w - 2 * m
  const fh = h - 2 * m
  const round = Math.min(14, fw * 0.04)

  // Cadrage fenêtre : 4 côtés
  const sp = 5.5
  dotsOnSegment(ctx, x0 + round, y0, x0 + fw - round, y0, sp, 1.25, 0.32, 0.06, t, 0)
  dotsOnSegment(ctx, x0 + fw, y0 + round, x0 + fw, y0 + fh - round, sp, 1.25, 0.32, 0.06, t, 1)
  dotsOnSegment(ctx, x0 + fw - round, y0 + fh, x0 + round, y0 + fh, sp, 1.25, 0.32, 0.06, t, 2)
  dotsOnSegment(ctx, x0, y0 + fh - round, x0, y0 + round, sp, 1.25, 0.32, 0.06, t, 3)
  const as = 5
  cornerArcDots(ctx, x0 + round, y0 + round, round, Math.PI, Math.PI * 1.5, as)
  cornerArcDots(ctx, x0 + fw - round, y0 + round, round, Math.PI * 1.5, Math.PI * 2, as)
  cornerArcDots(ctx, x0 + fw - round, y0 + fh - round, round, 0, Math.PI * 0.5, as)
  cornerArcDots(ctx, x0 + round, y0 + fh - round, round, Math.PI * 0.5, Math.PI, as)

  const chromeH = fh * 0.13
  const yChrome = y0 + chromeH * 0.5
  // Pastilles trafic
  dot(ctx, x0 + 14, yChrome, 2.2, 0.45 + 0.15 * Math.sin(t * 2))
  dot(ctx, x0 + 28, yChrome, 2.2, 0.38 + 0.15 * Math.sin(t * 2 + 1))
  dot(ctx, x0 + 42, yChrome, 2.2, 0.32 + 0.15 * Math.sin(t * 2 + 2))

  // Barre d’adresse
  const urlY = y0 + chromeH * 0.88
  dotsOnSegment(ctx, x0 + fw * 0.18, urlY, x0 + fw * 0.92, urlY, 4.2, 1.05, 0.22, 0.08, t, 4)

  const contentTop = y0 + chromeH + fh * 0.06
  const split = x0 + fw * 0.2
  // Colonne menu (navigation)
  for (let yy = contentTop; yy < y0 + fh - fh * 0.22; yy += 5.5) {
    const a = 0.18 + 0.08 * Math.sin(t * 0.9 + yy * 0.04)
    dot(ctx, x0 + fw * 0.08, yy, 1.15, a)
  }

  // Bloc « hero » (grille dense)
  const hx0 = split + 6
  const hy0 = contentTop
  const hw = fw * 0.72
  const hh = fh * 0.28
  for (let gy = 0; gy < 6; gy++) {
    for (let gx = 0; gx < 16; gx++) {
      const px = hx0 + (gx / 15) * hw
      const py = hy0 + (gy / 5) * hh
      const a = 0.28 + 0.2 * Math.sin(t * 1.1 + gx * 0.15 + gy * 0.2)
      dot(ctx, px, py, 1.55, a)
    }
  }

  // Lignes de texte
  const ly0 = hy0 + hh + fh * 0.05
  for (let row = 0; row < 4; row++) {
    const yy = ly0 + row * (fh * 0.065)
    const len = 0.55 + (row % 3) * 0.08
    dotsOnSegment(ctx, hx0, yy, hx0 + hw * len, yy, 5, 1.1, 0.2, 0.06, t, row)
  }
  // Bouton CTA (rectangle plein en points)
  const bx0 = hx0
  const by0 = ly0 + fh * 0.34
  const bw = fw * 0.28
  const bh = fh * 0.11
  for (let gy = 0; gy < 4; gy++) {
    for (let gx = 0; gx < 8; gx++) {
      const px = bx0 + (gx / 7) * bw
      const py = by0 + (gy / 3) * bh
      dot(ctx, px, py, 1.5, 0.4 + 0.18 * Math.sin(t * 1.4 + gx + gy))
    }
  }
}

/** Hébergement : trois baies serveur avec diodes et « baies » empilées */
function drawHebergement(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const unitH = h * 0.22
  const gap = h * 0.06
  const yStart = h * 0.14
  const x0 = w * 0.12
  const uw = w * 0.76
  for (let u = 0; u < 3; u++) {
    const y = yStart + u * (unitH + gap)
    const sp = 5
    dotsOnSegment(ctx, x0, y, x0 + uw, y, sp, 1.2, 0.3, 0.05, t, u)
    dotsOnSegment(ctx, x0 + uw, y, x0 + uw, y + unitH, sp, 1.2, 0.28, 0.05, t, u + 0.3)
    dotsOnSegment(ctx, x0 + uw, y + unitH, x0, y + unitH, sp, 1.2, 0.28, 0.05, t, u + 0.6)
    dotsOnSegment(ctx, x0, y + unitH, x0, y, sp, 1.2, 0.3, 0.05, t, u + 0.9)
    // Lignes intérieures (cartes)
    for (let k = 1; k <= 2; k++) {
      const yy = y + (unitH * k) / 3
      dotsOnSegment(ctx, x0 + 8, yy, x0 + uw * 0.78, yy, 6, 1, 0.16, 0.06, t, k + u)
    }
    // Diodes
    const ledX = x0 + uw * 0.88
    dot(ctx, ledX, y + unitH * 0.28, 2.2, 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.2 + u)))
    dot(ctx, ledX, y + unitH * 0.5, 2, 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.8 + u + 1)))
    dot(ctx, ledX, y + unitH * 0.72, 1.8, 0.2 + 0.3 * (0.5 + 0.5 * Math.sin(t * 2.5 + u + 2)))
  }
  // Flèche « flux » sous les baies
  const fx = w * 0.35
  const fy = h * 0.88
  dotsOnSegment(ctx, fx, fy, w * 0.65, fy, 7, 1.2, 0.22, 0.08, t, 0)
  for (let i = 0; i < 5; i++) {
    const u = i / 4
    dot(ctx, w * 0.62 + u * 8, fy - u * 6, 1.3, 0.28)
  }
}

/** Évolution : boucle ∞ (amélioration continue) + mini « patchs » (correctifs / mises à jour) */
function drawEvolution(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w * 0.5
  const cy = h * 0.46
  const scale = Math.min(w, h) * 0.34
  const n = 96
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i < n; i++) {
    const tt = (i / n) * Math.PI * 2
    const s = Math.sin(tt)
    const co = Math.cos(tt)
    const denom = 1 + s * s
    const x = cx + (scale * co) / denom
    const y = cy + (scale * s * co) / denom
    pts.push({ x, y })
  }

  const traveler = Math.floor(t * 16) % n
  for (let i = 0; i < n; i++) {
    const circ = Math.min(Math.abs(i - traveler), n - Math.abs(i - traveler))
    const hi = Math.max(0, 1 - circ / 6)
    const { x: px, y: py } = pts[i]
    const a = 0.12 + 0.52 * hi + 0.12 * Math.sin(t * 1.8 + i * 0.07)
    dot(ctx, px, py, 1.15 + 1 * hi, Math.min(0.9, a))
  }

  const patchCenters: [number, number][] = [
    [w * 0.16, h * 0.22],
    [w * 0.84, h * 0.26],
    [w * 0.14, h * 0.74],
    [w * 0.86, h * 0.7],
    [w * 0.5, h * 0.12],
  ]
  for (let p = 0; p < patchCenters.length; p++) {
    const [mx, my] = patchCenters[p]
    for (let ky = -1; ky <= 1; ky++) {
      for (let kx = -1; kx <= 1; kx++) {
        if (kx === 0 && ky === 0) continue
        const a = 0.14 + 0.12 * Math.sin(t * 1.4 + p + kx + ky)
        dot(ctx, mx + kx * 7, my + ky * 7, 1.15, a)
      }
    }
    dot(ctx, mx, my, 2, 0.32 + 0.22 * Math.sin(t * 2 + p))
  }

  const hx = cx
  const hy = cy - scale * 0.02
  dot(ctx, hx, hy, 2.6, 0.28 + 0.18 * Math.sin(t * 1.3))
}

/** SEO : loupe classique + « résultats » en lignes sous la lentille */
function drawSeo(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const R = Math.min(w, h) * 0.22
  const cx = w * 0.38
  const cy = h * 0.36
  const nRing = 42
  for (let i = 0; i < nRing; i++) {
    const ang = (i / nRing) * Math.PI * 2 + t * 0.08
    const x = cx + Math.cos(ang) * R
    const y = cy + Math.sin(ang) * R
    const a = 0.35 + 0.25 * (0.5 + 0.5 * Math.sin(t * 0.9 + i * 0.2))
    dot(ctx, x, y, 1.45, a)
  }
  // Remplissage lentille (grille légère)
  for (let gy = -4; gy <= 4; gy++) {
    for (let gx = -4; gx <= 4; gx++) {
      if (gx * gx + gy * gy > 14) continue
      const x = cx + gx * (R * 0.2)
      const y = cy + gy * (R * 0.2)
      dot(ctx, x, y, 1.05, 0.08 + 0.06 * Math.sin(t + gx + gy))
    }
  }
  // Centre (reflet)
  dot(ctx, cx - R * 0.25, cy - R * 0.25, 2.2, 0.25 + 0.15 * Math.sin(t * 1.5))

  // Manche de la loupe
  const ang = Math.PI / 4
  const hx0 = cx + Math.cos(ang) * R * 0.92
  const hy0 = cy + Math.sin(ang) * R * 0.92
  for (let i = 0; i < 14; i++) {
    const d = i * 6.5
    dot(ctx, hx0 + Math.cos(ang) * d, hy0 + Math.sin(ang) * d, 1.5 + i * 0.04, 0.32 + 0.08 * Math.sin(t + i))
  }

  // Snippet résultats de recherche (lignes de largeur décroissante)
  const sy = h * 0.62
  const sx0 = w * 0.1
  for (let line = 0; line < 5; line++) {
    const yy = sy + line * (h * 0.055)
    const len = 0.92 - line * 0.12
    const highlight = line === 1 ? 0.15 * Math.sin(t * 1.8) : 0
    dotsOnSegment(ctx, sx0, yy, sx0 + w * 0.82 * len, yy, 5, 1.15, 0.16 + highlight, 0.07, t, line)
  }
  // Petite « cote » position (barres style classement)
  const bx = w * 0.72
  const by = h * 0.25
  for (let col = 0; col < 4; col++) {
    const nh = 3 + col
    for (let j = 0; j < nh; j++) {
      dot(ctx, bx + col * 9, by - j * 7, 1.35, 0.2 + 0.15 * (j / nh) + 0.1 * Math.sin(t + col))
    }
  }
}

/** SAV : casque d’assistance + micro + ondes « disponible » (métaphore support hotline) */
function drawSav(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cy = h * 0.44
  const rx = Math.max(8, w * 0.062)
  const ry = Math.max(18, h * 0.15)
  const cxL = w * 0.32
  const cxR = w * 0.68

  function earCup(cx: number, phase: number) {
    const n = 38
    for (let i = 0; i < n; i++) {
      const u = (i / n) * Math.PI * 2
      const x = cx + rx * Math.cos(u)
      const y = cy + ry * Math.sin(u)
      const a = 0.26 + 0.22 * Math.sin(t * 1.05 + i * 0.11 + phase)
      dot(ctx, x, y, 1.35, Math.min(0.88, a))
    }
    const n2 = 22
    const irx = rx * 0.55
    const iry = ry * 0.62
    for (let i = 0; i < n2; i++) {
      const u = (i / n2) * Math.PI * 2
      dot(ctx, cx + irx * Math.cos(u), cy + iry * Math.sin(u), 1.05, 0.1 + 0.08 * Math.sin(t * 0.8 + i + phase))
    }
  }

  earCup(cxL, 0)
  earCup(cxR, 1.7)

  const bandCx = w * 0.5
  const bandCy = cy - ry * 0.38
  const bandR = w * 0.21
  const steps = 22
  for (let i = 0; i <= steps; i++) {
    const u = i / steps
    const ang = Math.PI * 0.75 + Math.PI * 0.5 * u
    const x = bandCx + Math.cos(ang) * bandR
    const y = bandCy + Math.sin(ang) * bandR * 0.48
    dot(ctx, x, y, 1.3, 0.3 + 0.1 * Math.sin(t * 1.2 + i * 0.2))
  }

  const boomSteps = 11
  const sx = cxR - rx * 0.35
  const sy = cy + ry * 0.25
  const ex = cxR - rx * 1.75
  const ey = cy + ry * 1.05
  for (let i = 0; i <= boomSteps; i++) {
    const u = i / boomSteps
    const x = sx + (ex - sx) * u
    const y = sy + (ey - sy) * u + Math.sin(u * Math.PI) * 4
    const a = 0.28 + 0.14 * Math.sin(t * 1.8 + i * 0.35)
    dot(ctx, x, y, 1.25 + u * 0.35, a)
  }
  dot(ctx, ex, ey, 2.4, 0.42 + 0.2 * Math.sin(t * 2.5))

  const ox = w * 0.5
  const oy = h * 0.78
  for (let ring = 0; ring < 3; ring++) {
    const baseR = 14 + ring * 11
    const pulse = Math.sin(t * 2.2 - ring * 0.5) * 4
    const rad = baseR + pulse
    const count = 14
    for (let k = 0; k < count; k++) {
      const ang = (k / count) * Math.PI * 2 + t * 0.35 * (ring % 2 === 0 ? 1 : -0.7)
      const a = 0.08 + 0.12 * (1 - ring * 0.25) + 0.1 * (0.5 + 0.5 * Math.sin(t * 2 + k + ring))
      dot(ctx, ox + Math.cos(ang) * rad, oy + Math.sin(ang) * rad * 0.38, 1.05, Math.min(0.55, a))
    }
  }
  dot(ctx, ox, oy, 2.2, 0.35 + 0.25 * Math.sin(t * 2.8))
}

function drawVariant(
  ctx: CanvasRenderingContext2D,
  v: ServicePointsVariant,
  w: number,
  h: number,
  t: number,
) {
  switch (v) {
    case 'creation':
      drawCreation(ctx, w, h, t)
      break
    case 'hebergement':
      drawHebergement(ctx, w, h, t)
      break
    case 'evolution':
      drawEvolution(ctx, w, h, t)
      break
    case 'seo':
      drawSeo(ctx, w, h, t)
      break
    case 'sav':
      drawSav(ctx, w, h, t)
      break
    default:
      break
  }
}

type Props = { variant: ServicePointsVariant }

export default function ServicePointsCanvas({ variant }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const start = performance.now()
    let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => {
      reduceMotion = mq.matches
    }
    mq.addEventListener('change', onMq)

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cw = Math.max(1, Math.round(rect.width * dpr))
      const ch = Math.max(1, Math.round(rect.height * dpr))
      canvas.width = cw
      canvas.height = ch
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduceMotion) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(tick)
      }
    })
    ro.observe(wrap)
    resize()

    const tick = (now: number) => {
      const rect = wrap.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      if (width < 2 || height < 2) {
        raf = requestAnimationFrame(tick)
        return
      }
      const tSec = reduceMotion ? 0 : (now - start) / 1000
      ctx.save()
      const dpr = canvas.width / width
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      drawVariant(ctx, variant, width, height, tSec)
      ctx.restore()
      if (!reduceMotion) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      mq.removeEventListener('change', onMq)
      ro.disconnect()
    }
  }, [variant])

  return (
    <div ref={wrapRef} className="relative h-full min-h-[200px] w-full">
      <canvas
        ref={canvasRef}
        className="services-points-canvas block size-full"
        aria-hidden
      />
    </div>
  )
}
