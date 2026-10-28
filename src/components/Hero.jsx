
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { useGoTo } from '../hooks'

const HeroScene = lazy(() => import('./HeroScene'))

const HERO_BG = {
  background:
    'radial-gradient(60% 70% at 0% 100%, #ffb347 0%, rgba(255,179,71,0) 70%),' +
    'radial-gradient(55% 60% at 45% 85%, #f4846a 0%, rgba(244,132,106,0) 70%),' +
    'radial-gradient(60% 70% at 100% 0%, #6f9cf0 0%, rgba(111,156,240,0) 70%),' +
    'radial-gradient(50% 60% at 85% 80%, #c9c3ec 0%, rgba(201,195,236,0) 70%),' +
    '#fbf1ea',
}

const EASE = [0.22, 1, 0.36, 1]
const SCENE_MIN_WIDTH = 440

function isLowEndDevice() {
  if (typeof navigator === 'undefined') return false

  return (
    (navigator.hardwareConcurrency || 8) <= 2 ||
    (navigator.deviceMemory || 8) <= 2
  )
}

function SceneFrame({ ready, active }) {
  const frameRef = useRef(null)
  const [frameWidth, setFrameWidth] = useState(0)

  useEffect(() => {
    const element = frameRef.current
    if (!element) return undefined

    const update = () => setFrameWidth(element.clientWidth)
    update()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }

    const observer = new ResizeObserver(update)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const designWidth = Math.max(SCENE_MIN_WIDTH, frameWidth)
  const scale = frameWidth > 0 ? frameWidth / designWidth : 1

  return (
    <motion.div
      className="mx-auto w-full max-w-[600px] px-1 sm:px-0 lg:col-span-6 lg:max-w-[720px]"
      initial={false}
      animate={
        ready
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 18 }
      }
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
    >
      <div
        ref={frameRef}
        className="relative aspect-[4/3] w-full"
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: designWidth,
            transform: `scale(${scale})`,
          }}
        >
          <Suspense
            fallback={
              <div className="aspect-[4/3] w-full" aria-hidden="true" />
            }
          >
            <HeroScene active={active} ready={ready} />
          </Suspense>
        </div>
      </div>
    </motion.div>
  )
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
}

const headline = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
}

const word = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
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

export default function Hero({ ready = true }) {
  const goTo = useGoTo()
  const sectionRef = useRef(null)

  const [inView, setInView] = useState(true)
  const [lowEnd, setLowEnd] = useState(false)

  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const textX = useTransform(scrollY, [0, 400], [0, -35])
  const textOpacity = useTransform(scrollY, [0, 360], [1, 0])

  useEffect(() => {
    setLowEnd(isLowEndDevice())
  }, [])

  useEffect(() => {
    const element = sectionRef.current

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
      ref={sectionRef}
      style={HERO_BG}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-28"
    >
      {/* Soft decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="container-x relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
        {/* Hero content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={ready ? 'show' : 'hidden'}
          className="min-w-0 lg:col-span-6"
          style={
            reduceMotion
              ? undefined
              : { x: textX, opacity: textOpacity }
          }
        >
          

          <motion.h1
            variants={headline}
            className="max-w-2xl font-display text-[clamp(2rem,4.2vw,3.75rem)] font-bold leading-[1.07] tracking-[-0.045em] text-slate-950 [text-wrap:balance]"
          >
            {WORDS.map((item) => (
              <motion.span
                key={item.t}
                variants={word}
                className={`mr-[0.22em] inline-block ${
                  item.g
                    ? 'bg-gradient-to-r from-indigo-700 via-violet-600 to-violet-500 bg-clip-text text-transparent'
                    : ''
                }`}
              >
                {item.t}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-[13px] leading-7 text-slate-700 sm:mt-6 sm:text-[15px] sm:leading-8"
          >
            We help businesses grow through modern software
            engineering, web applications, and AI-powered solutions
            built around real-world needs.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <button
              type="button"
              onClick={() => goTo('services')}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-[13px] font-semibold text-white shadow-lg shadow-slate-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-100 sm:px-7 sm:text-sm"
            >
              Explore Our Services
              <FiArrowRight
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => goTo('contact')}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-900/70 bg-white/10 px-6 py-3 text-[13px] font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-100 sm:px-7 sm:text-sm"
            >
              Contact Us
            </button>
          </motion.div>
        </motion.div>

        {/* Existing animated robot scene */}
        <div className="min-w-0 lg:col-span-6">
          <SceneFrame
            ready={ready}
            active={inView && !lowEnd && !reduceMotion}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => goTo('services')}
        aria-label="Scroll to services"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-slate-700 transition hover:bg-white/30 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 lg:block"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="block"
        >
          <FiChevronDown size={25} aria-hidden="true" />
        </motion.span>
      </button>
    </section>
  )
}
