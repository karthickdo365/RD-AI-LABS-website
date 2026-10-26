import { motion, useReducedMotion } from 'framer-motion'

/**
 * Animates its children in the first time they scroll into view.
 *
 * Works exactly like before (<Reveal delay={0.1}>), plus an optional `from`:
 *   'up' (default) | 'down' | 'left' | 'right' | 'scale'
 * `y` still controls the slide distance. Respects reduced-motion.
 */
export default function Reveal({ children, delay = 0, y = 28, from = 'up', className = '' }) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  const hidden = {
    up: { opacity: 0, y, filter: 'blur(6px)' },
    down: { opacity: 0, y: -y, filter: 'blur(6px)' },
    left: { opacity: 0, x: -y * 1.6, filter: 'blur(6px)' },
    right: { opacity: 0, x: y * 1.6, filter: 'blur(6px)' },
    scale: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  }[from]

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}