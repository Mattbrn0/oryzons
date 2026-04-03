import { useEffect, useRef } from 'react'

interface HalftoneImageProps {
  src: string
  grid?: number
  className?: string
  reveal?: 'edges' | 'leftToRight' | 'rightToLeft' | 'bottomToTop'
  fit?: 'stretch' | 'cover' | 'contain' | 'containY'
  /** Position horizontale du calque image avant halftone (contain / containY). */
  hAlign?: 'left' | 'center' | 'right'
  /** Rayon minimal pour afficher un point (plus bas = plus de détail dans les gris clairs). Défaut 0.3 */
  minVisibleRadius?: number
  /** Amplitude du jitter sur l’ordre d’apparition (0 = ordre strict, plus propre). Défaut 0.12 */
  thresholdNoise?: number
  /** Plafond DPR manuel (sinon 2 si largeur ≤ 640, sinon 1.5) */
  dprCap?: number
  /** Courbe sur la luminance avant le rayon : >1 assombrit les mi‑tons (plus de points). Défaut 1 */
  toneGamma?: number
}

export default function HalftoneImage({
  src,
  grid = 6,
  className = '',
  reveal = 'edges',
  fit = 'stretch',
  hAlign = 'center',
  minVisibleRadius = 0.3,
  thresholdNoise = 0.12,
  dprCap: dprCapProp,
  toneGamma = 1,
}: HalftoneImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    const canvas = canvasRef.current
    if (!canvas) return
    // willReadFrequently évite un re-upload GPU à chaque getImageData
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    interface Dot { cx: number; cy: number; r: number; alpha: number; threshold: number }
    let dots: Dot[] = []
    let ready = false
    let rafId: number | null = null
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    let cancelled = false
    let isVisible = false
    let started = false

    const img = new Image()
    img.decoding = 'async'
    img.src = src

    const stop = () => {
      if (rafId != null) { cancelAnimationFrame(rafId); rafId = null }
    }

    const computeDots = async () => {
      stop()
      started = false
      ready = false
      dots = []
      if (cancelled) return

      try { await img.decode() } catch { /* noop */ }
      if (cancelled) return

      const W = Math.round(canvas.clientWidth)
      const H = Math.round(canvas.clientHeight)
      const dprCap = dprCapProp ?? (W <= 640 ? 2 : 1.5)
      const dpr = Math.min(window.devicePixelRatio || 1, reduceMotion ? 1 : dprCap)
      if (!W || !H) return

      canvas.width  = Math.max(1, Math.floor(W * dpr))
      canvas.height = Math.max(1, Math.floor(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      // Canvas offscreen pour échantillonner les pixels
      const off = document.createElement('canvas')
      off.width  = W
      off.height = H
      const oc = off.getContext('2d', { willReadFrequently: true })
      if (!oc) return
      oc.fillStyle = '#fff'
      oc.fillRect(0, 0, W, H)

      const drawImage = () => {
        if (fit === 'stretch') { oc.drawImage(img, 0, 0, W, H); return }
        const iw = img.width  || 1
        const ih = img.height || 1
        const ir = iw / ih
        const cr = W / H
        let dw = W, dh = H
        if      (fit === 'containY') { dh = H; dw = dh * ir }
        else if (fit === 'cover') {
          if (ir > cr) { dh = H; dw = dh * ir }
          else { dw = W; dh = dw / ir }
        } else {
          if (ir > cr) { dw = W; dh = dw / ir }
          else { dh = H; dw = dh * ir }
        }
        const dx =
          hAlign === 'left' ? 0 : hAlign === 'right' ? Math.max(0, W - dw) : (W - dw) / 2
        const dy = fit === 'containY' ? 0 : (H - dh) / 2
        oc.drawImage(img, dx, dy, dw, dh)
      }

      drawImage()

      const data = oc.getImageData(0, 0, W, H).data
      const MAX_R = grid * 0.62
      ctx.fillStyle = '#0A0A0A'

      const cellLum = (x0: number, y0: number, x1: number, y1: number) => {
        let sum = 0
        let n = 0
        for (let y = y0; y < y1; y++) {
          const row = y * W * 4
          for (let x = x0; x < x1; x++) {
            const i = row + x * 4
            sum += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
            n++
          }
        }
        return n > 0 ? sum / (n * 255) : 1
      }

      const nextDots: Dot[] = []
      const jitter = thresholdNoise > 0 ? thresholdNoise : 0
      for (let gx = 0; gx * grid < W; gx++) {
        for (let gy = 0; gy * grid < H; gy++) {
          const x0 = gx * grid
          const y0 = gy * grid
          const x1 = Math.min(x0 + grid, W)
          const y1 = Math.min(y0 + grid, H)
          const cx = (x0 + x1) / 2
          const cy = (y0 + y1) / 2
          let lum = cellLum(x0, y0, x1, y1)
          if (toneGamma !== 1 && toneGamma > 0) {
            lum = Math.min(1, Math.max(0, Math.pow(lum, toneGamma)))
          }
          const r = MAX_R * (1 - lum)
          if (r < minVisibleRadius) continue
          const base =
            reveal === 'leftToRight'
              ? cx / W
              : reveal === 'rightToLeft'
                ? 1 - cx / W
                : reveal === 'bottomToTop'
                  ? 1 - cy / H
                  : Math.min(cx, W - cx) / (W * 0.5)

          const threshold = jitter
            ? Math.max(0, Math.min(1, base + (Math.random() - 0.5) * jitter))
            : base
          nextDots.push({ cx, cy, r, alpha: 0.78 + (1 - lum) * 0.22, threshold })
        }
      }

      nextDots.sort((a, b) => (a.threshold === b.threshold ? a.cy - b.cy || a.cx - b.cx : a.threshold - b.threshold))
      dots = nextDots
      ready = true
      if (isVisible) startAnimation()
    }

    const startAnimation = () => {
      if (started) return
      started = true
      stop()

      if (reduceMotion) {
        ctx.fillStyle = '#0A0A0A'
        for (const d of dots) {
          ctx.globalAlpha = d.alpha
          ctx.beginPath()
          ctx.arc(d.cx, d.cy, d.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
        return
      }

      const DURATION = 2200
      let startTime: number | null = null
      let ptr = 0
      // easing un peu plus doux
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

      ctx.fillStyle = '#0A0A0A'
      const frame = (ts: number) => {
        if (cancelled) return
        if (!startTime) startTime = ts
        const t      = Math.min((ts - startTime) / DURATION, 1)
        const tEased = easeOut(t)

        while (ptr < dots.length && dots[ptr].threshold <= tEased) {
          const d = dots[ptr]
          ctx.globalAlpha = d.alpha
          ctx.beginPath()
          ctx.arc(d.cx, d.cy, d.r, 0, Math.PI * 2)
          ctx.fill()
          ptr++
        }

        if (t < 1) rafId = requestAnimationFrame(frame)
        else ctx.globalAlpha = 1
      }

      rafId = requestAnimationFrame(frame)
    }

    // Stopper le RAF quand l'élément sort du viewport
    const visibilityObserver = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          isVisible = true
          visibilityObserver.disconnect()
          if (ready) startAnimation()
        } else {
          // hors viewport → pause
          stop()
        }
      },
      { threshold: 0.05 }
    )
    visibilityObserver.observe(canvas)

    void computeDots()

    // Debounce resize à 200 ms pour éviter des recalculs intempestifs
    const ro = new ResizeObserver(() => {
      if (resizeTimer != null) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resizeTimer = null
        if (cancelled || !isVisible) return
        started = false
        void computeDots()
      }, 200)
    })
    ro.observe(canvas)

    return () => {
      cancelled = true
      stop()
      if (resizeTimer != null) clearTimeout(resizeTimer)
      ro.disconnect()
      visibilityObserver.disconnect()
    }
  }, [src, grid, reveal, fit, hAlign, minVisibleRadius, thresholdNoise, dprCapProp, toneGamma])

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      style={{ contain: 'strict' }}
      aria-hidden
    />
  )
}
