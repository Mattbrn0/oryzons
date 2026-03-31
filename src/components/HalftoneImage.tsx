import { useEffect, useRef } from 'react'

interface HalftoneImageProps {
  src: string
  grid?: number
  className?: string
  reveal?: 'edges' | 'leftToRight'
}

export default function HalftoneImage({ src, grid = 6, className = '', reveal = 'edges' }: HalftoneImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    interface Dot { cx: number; cy: number; r: number; alpha: number; threshold: number }
    let dots: Dot[] = []
    let ready = false

    const img = new Image()
    img.src = src
    img.onload = () => {
      const off = document.createElement('canvas')
      off.width  = W
      off.height = H
      const oc = off.getContext('2d')!
      oc.fillStyle = '#fff'
      oc.fillRect(0, 0, W, H)
      oc.drawImage(img, 0, 0, W, H)

      const data = oc.getImageData(0, 0, W, H).data
      const MAX_R = grid * 0.62
      ctx.fillStyle = '#0A0A0A'

      for (let gx = 0; gx * grid < W; gx++) {
        for (let gy = 0; gy * grid < H; gy++) {
          const cx = gx * grid + grid / 2
          const cy = gy * grid + grid / 2
          const px = Math.min(Math.floor(cx), W - 1)
          const py = Math.min(Math.floor(cy), H - 1)
          const i  = (py * W + px) * 4
          const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
          const r   = MAX_R * (1 - lum)
          if (r < 0.3) continue

          const base =
            reveal === 'leftToRight'
              ? (cx / W)
              : (Math.min(cx, W - cx) / (W * 0.5)) // edges → center
          const threshold = Math.max(0, Math.min(1, base + (Math.random() - 0.5) * 0.2))
          dots.push({ cx, cy, r, alpha: 0.78 + (1 - lum) * 0.22, threshold })
        }
      }

      dots.sort((a, b) => a.threshold - b.threshold)
      ready = true

      // If already visible when image loads, start immediately
      if (isVisible) startAnimation()
    }

    let isVisible = false

    const startAnimation = () => {
      const DURATION = 1800
      let startTime: number | null = null
      let ptr = 0
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.5)

      const frame = (ts: number) => {
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

        if (t < 1) requestAnimationFrame(frame)
        else ctx.globalAlpha = 1
      }

      requestAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible = true
          observer.disconnect()
          if (ready) startAnimation()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(canvas)

    return () => observer.disconnect()
  }, [src, grid, reveal])

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      aria-hidden
    />
  )
}
