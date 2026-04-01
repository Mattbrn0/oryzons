import { useEffect, useRef } from 'react'

interface HalftoneImageProps {
  src: string
  grid?: number
  className?: string
  reveal?: 'edges' | 'leftToRight' | 'rightToLeft' | 'bottomToTop'
  fit?: 'stretch' | 'cover' | 'contain' | 'containY'
}

export default function HalftoneImage({ src, grid = 6, className = '', reveal = 'edges', fit = 'stretch' }: HalftoneImageProps) {
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

      // Cap DPR à 1.5 : au-delà le gain visuel est nul, la mémoire double
      const dpr = Math.min(window.devicePixelRatio || 1, reduceMotion ? 1 : 1.5)
      const W = Math.round(canvas.clientWidth)
      const H = Math.round(canvas.clientHeight)
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
        else if (fit === 'cover')    { ir > cr ? (dh = H, dw = dh * ir) : (dw = W, dh = dw / ir) }
        else                         { ir > cr ? (dw = W, dh = dw / ir) : (dh = H, dw = dh * ir) }
        const dx = (W - dw) / 2
        const dy = fit === 'containY' ? 0 : (H - dh) / 2
        oc.drawImage(img, dx, dy, dw, dh)
      }

      drawImage()

      const data = oc.getImageData(0, 0, W, H).data
      const MAX_R = grid * 0.62
      ctx.fillStyle = '#0A0A0A'

      const nextDots: Dot[] = []
      for (let gx = 0; gx * grid < W; gx++) {
        for (let gy = 0; gy * grid < H; gy++) {
          const cx = gx * grid + grid / 2
          const cy = gy * grid + grid / 2
          const px = Math.min(Math.floor(cx), W - 1)
          const py = Math.min(Math.floor(cy), H - 1)
          const i  = (py * W + px) * 4
          const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
          const r = MAX_R * (1 - lum)
          if (r < 0.3) continue
          const base =
            reveal === 'leftToRight'
              ? (cx / W)
              : reveal === 'rightToLeft'
                ? (1 - cx / W)
                : reveal === 'bottomToTop'
                  ? (1 - cy / H)
                  : (Math.min(cx, W - cx) / (W * 0.5))

          // un peu moins de "bruit" => rendu plus fluide
          const threshold = Math.max(0, Math.min(1, base + (Math.random() - 0.5) * 0.16))
          nextDots.push({ cx, cy, r, alpha: 0.78 + (1 - lum) * 0.22, threshold })
        }
      }

      nextDots.sort((a, b) => a.threshold - b.threshold)
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
  }, [src, grid, reveal, fit])

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      style={{ contain: 'strict' }}
      aria-hidden
    />
  )
}
