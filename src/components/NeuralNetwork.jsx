import { useEffect, useRef } from 'react'

/**
 * NeuralNetwork — cinematic canvas neural-network for the hero.
 *
 * Features:
 * ─ 65-80 nodes in 3 depth layers (far / mid / near)
 * ─ Edge wrapping (nodes reappear on opposite side)
 * ─ Distance-based connections with gradient strokes
 * ─ Pulsating per-node glow (radial gradient, phase-offset)
 * ─ Mouse attraction with velocity damping / return to path
 * ─ Adaptive node density for mobile / tablet / desktop
 * ─ requestAnimationFrame loop, zero DOM nodes
 */

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  cyan:   '#00E5FF',
  blue:   '#2563EB',
  violet: '#8B5CF6',
}

// ── Depth layer presets ───────────────────────────────────────────────────────
//   layer 0 = far (small, slow, blurred, dim)
//   layer 1 = mid
//   layer 2 = near (large, fast, sharp, bright)
const LAYERS = [
  { share: 0.35, rMin: 0.8,  rMax: 1.6,  speedMul: 0.50, blur: 2,   alpha: 0.40, glowR: 8  },
  { share: 0.40, rMin: 1.4,  rMax: 2.4,  speedMul: 0.85, blur: 0,   alpha: 0.65, glowR: 14 },
  { share: 0.25, rMin: 2.2,  rMax: 3.6,  speedMul: 1.30, blur: 0,   alpha: 0.90, glowR: 22 },
]

const COLOURS = [C.cyan, C.cyan, C.cyan, C.blue, C.violet] // biased cyan

// Max connection distance per layer pair (near nodes connect further)
function maxDist(la, lb) {
  const avg = (la + lb) / 2
  return 110 + avg * 30  // 0→110 / 1→140 / 2→170
}

// Adaptive total node count
function nodeCount(w) {
  if (w < 640)  return 45
  if (w < 1024) return 60
  return 78
}

const BASE_SPEED  = 0.28
const MOUSE_R     = 160   // attraction radius px
const MOUSE_PULL  = 0.018 // attraction strength
const DAMP        = 0.92  // velocity damping when mouse leaves

