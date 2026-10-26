import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE = 'a, button, input, textarea, select, summary, label, [role="button"]'

/**
 * Cursor effect for the light theme:
 *  - warm glow that drifts behind the pointer
 *  - small dark dot (exact position)
 *  - ring that trails the dot, grows and fills with color over links/buttons
 *  - click ripple
 * Only on devices with a real pointer, and off when reduced motion is requested.
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [ripples, setRipples] = useState([])

  const x = useMotionValue(-300)
  const y = useMotionValue(-300)

  const glowX = useSpring(x, { stiffness: 70, damping: 20, mass: 0.8 })
  const glowY = useSpring(y, { stiffness: 70, damping: 20, mass: 0.8 })
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 })
  const dotX = useSpring(x, { stiffness: 900, damping: 40 })
  const dotY = useSpring(y, { stiffness: 900, damping: 40 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return undefined
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHovering(Boolean(e.target.closest?.(INTERACTIVE)))
    }

    const down = (e) => {
      setPressed(true)
      const id = `${Date.now()}-${Math.random()}`
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setRipples((r) => r.filter((i) => i.id !== id)), 700)
    }

    const up = () => setPressed(false)

    // Park the cursor effects off-screen when the mouse leaves the window
    const leave = () => {
      x.set(-300)
      y.set(-300)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Warm glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[460px] w-[460px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          marginLeft: -230,
          marginTop: -230,
          background:
            'radial-gradient(circle, rgba(251,146,60,.26), rgba(244,63,94,.10) 40%, rgba(99,102,241,.06) 58%, transparent 70%)',
        }}
      />

      {/* Trailing ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[61] h-11 w-11 rounded-full border-[1.5px] border-slate-900"
        style={{ x: ringX, y: ringY, marginLeft: -22, marginTop: -22 }}
        animate={{
          scale: pressed ? 0.8 : hovering ? 1.9 : 1,
          backgroundColor: hovering ? 'rgba(251,146,60,.28)' : 'rgba(251,146,60,0)',
          borderColor: hovering ? 'rgba(99,102,241,.9)' : 'rgba(15,23,42,.85)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />

      {/* Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[62] h-2 w-2 rounded-full bg-slate-950"
        style={{ x: dotX, y: dotY, marginLeft: -4, marginTop: -4 }}
        animate={{ scale: hovering ? 0.4 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      />

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            aria-hidden="true"
            className="pointer-events-none fixed z-[61] h-16 w-16 rounded-full border-2 border-rose-500"
            style={{ left: r.x, top: r.y, marginLeft: -32, marginTop: -32 }}
            initial={{ scale: 0.2, opacity: 0.7 }}
            animate={{ scale: 2.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}