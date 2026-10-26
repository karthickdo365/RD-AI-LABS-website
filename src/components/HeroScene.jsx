import { useEffect, useMemo, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { FiCode, FiCloud, FiCpu, FiTrendingUp } from 'react-icons/fi'

/* ---------- brain (hand-designed, clean) ---------- */

const BRAIN =
  'M 62 205 C 36 170 44 118 92 94 C 118 38 196 18 246 38 C 292 12 368 28 398 76 ' +
  'C 450 92 464 160 432 204 C 440 236 412 258 376 256 C 352 262 330 258 316 248 ' +
  'C 296 266 250 270 214 262 C 186 270 140 262 120 244 C 92 244 70 228 62 205 Z'

// Gyri: soft folds on the surface
const FOLDS = [
  'M 236 36 C 218 84 256 118 230 172',
  'M 112 224 C 150 206 190 232 240 214 C 290 198 310 222 340 196',
  'M 78 150 C 110 118 130 168 166 130 C 190 106 176 90 214 84',
  'M 100 100 C 128 130 156 96 190 104',
  'M 258 66 C 290 104 322 62 358 88 C 380 104 372 120 398 118',
  'M 300 132 C 330 112 352 152 392 132 C 414 122 420 146 436 140',
  'M 322 196 C 350 172 386 200 424 178',
  'M 66 192 C 92 176 120 200 150 182',
  'M 146 62 C 168 80 196 56 210 74',
  'M 262 206 C 292 222 336 210 372 236',
  'M 150 238 C 176 222 206 244 232 236',
]

// Circuit traces leaving the chip, each ending in a node
const TRACES = [
  'M 288 118 H 330 L 350 98 H 392',
  'M 288 135 H 346 V 160 H 412',
  'M 288 150 L 314 176 H 372',
  'M 192 118 H 150 L 130 98 H 92',
  'M 192 135 H 134 V 160 H 70',
  'M 192 150 L 166 176 H 110',
  'M 240 92 V 66 H 266 L 282 50',
  'M 240 190 V 214 H 214 L 196 232',
]
const NODES = [
  [392, 98], [412, 160], [372, 176], [92, 98], [70, 160], [110, 176], [282, 50], [196, 232],
]

function Brain({ animated }) {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <clipPath id="hs-clip">
          <path d={BRAIN} />
        </clipPath>
        <linearGradient id="hs-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".85" />
          <stop offset=".5" stopColor="#c7d2fe" stopOpacity=".6" />
          <stop offset="1" stopColor="#ddd6fe" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="hs-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="hs-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern id="hs-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.1" fill="#6366f1" fillOpacity=".35" />
        </pattern>
        <filter id="hs-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* brain stem + cerebellum (fill closed, outline open so no seam shows) */}
      <path d="M 222 262 C 224 298 232 330 238 350 C 246 354 256 354 264 350 C 270 328 276 296 278 262 Z" fill="url(#hs-fill)" />
      <path d="M 222 262 C 224 298 232 330 238 350 C 246 354 256 354 264 350 C 270 328 276 296 278 262" fill="none" stroke="url(#hs-stroke)" strokeWidth="2" />
      <path d="M 322 256 C 330 296 400 304 426 258 Z" fill="url(#hs-fill)" />
      <path d="M 326 262 C 336 294 398 300 424 262" fill="none" stroke="url(#hs-stroke)" strokeWidth="2" />

      {/* cerebrum */}
      <path d={BRAIN} fill="url(#hs-fill)" />
      <path d={BRAIN} fill="url(#hs-dots)" />

      <g clipPath="url(#hs-clip)">
        <g fill="none" stroke="#6d8fe8" strokeWidth="2" strokeLinecap="round" opacity=".75">
          {FOLDS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* light band that sweeps across the brain */}
        {animated && (
          <rect x="-90" y="0" width="90" height="360" fill="url(#hs-scan)" opacity=".7">
            <animate attributeName="x" values="-90;480" dur="4.5s" repeatCount="indefinite" />
          </rect>
        )}
      </g>

      <path d={BRAIN} fill="none" stroke="url(#hs-stroke)" strokeWidth="2.6" />

      {/* circuit traces */}
      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        {TRACES.map((d) => (
          <path key={d} d={d} stroke="#8b5cf6" strokeWidth="2" opacity=".85" />
        ))}
        {/* data pulses running along the traces */}
        {animated &&
          TRACES.map((d, i) => (
            <path key={`p${d}`} d={d} stroke="#22d3ee" strokeWidth="2.4" strokeDasharray="6 34" filter="url(#hs-glow)">
              <animate attributeName="stroke-dashoffset" from="40" to="0" dur={`${1.4 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
            </path>
          ))}
      </g>

      <g fill="#22b8d4" filter="url(#hs-glow)">
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4">
            {animated && (
              <animate attributeName="r" values="3.5;6;3.5" dur={`${2 + (i % 4) * 0.4}s`} repeatCount="indefinite" />
            )}
          </circle>
        ))}
      </g>

      {/* AI chip */}
      <g transform="translate(207 102)" filter="url(#hs-glow)">
        <rect width="66" height="66" rx="12" fill="#eef2ff" stroke="#8b5cf6" strokeWidth="2.5" />
        <text x="33" y="45" textAnchor="middle" fontSize="28" fontWeight="800" fill="#4338ca" style={{ fontFamily: 'inherit' }}>
          AI
        </text>
      </g>
    </svg>
  )
}

/* ---------- floating info cards ---------- */

function FloatCard({ icon: Icon, label, className, z, ry, delay, dur, animated }) {
  return (
    <motion.div className={`absolute ${className}`} style={{ z, rotateY: ry }}>
      <motion.div
        animate={animated ? { y: [0, -9, 0] } : undefined}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
        className="rounded-xl border border-white/80 bg-white/55 px-3 py-3 text-center shadow-[0_14px_34px_-12px_rgba(99,102,241,.55)]"
      >
        <Icon className="mx-auto mb-1.5 text-indigo-600" size={26} />
        <p className="text-[11px] font-semibold leading-tight text-slate-900 xl:text-xs">{label}</p>
      </motion.div>
    </motion.div>
  )
}

/* ---------- scene ---------- */

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 11) % 96}%`,
  top: `${(i * 53 + 17) % 90}%`,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.4,
}))

export default function HeroScene({ active = true }) {
  const reduce = useReducedMotion()
  const animated = active && !reduce
  const ref = useRef(null)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 90, damping: 16 })
  const rotateY = useSpring(ry, { stiffness: 90, damping: 16 })

  // The whole scene turns toward the cursor
  useEffect(() => {
    if (!active || reduce) return undefined

    const move = (e) => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)))
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)))
      ry.set(nx * 24)
      rx.set(-ny * 15)
    }
    const leave = () => {
      rx.set(0)
      ry.set(0)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [active, reduce, rx, ry])

  return (
    <div ref={ref} className="relative aspect-[4/3] w-full max-w-[720px]">
      {/* Soft decoration straight on the page gradient (no dark box) */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-x-0 bottom-0 h-1/2 w-full" viewBox="0 0 720 270" preserveAspectRatio="none">
          <path d="M0 200 C150 130 300 250 460 205 C580 170 650 110 720 60" fill="none" stroke="#6366f1" strokeOpacity=".35" strokeWidth="2" />
          <path d="M0 225 C160 160 310 270 470 228 C590 195 660 140 720 95" fill="none" stroke="#22b8d4" strokeOpacity=".35" strokeWidth="1.5" />
        </svg>
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-indigo-400"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={animated ? { y: [0, -26, 0], opacity: [0.2, 0.8, 0.2] } : { opacity: 0.4 }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* 3D layer */}
      <div className="absolute inset-0" style={{ perspective: 1100 }}>
        <motion.div
          className="absolute inset-0"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          {/* Platform */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '80%',
              width: '54%',
              aspectRatio: '1 / 1',
              transform: 'translate(-50%, -50%) rotateX(74deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* expanding ripple rings */}
            <div className="absolute -inset-[28%] rounded-full border border-violet-400/30" />
            <div className="absolute -inset-[12%] rounded-full border border-cyan-500/35" />
            {/* stacked discs give the base some thickness */}
            {[-16, -12, -8, -4].map((zz) => (
              <div
                key={zz}
                className="absolute inset-0 rounded-full border border-indigo-400/50"
                style={{
                  transform: `translateZ(${zz}px)`,
                  background: 'radial-gradient(circle, #c7d2fe, #a5b4fc)',
                }}
              />
            ))}
            <div
              className="absolute inset-0 rounded-full border-2 border-violet-400/80"
              style={{ background: 'radial-gradient(circle, #eef2ff, #c7d2fe)' }}
            />
            <div className="absolute inset-[9%] rounded-full border-2 border-cyan-500/90 shadow-[0_0_26px_3px_rgba(34,211,238,.5)]" />
            <div className="absolute inset-[19%] rounded-full border border-violet-400/70" />
            <div
              className="absolute inset-[32%] rounded-full"
              style={{ background: 'radial-gradient(circle, #ffffff 0%, #67e8f9 38%, rgba(129,140,248,.45) 72%)' }}
            />
          </div>

          {/* Light beams rising from the platform */}
          <motion.div
            aria-hidden="true"
            className="absolute"
            style={{
              left: '41%',
              top: '58%',
              width: '18%',
              height: '20%',
              z: 20,
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(99,102,241,.55) 0 1px, transparent 1px 7px)',
              maskImage: 'linear-gradient(to top, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
            }}
            animate={animated ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.8 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Orbit rings around the brain */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '56%',
              width: '78%',
              aspectRatio: '1 / 1',
              transform: 'translate(-50%, -50%) rotateX(76deg) translateZ(30px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="spin-slow absolute inset-0 rounded-full border border-cyan-500/60 motion-reduce:animate-none">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_14px_4px_rgba(34,211,238,.7)]" />
            </div>
            <div className="spin-rev absolute inset-[9%] rounded-full border border-violet-400/55 motion-reduce:animate-none">
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_14px_4px_rgba(167,139,250,.7)]" />
            </div>
          </div>

          {/* Brain */}
          <motion.div
            className="absolute"
            style={{
              left: '23%',
              top: '5%',
              width: '54%',
              z: 55,
              aspectRatio: '480 / 360',
              filter: 'drop-shadow(0 8px 24px rgba(99,102,241,.35))',
            }}
            animate={animated ? { y: [0, -10, 0] } : undefined}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Brain animated={animated} />
          </motion.div>

          {/* Floating cards at different depths */}
          <FloatCard icon={FiCode} label="Custom Software" className="left-[1%] top-[14%] w-[21%]" z={90} ry={14} delay={0} dur={4.5} animated={animated} />
          <FloatCard icon={FiCloud} label="Web Applications" className="left-[0%] top-[48%] w-[21%]" z={70} ry={16} delay={0.8} dur={5.2} animated={animated} />
          <FloatCard icon={FiCpu} label="AI-Powered Solutions" className="right-[1%] top-[4%] w-[23%]" z={120} ry={-14} delay={0.4} dur={4.8} animated={animated} />
          <FloatCard icon={FiTrendingUp} label="Business Growth" className="right-[0%] top-[44%] w-[21%]" z={95} ry={-16} delay={1.2} dur={5.5} animated={animated} />
        </motion.div>
      </div>
    </div>
  )
}