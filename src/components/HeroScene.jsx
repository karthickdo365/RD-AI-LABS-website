import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { FiCode, FiCloud, FiCpu, FiTrendingUp } from 'react-icons/fi'

/* ---------- AI core (replaces the toy robot) ---------- */

// Surface nodes of the neural globe: [x, y, size]
const CORE_NODES = [
  [100, 52, 3], [140, 70, 3.4], [58, 76, 3], [152, 112, 3], [48, 116, 3.4],
  [128, 150, 3], [74, 154, 3], [100, 176, 3], [118, 98, 4], [84, 112, 3.6],
]
const CORE_LINKS = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 7], [8, 9], [8, 1], [9, 2], [8, 3], [9, 4], [8, 5], [9, 6], [0, 8], [0, 9]]

function AiCore({ animated }) {
  const a = animated
  const dur = 9
  return (
    <svg viewBox="0 0 200 270" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="ac-glass" cx=".38" cy=".3" r=".8">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
          <stop offset=".45" stopColor="#c7d2fe" stopOpacity=".45" />
          <stop offset="1" stopColor="#6366f1" stopOpacity=".25" />
        </radialGradient>
        <radialGradient id="ac-core" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".3" stopColor="#67e8f9" />
          <stop offset=".7" stopColor="#6366f1" stopOpacity=".5" />
          <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ac-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22d3ee" stopOpacity=".5" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ac-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8f98cf" />
          <stop offset=".4" stopColor="#ffffff" />
          <stop offset="1" stopColor="#7d86c2" />
        </linearGradient>
        <filter id="ac-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="ac-clip"><circle cx="100" cy="114" r="68" /></clipPath>
      </defs>

      {/* light beam rising from the pedestal */}
      <path d="M70 244 L130 244 L150 170 L50 170 Z" fill="url(#ac-beam)" />

      {/* pedestal */}
      <ellipse cx="100" cy="252" rx="46" ry="10" fill="#312e81" opacity=".28" />
      <path d="M58 240 L58 248 Q100 262 142 248 L142 240 Q100 254 58 240 Z" fill="url(#ac-metal)" stroke="#9aa3d6" strokeWidth="1.2" />
      <ellipse cx="100" cy="240" rx="42" ry="9" fill="#eef2ff" stroke="#22d3ee" strokeWidth="1.6" />
      <ellipse cx="100" cy="240" rx="28" ry="5.5" fill="none" stroke="#6366f1" strokeWidth="1" opacity=".7" />

      {/* globe body */}
      <circle cx="100" cy="114" r="68" fill="url(#ac-glass)" stroke="#a5b4fc" strokeWidth="1.4" />
      <circle cx="100" cy="114" r="34" fill="url(#ac-core)" filter="url(#ac-glow)">
        {a && <animate attributeName="r" values="30;38;30" dur="3s" repeatCount="indefinite" />}
      </circle>

      <g clipPath="url(#ac-clip)" fill="none" stroke="#4f46e5" strokeWidth=".9" opacity=".7">
        {/* latitude lines */}
        {[-48, -24, 0, 24, 48].map((dy) => {
          const rx = Math.sqrt(68 * 68 - dy * dy)
          return <ellipse key={dy} cx="100" cy={114 + dy} rx={rx} ry={rx * 0.16} />
        })}
        {/* rotating meridians */}
        {[0, 1, 2, 3].map((k) => (
          <ellipse key={k} cx="100" cy="114" rx="68" ry="68">
            {a && (
              <animate
                attributeName="rx"
                values="68;0;68"
                dur={`${dur}s`}
                begin={`${-(dur / 4) * k}s`}
                repeatCount="indefinite"
              />
            )}
          </ellipse>
        ))}
      </g>

      {/* neural network on the surface */}
      <g>
        {CORE_LINKS.map(([i, j], k) => (
          <line key={k} x1={CORE_NODES[i][0]} y1={CORE_NODES[i][1]} x2={CORE_NODES[j][0]} y2={CORE_NODES[j][1]} stroke="#0891b2" strokeWidth="1" opacity=".65" />
        ))}
        {CORE_NODES.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? '#6366f1' : '#22d3ee'} stroke="#fff" strokeWidth="1.2" filter="url(#ac-glow)">
            {a && <animate attributeName="opacity" values="1;.35;1" dur={`${1.8 + (i % 4) * 0.5}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" />}
          </circle>
        ))}
      </g>

      {/* glass highlight */}
      <path d="M58 90 Q64 58 98 48" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8" />

      {/* tilted orbit ring with satellite */}
      <g transform="rotate(-18 100 114)">
        <ellipse cx="100" cy="114" rx="92" ry="20" fill="none" stroke="#22d3ee" strokeWidth="1.4" opacity=".7" />
        <circle r="5" fill="#22d3ee" filter="url(#ac-glow)">
          {a && (
            <animateMotion dur="6s" repeatCount="indefinite" path="M8 114 A92 20 0 1 1 192 114 A92 20 0 1 1 8 114" />
          )}
          {!a && <set attributeName="cx" to="192" />}
        </circle>
      </g>

      {/* floating code glyph above */}
      <g fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#ac-glow)">
        <path d="M82 20 L70 30 L82 40" />
        <path d="M118 20 L130 30 L118 40" />
        <path d="M105 16 L95 44" stroke="#22d3ee" />
        {a && <animate attributeName="opacity" values="1;.55;1" dur="2.6s" repeatCount="indefinite" />}
      </g>
    </svg>
  )
}

/* ---------- holographic dashboards ---------- */

// One glass dashboard panel; `kind` picks the chart that is drawn inside
function ChartPanel({ kind }) {
  return (
    <svg viewBox="0 0 120 92" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="cp-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="cp-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6366f1" stopOpacity=".45" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="38" height="4" rx="2" fill="#64748b" opacity=".55" />
      <rect x="10" y="18" width="22" height="3" rx="1.5" fill="#94a3b8" opacity=".5" />
      <circle cx="108" cy="12" r="3" fill="#22d3ee" />

      {kind === 'bars' && (
        <g>
          {[24, 38, 30, 50, 42, 62, 54].map((h, i) => (
            <rect key={i} x={12 + i * 14} y={82 - h} width="9" height={h} rx="2.5" fill="url(#cp-bar)" />
          ))}
        </g>
      )}

      {kind === 'line' && (
        <g>
          <path d="M10 76 L28 60 L46 66 L64 44 L82 52 L100 28 L110 34 L110 82 L10 82 Z" fill="url(#cp-area)" />
          <polyline points="10,76 28,60 46,66 64,44 82,52 100,28 110,34" fill="none" stroke="#6366f1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          {[[28, 60], [64, 44], [100, 28]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3.2" fill="#fff" stroke="#22d3ee" strokeWidth="2" />
          ))}
        </g>
      )}

      {kind === 'donut' && (
        <g>
          <circle cx="40" cy="55" r="22" fill="none" stroke="#e0e7ff" strokeWidth="9" />
          <circle cx="40" cy="55" r="22" fill="none" stroke="url(#cp-bar)" strokeWidth="9" strokeLinecap="round" strokeDasharray="92 138" transform="rotate(-90 40 55)" />
          <rect x="74" y="42" width="32" height="4" rx="2" fill="#6366f1" opacity=".7" />
          <rect x="74" y="54" width="24" height="4" rx="2" fill="#22d3ee" opacity=".8" />
          <rect x="74" y="66" width="30" height="4" rx="2" fill="#94a3b8" opacity=".6" />
        </g>
      )}

      {kind === 'mixed' && (
        <g>
          {[30, 44, 36, 56, 48].map((h, i) => (
            <rect key={i} x={12 + i * 16} y={82 - h} width="10" height={h} rx="2.5" fill="url(#cp-bar)" opacity=".85" />
          ))}
          <polyline points="14,60 30,48 46,54 62,34 78,40" fill="none" stroke="#f472b6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="94" y="46" width="16" height="4" rx="2" fill="#94a3b8" opacity=".6" />
          <rect x="94" y="58" width="12" height="4" rx="2" fill="#94a3b8" opacity=".6" />
        </g>
      )}
    </svg>
  )
}

// Panels sit on an arc behind the core, each facing the centre
const PANELS = [
  { angle: -54, kind: 'donut' },
  { angle: -18, kind: 'bars' },
  { angle: 18, kind: 'line' },
  { angle: 54, kind: 'mixed' },
]

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
    <div ref={ref} className="relative aspect-[4/3] w-full max-w-[720px]" style={{ containerType: 'inline-size' }}>
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
            <div className="absolute -inset-[28%] rounded-full border border-violet-400/30" />
            <div className="absolute -inset-[12%] rounded-full border border-cyan-500/35" />
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
              className="absolute inset-[20%] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(67,56,202,.35), transparent 70%)' }}
            />
            <div
              className="absolute inset-[32%] rounded-full"
              style={{ background: 'radial-gradient(circle, #ffffff 0%, #67e8f9 38%, rgba(129,140,248,.45) 72%)' }}
            />
          </div>

          {/* Phone lying on the platform */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '78%',
              width: '17%',
              aspectRatio: '1 / 2',
              transform: 'translate(-50%, -50%) rotateX(68deg) rotateZ(-32deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {[-1.1, -0.8, -0.5, -0.2].map((zz) => (
              <div
                key={zz}
                className="absolute inset-0 rounded-[18%/9%]"
                style={{ transform: `translateZ(${zz}cqw)`, background: '#8f9bec' }}
              />
            ))}
            <div className="absolute inset-0 rounded-[18%/9%] border-2 border-white/90 bg-gradient-to-br from-white via-indigo-100 to-indigo-200 shadow-[0_0_30px_rgba(99,102,241,.45)]" />
            <div
              className="absolute inset-[7%] rounded-[14%/7%]"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(103,232,249,.85), rgba(99,102,241,.35) 70%),' +
                  'repeating-linear-gradient(0deg, rgba(255,255,255,.35) 0 1px, transparent 1px 14px),' +
                  'repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 1px, transparent 1px 14px)',
              }}
            />
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400"
                animate={animated ? { scale: [0.7, 1.6], opacity: [0.8, 0] } : { opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
              />
            ))}
            <div className="absolute left-1/2 top-1/2 flex aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border-2 border-cyan-300 bg-white/85 shadow-[0_0_22px_rgba(34,211,238,.9)]">
              <div className="h-[55%] w-[55%] rounded-sm bg-gradient-to-br from-indigo-500 to-cyan-400" />
            </div>
          </div>

          {/* Orbit rings around the core */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '56%',
              width: '82%',
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

          {/* Curved holographic dashboards behind the core */}
          <motion.div
            className="absolute"
            style={{ left: '50%', top: '40%', width: 0, height: 0, transformStyle: 'preserve-3d' }}
            animate={animated ? { rotateY: [-7, 7, -7] } : undefined}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >
            {PANELS.map((p, i) => (
              <motion.div
                key={p.angle}
                className="absolute rounded-xl border border-white/80 shadow-[0_14px_34px_-12px_rgba(99,102,241,.55)]"
                style={{
                  width: '17cqw',
                  height: '13cqw',
                  left: '-8.5cqw',
                  top: '-6.5cqw',
                  background: 'linear-gradient(135deg, rgba(255,255,255,.78), rgba(224,231,255,.5))',
                  transform: `rotateY(${p.angle}deg) translateZ(-32cqw)`,
                }}
                animate={animated ? { opacity: [0.85, 1, 0.85] } : undefined}
                transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
              >
                <ChartPanel kind={p.kind} />
              </motion.div>
            ))}
          </motion.div>

          {/* AI core hovering over the phone */}
          <motion.div
            className="absolute"
            style={{ left: '36%', top: '30%', width: '28%', aspectRatio: '200 / 270', z: 40 }}
            animate={animated ? { y: [0, -8, 0] } : undefined}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AiCore animated={animated} />
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