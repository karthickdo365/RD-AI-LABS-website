import { motion, useReducedMotion } from 'framer-motion'

// Soft dot pattern (replaces the dark-theme grid)
const DOTS = {
  backgroundImage: 'radial-gradient(rgba(255,255,255,.55) 1.2px, transparent 1.4px)',
  backgroundSize: '18px 18px',
}

/**
 * Gradient image placeholder used for portfolio and blog cards.
 * Pass `image` (a URL) to show a real picture instead, with the same sizing and hover behavior.
 */
export default function Visual({ icon: Icon, from, to, image, alt = '', className = '' }) {
  const reduce = useReducedMotion()

  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div className="absolute inset-0 opacity-60" style={DOTS} aria-hidden="true" />

      {/* Two soft blobs that drift slowly */}
      <motion.div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/40 blur-3xl"
        animate={reduce ? undefined : { x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-indigo-900/25 blur-3xl"
        animate={reduce ? undefined : { x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Icon in a frosted tile that floats */}
      <div className="relative flex h-full items-center justify-center">
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/60 bg-white/25 shadow-[0_12px_30px_-10px_rgba(0,0,0,.35)] backdrop-blur-md"
        >
          <Icon className="h-12 w-12 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.25)]" />
        </motion.div>
      </div>
    </div>
  )
}