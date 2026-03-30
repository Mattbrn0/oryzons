import { useEffect, useRef } from 'react'

interface Dot {
  cx: number
  cy: number
  r: number
  alpha: number
  threshold: number  // 0-1 : quand ce point doit apparaître
}

export default function DotScatter() {
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

    const img = new Image()
    img.src = '/hands.png'

    let rafId: number

    img.onload = () => {
      const imgAspect = img.width / img.height
      const drawW = W
      const drawH = drawW / imgAspect
      const GAP_X = 0.50
      const GAP_Y = 0.52
      const drawX = W * 0.5 - GAP_X * drawW
      const drawY = H * 0.5 - GAP_Y * drawH

      // ── Sample image ──────────────────────────────────────────────────
      const off = document.createElement('canvas')
      off.width  = W
      off.height = H
      const oc = off.getContext('2d')!
      oc.fillStyle = '#fff'
      oc.fillRect(0, 0, W, H)
      oc.drawImage(img, drawX, drawY, drawW, drawH)
      const data = oc.getImageData(0, 0, W, H).data

      // ── Build dot list ────────────────────────────────────────────────
      const GRID  = 7
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
          const r   = MAX_R * (1 - lum)
          if (r < 0.35) continue

          // Distance du bord le plus proche → 0 au bord, 1 au centre
          const edgeDist = Math.min(cx, W - cx) / (W * 0.5)
          // Légère noise verticale pour un aspect organique
          const noise = (Math.random() - 0.5) * 0.18
          const threshold = Math.max(0, Math.min(1, edgeDist + noise))

          dots.push({
            cx, cy, r,
            alpha: 0.80 + (1 - lum) * 0.20,
            threshold,
          })
        }
      }

      // Trier par threshold pour un dessin incrémental O(1) par frame
      dots.sort((a, b) => a.threshold - b.threshold)

      // ── Animation ─────────────────────────────────────────────────────
      const DURATION = 2200  // ms
      let startTime: number | null = null
      let ptr = 0
      ctx.fillStyle = '#0A0A0A'

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.8)

      const frame = (ts: number) => {
        if (!startTime) startTime = ts
        const t      = Math.min((ts - startTime) / DURATION, 1)
        const tEased = easeOut(t)

        // Dessine uniquement les points nouvellement visibles
        while (ptr < dots.length && dots[ptr].threshold <= tEased) {
          const d = dots[ptr]
          ctx.globalAlpha = d.alpha
          ctx.beginPath()
          ctx.arc(d.cx, d.cy, d.r, 0, Math.PI * 2)
          ctx.fill()
          ptr++
        }

        if (t < 1) {
          rafId = requestAnimationFrame(frame)
        } else {
          ctx.globalAlpha = 1
        }
      }

      rafId = requestAnimationFrame(frame)
    }

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
