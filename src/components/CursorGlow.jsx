import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useSpring } from 'framer-motion'

const IDLE_DELAY = 2000 // ms without movement before the bubbles tuck away
const MOVE_THRESHOLD = 3 // px; ignores fake mouse moves from scrolling pages

/*
  Brand bubble cursor.
  - Moving: three glass bubbles ("RD", "AI", "Labs") follow the pointer.
  - Still for 2 seconds: the bubbles fold back into the pointer and fade out.
  Palette: soft sky blue, cyan and lavender.
*/
const BUBBLES = [
  { label: 'RD', size: 34, dx: 16, dy: 18, stiffness: 300, damping: 24, bob: 3.2, delay: 0 },
  { label: 'AI', size: 30, dx: 54, dy: 28, stiffness: 190, damping: 22, bob: 3.8, delay: 0.5 },
  { label: 'Labs', size: 40, dx: 90, dy: 16, stiffness: 120, damping: 20, bob: 4.4, delay: 1 },
]

const GLASS = {
  background:
    'radial-gradient(circle at 28% 22%, rgba(255,255,255,0.98) 0%, rgba(213,247,255,0.94) 24%, rgba(153,221,250,0.84) 52%, rgba(130,177,239,0.70) 76%, rgba(202,198,255,0.76) 100%)',
  border: '1px solid rgba(225,250,255,0.95)',
  boxShadow:
    'inset 0 -6px 12px rgba(77,158,225,0.18), inset 0 2px 5px rgba(255,255,255,0.95), 0 10px 22px -10px rgba(64,143,207,0.45)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
}

function getFactor() {
  const w = window.innerWidth
  if (w >= 1280) return 1
  if (w >= 1024) return 0.9
  if (w >= 768) return 0.8
  return 0.7
}

function Bubble({ x, y, scale, moving, k, label, size, dx, dy, stiffness, damping, bob, delay }) {
  const sx = useSpring(x, { stiffness, damping, mass: 0.6 })
  const sy = useSpring(y, { stiffness, damping, mass: 0.6 })
  const px = size * k

  return (
    <motion.span
      className="absolute left-0 top-0 will-change-transform"
      style={{ x: sx, y: sy, scale }}
    >
      {/* Opens out from the pointer while moving, folds back when still */}
      <motion.span
        className="absolute left-0 top-0"
        initial={false}
        animate={{
          x: moving ? dx * k : 0,
          y: moving ? dy * k : 0,
          opacity: moving ? 1 : 0,
          scale: moving ? 1 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 26,
          opacity: { duration: 0.25, ease: 'easeOut' },
        }}
      >
        <motion.span
          className="relative flex select-none items-center justify-center rounded-full font-display font-semibold tracking-[-0.01em] text-[#183B64]"
          style={{
            ...GLASS,
            width: px,
            height: px,
            fontSize: Math.max(9, (label.length > 2 ? 11 : 12) * k),
            textShadow: '0 1px 0 rgba(255,255,255,0.6)',
          }}
          animate={moving ? { y: [0, -3, 0] } : { y: 0 }}
          transition={
            moving
              ? { duration: bob, delay, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        >
          {/* Specular highlight */}
          <span
            aria-hidden="true"
            className="absolute rounded-full bg-white/70 blur-[1px]"
            style={{
              left: '16%',
              top: '12%',
              width: '34%',
              height: '20%',
              transform: 'rotate(-28deg)',
            }}
          />
          <span className="relative">{label}</span>
        </motion.span>
      </motion.span>
    </motion.span>
  )
}

/**
 * Only on devices with a real pointer, and off when reduced motion is
 * requested. The system cursor stays visible.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const [moving, setMoving] = useState(false)
  const [k, setK] = useState(1)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const scale = useMotionValue(1)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return undefined

    setEnabled(true)
    setK(getFactor())

    const interactive =
      'a, button, input, textarea, select, summary, label, [role="button"]'

    let timer
    let target = 1
    let lastX = null
    let lastY = null

    const to = (value) => {
      if (value === target) return
      target = value
      animate(scale, value, { type: 'spring', stiffness: 300, damping: 22 })
    }

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      to(e.target.closest?.(interactive) ? 1.12 : 1)

      const moved =
        lastX === null ||
        Math.hypot(e.clientX - lastX, e.clientY - lastY) >= MOVE_THRESHOLD
      if (!moved) return

      lastX = e.clientX
      lastY = e.clientY

      setMoving(true)
      clearTimeout(timer)
      timer = setTimeout(() => setMoving(false), IDLE_DELAY)
    }

    const down = () => to(0.9)
    const up = () => to(1)
    const leave = () => {
      clearTimeout(timer)
      setMoving(false)
    }
    const resize = () => setK(getFactor())

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('resize', resize)
    document.addEventListener('mouseleave', leave)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y, scale])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[61]">
      {BUBBLES.map((bubble) => (
        <Bubble key={bubble.label} x={x} y={y} scale={scale} moving={moving} k={k} {...bubble} />
      ))}
    </div>
  )
}