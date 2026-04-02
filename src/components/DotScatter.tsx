import { useEffect, useRef } from 'react'

interface Dot {
  cx: number
  cy: number
  r: number
  alpha: number
  threshold: number
}

export default function DotScatter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let rafId: number | null = null
    let resizeTimer: ReturnType<typeof setTimeout> | null = null
    let cancelled = false
    let started = false
    let isVisible = false

    const img = new Image()
    img.decoding = 'async'
    img.src = '/hands.png'

    const stop = () => {
      if (rafId != null) { cancelAnimationFrame(rafId); rafId = null }
    }

    const run = async () => {
      stop()
      started = false
      if (cancelled) return

      try { await img.decode() } catch { /* noop */ }
      if (cancelled) return

      // Cap DPR à 1.5
      const dpr = Math.min(window.devicePixelRatio || 1, reduceMotion ? 1 : 1.5)
      const W = Math.round(canvas.clientWidth)
      const H = Math.round(canvas.clientHeight)
      if (!W || !H) return

      canvas.width  = Math.max(1, Math.floor(W * dpr))
      canvas.height = Math.max(1, Math.floor(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      const imgAspect = img.width / img.height
      const isNarrowViewport = W <= 768

      let drawW: number
      let drawH: number
      let drawX: number
      let drawY: number

      if (isNarrowViewport) {
        // Mobile / portrait : remplir tout le hero (équivalent object-fit: cover)
        const canvasR = W / H
        if (imgAspect > canvasR) {
          drawH = H
          drawW = H * imgAspect
          drawX = (W - drawW) / 2
          drawY = 0
        } else {
          drawW = W
          drawH = W / imgAspect
          drawX = 0
          drawY = (H - drawH) / 2
        }
      } else {
        // Desktop : cadrage d’origine (mains centrées)
        drawW = W
        drawH = drawW / imgAspect
        const GAP_X = 0.50
        const GAP_Y = 0.52
        drawX = W * 0.5 - GAP_X * drawW
        drawY = H * 0.5 - GAP_Y * drawH
      }

      const off = document.createElement('canvas')
      off.width  = W
      off.height = H
      const oc = off.getContext('2d', { willReadFrequently: true })
      if (!oc) return
      oc.fillStyle = '#fff'
      oc.fillRect(0, 0, W, H)
      oc.drawImage(img, drawX, drawY, drawW, drawH)
      const data = oc.getImageData(0, 0, W, H).data

      const GRID = 7
      const MAX_R = GRID * 0.60
      const dots: Dot[] = []

      for (let gx = 0; gx * GRID < W; gx++) {
        for (let gy = 0; gy * GRID < H; gy++) {
          const cx = gx * GRID + GRID / 2
          const cy = gy * GRID + GRID / 2
          const px = Math.min(Math.floor(cx), W - 1)
          const py = Math.min(Math.floor(cy), H - 1)
          const i  = (py * W + px) * 4
          const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
          const r = MAX_R * (1 - lum)
          if (r < 0.35) continue
          const edgeDist = Math.min(cx, W - cx) / (W * 0.5)
          const noise = (Math.random() - 0.5) * 0.18
          const threshold = Math.max(0, Math.min(1, edgeDist + noise))
          dots.push({ cx, cy, r, alpha: 0.80 + (1 - lum) * 0.20, threshold })
        }
      }

      dots.sort((a, b) => a.threshold - b.threshold)
      ctx.fillStyle = '#0A0A0A'

      if (reduceMotion) {
        for (const d of dots) {
          ctx.globalAlpha = d.alpha
          ctx.beginPath()
          ctx.arc(d.cx, d.cy, d.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
        started = true
        return
      }

      const DURATION = 2200
      let startTime: number | null = null
      let ptr = 0
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.8)

      const frame = (ts: number) => {
        if (cancelled) return
        if (!startTime) startTime = ts
        const t = Math.min((ts - startTime) / DURATION, 1)
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
      started = true
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          isVisible = true
          observer.disconnect()
          void run()
        } else {
          stop()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    // Debounce resize 200 ms
    const ro = new ResizeObserver(() => {
      if (resizeTimer != null) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resizeTimer = null
        if (cancelled || !isVisible) return
        if (started) void run()
      }, 200)
    })
    ro.observe(canvas)

    return () => {
      cancelled = true
      stop()
      if (resizeTimer != null) clearTimeout(resizeTimer)
      ro.disconnect()
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ contain: 'strict' }}
      aria-hidden
    />
  )
}
