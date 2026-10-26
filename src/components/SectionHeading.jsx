import { motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'

/**
 * Light-theme section heading. Same props as before.
 * `center` now defaults to false so it matches the left-aligned headings in the redesigned sections.
 */
export default function SectionHeading({ eyebrow, title, highlight, sub, center = false }) {
  const reduce = useReducedMotion()

  return (
    <Reveal className={`mb-12 lg:mb-16 ${center ? 'mx-auto max-w-3xl text-center' : ''}`}>
      {eyebrow && (
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-sm font-semibold text-slate-900 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-orange-600 via-rose-600 to-indigo-700 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {/* Gradient line that draws in under the heading */}
      <motion.span
        aria-hidden="true"
        className={`mt-5 block h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 ${
          center ? 'mx-auto' : ''
        }`}
        style={{ originX: center ? 0.5 : 0 }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {sub && (
        <p className={`mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg ${center ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </Reveal>
  )
}