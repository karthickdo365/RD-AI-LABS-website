import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useReducedMotion, useTransform } from 'framer-motion'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { useGoTo } from '../hooks'

const HeroScene = lazy(() => import('./HeroScene'))

// Warm DXC-style gradient (orange -> coral -> lavender -> blue)
const HERO_BG = {
  background:
    'radial-gradient(60% 70% at 0% 100%, #ffb347 0%, rgba(255,179,71,0) 70%),' +
    'radial-gradient(55% 60% at 45% 85%, #f4846a 0%, rgba(244,132,106,0) 70%),' +
    'radial-gradient(60% 70% at 100% 0%, #6f9cf0 0%, rgba(111,156,240,0) 70%),' +
    'radial-gradient(50% 60% at 85% 80%, #c9c3ec 0%, rgba(201,195,236,0) 70%),' +
    '#fbf1ea',
}

const GRAIN = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
}

function supports3D() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.innerWidth < 1024) return false
  if ((navigator.hardwareConcurrency || 8) <= 2) return false
  if ((navigator.deviceMemory || 8) <= 2) return false
  return true
}

function HeroFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 opacity-60 md:left-auto md:right-[6%] md:translate-x-0 md:opacity-100 lg:h-[520px] lg:w-[520px]">
        <div className="spin-slow absolute inset-0 rounded-full border border-slate-900/25">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_16px_4px_rgba(251,146,60,.7)]" />
        </div>

        <div className="spin-rev absolute inset-[12%] rounded-full border border-indigo-900/25">
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_16px_4px_rgba(99,102,241,.6)]" />
        </div>

        <div className="spin-slow absolute inset-[26%] rounded-full border border-rose-500/30" />
        <div className="floaty absolute inset-[38%] rounded-full bg-gradient-to-br from-orange-400 via-rose-400 to-indigo-400 opacity-80 blur-xl" />
        <div className="floaty absolute inset-[44%] rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_0_40px_rgba(244,132,106,.6)]" />
      </div>
    </div>
  )
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const headline = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
}

const word = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const WORDS = [
  { t: 'Transforming' },
  { t: 'Ideas' },
  { t: 'into' },
  { t: 'Intelligent', g: true },
  { t: 'Digital', g: true },
  { t: 'Solutions', g: true },
]

export default function Hero({ ready }) {
  const goTo = useGoTo()
  const ref = useRef(null)

  const [enable3D, setEnable3D] = useState(false)
  const [inView, setInView] = useState(true)

  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // Scroll-linked motion. One mapping works in BOTH directions:
  //  - scrolling down: the text slides left and fades out
  //  - scrolling up:   the same animation plays in reverse (text slides back and fades in)
  // It is always fully visible at the top of the page.
  const textX = useTransform(scrollY, [0, 400], [0, -80])
  const textOpacity = useTransform(scrollY, [0, 320], [1, 0])

  useEffect(() => {
    setEnable3D(supports3D())
  }, [])

  // Stop the 3D scene rendering when the hero is off-screen.
  useEffect(() => {
    const element = ref.current

    if (!element || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      style={HERO_BG}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8"
    >
      {/* Background effects */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={GRAIN}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-orange-300/40 blur-[140px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full bg-indigo-300/40 blur-[150px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-1/3 top-1/4 h-72 w-72 rounded-full bg-rose-300/30 blur-[120px]"
        aria-hidden="true"
      />

      {/* 3D visual or lightweight fallback */}
      {enable3D ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex w-[48%] items-center justify-end pr-5 xl:pr-10"
          aria-hidden="true"
        >
          <Suspense fallback={<HeroFallback />}>
            <HeroScene active={inView} />
          </Suspense>
        </div>
      ) : (
        <HeroFallback />
      )}

      <div className="container-x relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className={`max-w-3xl ${enable3D ? 'lg:max-w-lg xl:max-w-xl' : ''}`}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: textX,
                  opacity: textOpacity,
                }
          }
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-900 backdrop-blur-md sm:text-sm sm:tracking-[0.22em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>

            Technology · Innovation · Growth
          </motion.span>

          {/* Main heading */}
          <motion.h1
            variants={headline}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-6xl xl:text-7xl"
          >
            {WORDS.map((item) => (
              <motion.span
                key={item.t}
                variants={word}
                className={`mr-[0.28em] inline-block ${
                  item.g
                    ? 'bg-gradient-to-r from-orange-600 via-rose-600 to-indigo-700 bg-clip-text text-transparent'
                    : ''
                }`}
              >
                {item.t}
              </motion.span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-xl"
          >
            We help businesses grow through modern software engineering,
            web applications, and AI-powered solutions built around
            real-world needs.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <button
              onClick={() => goTo('services')}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 font-semibold text-white transition hover:bg-slate-800"
            >
              Explore Our Services
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => goTo('contact')}
              className="inline-flex items-center justify-center rounded-full border border-slate-900 px-7 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => goTo('services')}
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-slate-600 transition hover:text-slate-950 sm:block"
      >
        <FiChevronDown size={28} />
      </button>
    </section>
  )
}