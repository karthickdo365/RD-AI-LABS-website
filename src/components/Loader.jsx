import { motion, useReducedMotion } from 'framer-motion'

const BG = {
  background:
    'radial-gradient(60% 70% at 0% 100%, #ffb347 0%, rgba(255,179,71,0) 70%),' +
    'radial-gradient(55% 60% at 45% 90%, #f4846a 0%, rgba(244,132,106,0) 70%),' +
    'radial-gradient(60% 70% at 100% 0%, #6f9cf0 0%, rgba(111,156,240,0) 70%),' +
    'radial-gradient(50% 60% at 85% 80%, #c9c3ec 0%, rgba(201,195,236,0) 70%),' +
    '#fbf1ea',
}

/** Full-screen page-load animation. Fades out when App removes it. */
export default function Loader() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={BG}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      role="status"
      aria-label="Loading RD AI Labs"
    >
      <div className="relative">
        {/* Soft pulse behind the logo */}
        <motion.span
          aria-hidden="true"
          className="absolute -inset-10 rounded-full bg-gradient-to-br from-orange-300 via-rose-300 to-indigo-300 blur-3xl"
          animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.1, 0.95] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orbiting rings with a dot each */}
        <div
          className="spin-slow absolute -inset-5 rounded-[2rem] border border-slate-900/25 motion-reduce:animate-none"
          aria-hidden="true"
        >
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_14px_3px_rgba(249,115,22,.6)]" />
        </div>
        <div
          className="spin-rev absolute -inset-9 rounded-[2.5rem] border border-indigo-900/20 motion-reduce:animate-none"
          aria-hidden="true"
        >
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_14px_3px_rgba(99,102,241,.55)]" />
        </div>

        <motion.img
          src="/logo.png"
          alt="RD AI Labs"
          className="relative h-40 w-40 rounded-3xl bg-white object-contain p-2 shadow-[0_20px_50px_-15px_rgba(120,70,60,.5)] sm:h-48 sm:w-48"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Progress bar */}
      <div className="relative mt-14 h-1.5 w-56 overflow-hidden rounded-full bg-slate-900/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      </div>

      <motion.p
        className="mt-4 text-sm font-medium text-slate-800"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
       TAP THE UNTAPPED
      </motion.p>
    </motion.div>
  )
}