export default function NeuralNetwork({ opacity = 1 }) {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: null, y: null, active: false })
  const state     = useRef({ nodes: [], frame: 0, rafId: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ── resize ──────────────────────────────────────────────
    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width  = w
      canvas.height = h
      initNodes(w, h)   // re-init on resize so density stays correct
    }

    // ── node factory ────────────────────────────────────────
    const initNodes = (w, h) => {
      const count = nodeCount(w)
      state.current.nodes = []

      let cursor = 0
      LAYERS.forEach((layer, li) => {
        const n = Math.round(count * layer.share)
        for (let i = 0; i < n; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = BASE_SPEED * layer.speedMul * (0.7 + Math.random() * 0.6)
          state.current.nodes.push({
            x:     Math.random() * w,
            y:     Math.random() * h,
            vx:    Math.cos(angle) * speed,
            vy:    Math.sin(angle) * speed,
            // "natural" velocity — mouse attraction won't corrupt these
            nvx:   Math.cos(angle) * speed,
            nvy:   Math.sin(angle) * speed,
            r:     layer.rMin + Math.random() * (layer.rMax - layer.rMin),
            layer: li,
            blur:  layer.blur,
            alpha: layer.alpha,
            glowR: layer.glowR,
            color: COLOURS[Math.floor(Math.random() * COLOURS.length)],
            pulse: Math.random() * Math.PI * 2,
            pulseSp: 0.012 + Math.random() * 0.012,
          })
        }
        cursor += n
      })
    }

    // ── mouse ───────────────────────────────────────────────
    const onMove = e => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
    }
    const onLeave = () => { mouse.current.active = false }

    // ── draw loop ────────────────────────────────────────────
    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      const ns  = state.current.nodes
      const mx  = mouse.current.x
      const my  = mouse.current.y
      const mOn = mouse.current.active

      // ── update positions ─────────────────────────────────
      ns.forEach(n => {
        n.pulse += n.pulseSp

        // Mouse attraction
        if (mOn && mx !== null) {
          const dx   = mx - n.x
          const dy   = my - n.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_R) {
            const force = (1 - dist / MOUSE_R) * MOUSE_PULL
            n.vx += dx * force
            n.vy += dy * force
          }
        }

        // Gradually restore natural velocity (damping toward nvx/nvy)
        n.vx += (n.nvx - n.vx) * 0.012
        n.vy += (n.nvy - n.vy) * 0.012

        // Speed cap to avoid runaway
        const speed = Math.hypot(n.vx, n.vy)
        const maxSp = BASE_SPEED * LAYERS[n.layer].speedMul * 2.2
        if (speed > maxSp) {
          n.vx = (n.vx / speed) * maxSp
          n.vy = (n.vy / speed) * maxSp
        }

        n.x += n.vx
        n.y += n.vy

        // Edge WRAPPING (cinematic — nodes reappear on opposite side)
        if (n.x < -10)     n.x = W + 10
        if (n.x > W + 10)  n.x = -10
        if (n.y < -10)     n.y = H + 10
        if (n.y > H + 10)  n.y = -10
      })

      // ── draw connections (back-to-front by layer) ─────────
      // Batch by blur to minimise ctx.filter switches
      for (let la = 0; la < LAYERS.length; la++) {
        for (let lb = la; lb < LAYERS.length; lb++) {
          const blurVal = Math.min(LAYERS[la].blur, LAYERS[lb].blur)
          if (blurVal > 0) ctx.filter = `blur(${blurVal}px)`
          else             ctx.filter = 'none'

          const distLimit = maxDist(la, lb)

          for (let i = 0; i < ns.length; i++) {
            if (ns[i].layer !== la) continue
            for (let j = i + 1; j < ns.length; j++) {
              if (ns[j].layer !== lb) continue

              const dx   = ns[i].x - ns[j].x
              const dy   = ns[i].y - ns[j].y
              const dist = Math.hypot(dx, dy)
              if (dist >= distLimit) continue

              const tAlpha = (1 - dist / distLimit)
              const lAlpha = tAlpha * 0.28 * Math.min(LAYERS[la].alpha, LAYERS[lb].alpha) * 1.6

              // Gradient stroke — node-colour → node-colour
              const grad = ctx.createLinearGradient(ns[i].x, ns[i].y, ns[j].x, ns[j].y)
              grad.addColorStop(0, hexAlpha(ns[i].color, lAlpha))
              grad.addColorStop(1, hexAlpha(ns[j].color, lAlpha))

              ctx.beginPath()
              ctx.moveTo(ns[i].x, ns[i].y)
              ctx.lineTo(ns[j].x, ns[j].y)
              ctx.strokeStyle = grad
              ctx.lineWidth   = 0.5 + tAlpha * 0.8
              ctx.stroke()
            }
          }
        }
      }

      ctx.filter = 'none'

      // ── draw nodes (back-to-front for correct layering) ───
      ;[0, 1, 2].forEach(li => {
        ns.forEach(n => {
          if (n.layer !== li) return

          const glow = Math.sin(n.pulse) * 0.5 + 0.5   // 0 → 1
          const gr   = n.glowR * (0.7 + glow * 0.5)

          if (LAYERS[li].blur > 0) ctx.filter = `blur(${LAYERS[li].blur}px)`

          // Soft outer glow halo
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr)
          halo.addColorStop(0,   hexAlpha(n.color, 0.22 * n.alpha * (0.5 + glow * 0.5)))
          halo.addColorStop(0.5, hexAlpha(n.color, 0.08 * n.alpha))
          halo.addColorStop(1,   'rgba(0,0,0,0)')
          ctx.beginPath()
          ctx.arc(n.x, n.y, gr, 0, Math.PI * 2)
          ctx.fillStyle = halo
          ctx.fill()

          // Bright core
          const coreA = n.alpha * (0.7 + glow * 0.3)
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
          ctx.fillStyle = hexAlpha(n.color, coreA)
          ctx.fill()

          // Specular highlight (tiny white dot)
          if (li === 2) {
            ctx.beginPath()
            ctx.arc(n.x - n.r * 0.3, n.y - n.r * 0.3, n.r * 0.3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,255,255,${0.5 * glow})`
            ctx.fill()
          }

          ctx.filter = 'none'
        })
      })

      state.current.rafId = requestAnimationFrame(draw)
    }

    // ── boot ────────────────────────────────────────────────
    resize()
    draw()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(state.current.rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  )
}

// ── util: hex colour + opacity → rgba string ────────────────────────────────
function hexAlpha(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a.toFixed(3)})`
}
