import { useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/** 3D hover-tilt card with a warm cursor-following glow and a soft white shine. */
export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(false)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 220, damping: 22 })

  // Warm colored glow under the cursor
  const glow = useTransform(
    [x, y],
    ([lx, ly]) =>
      `radial-gradient(380px circle at ${lx * 100}% ${ly * 100}%, rgba(251,146,60,.30), rgba(244,63,94,.12) 40%, transparent 65%)`
  )

  // Small white highlight, like light catching the surface
  const shine = useTransform(
    [x, y],
    ([lx, ly]) =>
      `radial-gradient(160px circle at ${lx * 100}% ${ly * 100}%, rgba(255,255,255,.55), transparent 70%)`
  )

  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }

  const onLeave = () => {
    x.set(0.5)
    y.set(0.5)
    setHover(false)
  }

  // Reduced motion: plain card, no tilt or glow
  if (reduce) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative h-full">{children}</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      animate={{ scale: hover ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: glow }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
        style={{ background: shine }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  )
}