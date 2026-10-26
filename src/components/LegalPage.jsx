import { useEffect, useMemo, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { FiCode, FiCloud, FiCpu, FiTrendingUp } from 'react-icons/fi'

/* ---------- brain network (generated once, same every render) ---------- */

const BRAIN =
  'M60 190 C40 130 70 70 140 50 C190 30 260 30 305 60 C360 85 375 150 350 200 ' +
  'C335 235 300 250 270 245 C255 270 235 285 215 295 C205 300 195 290 195 275 ' +
  'C160 270 120 265 95 245 C70 232 62 210 60 190 Z'

function rng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildNetwork() {
  const r = rng(7)
  const pts = []
  while (pts.length < 72) {
    const x = 50 + r() * 320
    const y = 30 + r() * 270
    const dx = (x - 208) / 160
    const dy = (y - 160) / 135
    if (dx * dx + dy * dy < 1) pts.push({ x, y, r: 1.5 + r() * 1.9 })
  }
  const lines = []
  pts.forEach((a, i) => {
    for (let j = i + 1; j < pts.length; j++) {
      const b = pts[j]
      if (Math.hypot(a.x - b.x, a.y - b.y) < 58) lines.push([a, b])
    }
  })
  return { pts, lines }
}

function Brain({ animated }) {
  const { pts, lines } = useMemo(buildNetwork, [])

  return (
    <svg viewBox="0 0 410 320" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <clipPath id="hs-clip">
          <path d={BRAIN} />
        </clipPath>
        <linearGradient id="hs-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d4ed8" stopOpacity=".55" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity=".45" />
        </linearGradient>
        <filter id="hs-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d={BRAIN} fill="url(#hs-fill)" stroke="#38bdf8" strokeWidth="1.6" filter="url(#hs-glow)" />

      <g clipPath="url(#hs-clip)">
        <g stroke="#7dd3fc" strokeOpacity=".4" strokeWidth=".8">
          {lines.map(([a, b], i) => (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          ))}
        </g>
        <g fill="#e0f2fe" filter="url(#hs-glow)">
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r}>
              {animated && i % 4 === 0 && (
                <animate
                  attributeName="opacity"
                  values="1;0.2;1"
                  dur={`${2 + (i % 5) * 0.5}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </g>
      </g>

      {/* AI chip */}
      <g transform="translate(170 108)" filter="url(#hs-glow)">
        <g stroke="#67e8f9" strokeWidth="2" strokeLinecap="round">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <line x1={9 + i * 10.4} y1={-9} x2={9 + i * 10.4} y2={0} />
              <line x1={9 + i * 10.4} y1={66} x2={9 + i * 10.4} y2={75} />
              <line x1={-9} y1={9 + i * 10.4} x2={0} y2={9 + i * 10.4} />
              <line x1={66} y1={9 + i * 10.4} x2={75} y2={9 + i * 10.4} />
            </g>
          ))}
        </g>
        <rect width="66" height="66" rx="10" fill="#0b1d5c" stroke="#7dd3fc" strokeWidth="2" />
        <text
          x="33"
          y="45"
          textAnchor="middle"
          fontSize="28"
          fontWeight="800"
          fill="#fff"
          style={{ fontFamily: 'inherit' }}
        >
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
        className="rounded-xl border border-cyan-300/30 bg-gradient-to-br from-sky-400/20 to-indigo-500/15 px-3 py-3 text-center shadow-[0_0_30px_-8px_rgba(56,189,248,.7)]"
      >
        <Icon className="mx-auto mb-1.5 text-cyan-300" size={26} />
        <p className="text-[11px] font-medium leading-tight text-slate-100 xl:text-xs">{label}</p>
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
      {/* Dark stage so the neon glow stays visible on the light page */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(30,58,138,.65)] ring-1 ring-white/40"
        style={{ background: 'radial-gradient(60% 60% at 55% 55%, #0a2a8f 0%, #061450 45%, #030820 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(rgba(125,211,252,.5) 1px, transparent 1.2px)',
            backgroundSize: '22px 22px',
            maskImage: 'linear-gradient(to top, black, transparent 55%)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent 55%)',
          }}
        />
        <svg className="absolute inset-x-0 bottom-0 h-1/2 w-full" viewBox="0 0 720 270" preserveAspectRatio="none">
          <path d="M0 200 C150 130 300 250 460 205 C580 170 650 110 720 60" fill="none" stroke="#3b82f6" strokeOpacity=".6" strokeWidth="2" />
          <path d="M0 225 C160 160 310 270 470 228 C590 195 660 140 720 95" fill="none" stroke="#818cf8" strokeOpacity=".4" strokeWidth="1.5" />
        </svg>
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cyan-300"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={animated ? { y: [0, -26, 0], opacity: [0.2, 0.9, 0.2] } : { opacity: 0.4 }}
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
              top: '74%',
              width: '64%',
              aspectRatio: '1 / 1',
              transform: 'translate(-50%, -50%) rotateX(74deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* expanding ripple rings */}
            <div className="absolute -inset-[28%] rounded-full border border-blue-400/25" />
            <div className="absolute -inset-[12%] rounded-full border border-cyan-300/30" />
            {/* stacked discs give the base some thickness */}
            {[-16, -12, -8, -4].map((zz) => (
              <div
                key={zz}
                className="absolute inset-0 rounded-full border border-blue-500/40"
                style={{
                  transform: `translateZ(${zz}px)`,
                  background: 'radial-gradient(circle, #0b1d6b, #050c33)',
                }}
              />
            ))}
            <div
              className="absolute inset-0 rounded-full border-2 border-indigo-300/70"
              style={{ background: 'radial-gradient(circle, #0c2a9e, #07124a)' }}
            />
            <div className="absolute inset-[9%] rounded-full border-2 border-cyan-300/90 shadow-[0_0_30px_4px_rgba(34,211,238,.55)]" />
            <div className="absolute inset-[19%] rounded-full border border-indigo-300/70" />
            <div
              className="absolute inset-[32%] rounded-full"
              style={{ background: 'radial-gradient(circle, #e0f2fe 0%, #38bdf8 35%, rgba(37,99,235,.4) 70%)' }}
            />
          </div>

          {/* Light beams rising from the platform */}
          <motion.div
            aria-hidden="true"
            className="absolute"
            style={{
              left: '39%',
              top: '54%',
              width: '22%',
              height: '20%',
              z: 20,
              backgroundImage: 'repeating-linear-gradient(90deg, rgba(125,211,252,.75) 0 1px, transparent 1px 7px)',
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
              top: '50%',
              width: '84%',
              aspectRatio: '1 / 1',
              transform: 'translate(-50%, -50%) rotateX(76deg) translateZ(30px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="spin-slow absolute inset-0 rounded-full border border-cyan-300/50 motion-reduce:animate-none">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_14px_4px_rgba(34,211,238,.8)]" />
            </div>
            <div className="spin-rev absolute inset-[9%] rounded-full border border-indigo-300/40 motion-reduce:animate-none">
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 rounded-full bg-indigo-300 shadow-[0_0_14px_4px_rgba(165,180,252,.8)]" />
            </div>
          </div>

          {/* Brain */}
          <motion.div
            className="absolute"
            style={{
              left: '29%',
              top: '14%',
              width: '42%',
              z: 55,
              aspectRatio: '410 / 320',
              filter: 'drop-shadow(0 0 22px rgba(59,130,246,.85))',
            }}
            animate={animated ? { y: [0, -10, 0] } : undefined}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Brain animated={animated} />
          </motion.div>

          {/* Floating cards at different depths */}
          <FloatCard icon={FiCode} label="Custom Software" className="left-[8%] top-[20%] w-[22%]" z={90} ry={14} delay={0} dur={4.5} animated={animated} />
          <FloatCard icon={FiCloud} label="Web Applications" className="left-[2%] top-[50%] w-[22%]" z={70} ry={16} delay={0.8} dur={5.2} animated={animated} />
          <FloatCard icon={FiCpu} label="AI-Powered Solutions" className="right-[3%] top-[8%] w-[24%]" z={120} ry={-14} delay={0.4} dur={4.8} animated={animated} />
          <FloatCard icon={FiTrendingUp} label="Business Growth" className="right-[1%] top-[46%] w-[22%]" z={95} ry={-16} delay={1.2} dur={5.5} animated={animated} />
        </motion.div>
      </div>
    </div>
  )
}