import { useEffect, useRef } from 'react'

interface Props { value: string; className?: string }

export default function HalftoneNum({ value, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let rafId: number | null = null
    let cancelled = false

    const stop = () => {
      if (rafId != null) { cancelAnimationFrame(rafId); rafId = null }
    }

    // Cap DPR à 1.5
    const dpr = Math.min(window.devicePixelRatio || 1, reduceMotion ? 1 : 1.5)
    const W = canvas.offsetWidth  || 220
    const H = canvas.offsetHeight || 110
    canvas.width  = Math.floor(W * dpr)
    canvas.height = Math.floor(H * dpr)
    ctx.scale(dpr, dpr)

    const off = document.createElement('canvas')
    off.width  = W
    off.height = H
    const oc = off.getContext('2d', { willReadFrequently: true })!
    oc.fillStyle = '#fff'
    oc.fillRect(0, 0, W, H)
    oc.fillStyle = '#000'
    oc.font = `900 ${Math.round(H * 0.84)}px 'Instrument Serif', serif`
    oc.textAlign = 'center'
    oc.textBaseline = 'middle'
    oc.fillText(value, W / 2, H / 2)

    const zeroCenter = value.length === 2 ? W * 0.27 : W * 0.5
    const cutW = W * 0.05
    oc.fillStyle = '#fff'
    oc.fillRect(zeroCenter - cutW / 2, H * 0.06, cutW, H * 0.88)

    const data = oc.getImageData(0, 0, W, H).data
    const grid = 4
    const MAX_R = grid * 0.58

    interface Dot { cx: number; cy: number; r: number; threshold: number }
    const dots: Dot[] = []

    for (let gx = 0; gx * grid < W; gx++) {
      for (let gy = 0; gy * grid < H; gy++) {
        const cx = gx * grid + grid / 2
        const cy = gy * grid + grid / 2
        const px = Math.min(Math.floor(cx), W - 1)
        const py = Math.min(Math.floor(cy), H - 1)
        const idx = (py * W + px) * 4
        const lum = (data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114) / 255
        const r = MAX_R * (1 - lum)
        if (r < 0.28) continue
        const edgeDist = Math.min(cx, W - cx) / (W * 0.5)
        const threshold = Math.max(0, Math.min(1, edgeDist + (Math.random() - 0.5) * 0.2))
        dots.push({ cx, cy, r, threshold })
      }
    }

    dots.sort((a, b) => a.threshold - b.threshold)
    ctx.fillStyle = '#0A0A0A'

    const startAnimation = () => {
      if (reduceMotion) {
        for (const d of dots) {
          ctx.beginPath()
          ctx.arc(d.cx, d.cy, d.r, 0, Math.PI * 2)
          ctx.fill()
        }
        return
      }

      const DURATION = 1600
      let startTime: number | null = null
      let ptr = 0
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.5)

      const frame = (ts: number) => {
        if (cancelled) return
        if (!startTime) startTime = ts
        const t = Math.min((ts - startTime) / DURATION, 1)
        const tEased = easeOut(t)
        while (ptr < dots.length && dots[ptr].threshold <= tEased) {
          const d = dots[ptr]
          ctx.beginPath()
          ctx.arc(d.cx, d.cy, d.r, 0, Math.PI * 2)
          ctx.fill()
          ptr++
        }
        if (t < 1) rafId = requestAnimationFrame(frame)
      }

      rafId = requestAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect()
          startAnimation()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    return () => {
      cancelled = true
      stop()
      observer.disconnect()
    }
  }, [value])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ contain: 'strict' }}
      aria-hidden
    />
  )
}
