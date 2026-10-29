
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiEye, FiTarget } from 'react-icons/fi'
import { ABOUT } from '../data'

const EASE = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const MISSION_VISION = [
  {
    title: 'Our Mission',
    description:
      ABOUT?.mission ||
      'To build practical, user-focused digital solutions that help people and businesses move forward.',
    icon: FiTarget,
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Our Vision',
    description:
      'We exist to Tap the Untapped. We empower brilliant local talent with cutting-edge AI tools to solve real-world business challenges and deliver exceptional customer experiences.',
    icon: FiEye,
    accent: 'bg-orange-100 text-orange-700',
  },
]

export default function About() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#F7F3EF] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Warm, premium background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, transparent 10%, rgba(255,190,140,0.13) 28%, transparent 39%, rgba(125,190,235,0.15) 53%, rgba(190,187,240,0.12) 68%, transparent 82%)',
          }}
        />

        <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-orange-200/30 blur-[100px]" />

        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-sky-200/30 blur-[110px]" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-200/20 blur-[100px]" />
      </div>

      <div className="container-x relative mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* LEFT: About content */}
          <div className="min-w-0">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D96D48]">
                <span className="h-px w-8 bg-[#D96D48]" />
                About RD AI Labs
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 max-w-xl font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#202A35] [text-wrap:balance]"
            >
              Turning ideas into{' '}
              <span className="bg-gradient-to-r from-[#4A82B7] via-[#7777C9] to-[#D98263] bg-clip-text text-transparent">
                meaningful technology.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-sm leading-7 text-[#626975] sm:text-base sm:leading-8"
            >
              {ABOUT?.intro ||
                'We combine thoughtful design and modern technology to create meaningful digital experiences and practical solutions.'}
            </motion.p>

            {/* Our story */}
            <motion.div
              variants={fadeUp}
              className="mt-8 border-l-2 border-[#8BB8D8] pl-5"
            >
              <h3 className="font-display text-lg font-semibold tracking-tight text-[#202A35]">
                Our Story
              </h3>

              <div className="mt-3 space-y-3 text-sm leading-7 text-[#626975] sm:text-[15px]">
                {Array.isArray(ABOUT?.story) ? (
                  ABOUT.story.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>
                    {ABOUT?.story ||
                      'RD AI Labs brings creativity and engineering together to build digital products that solve real problems. Our focus is on useful, reliable, and accessible technology.'}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <a
                href="#contact"
                className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[#202A35] py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(32,42,53,0.55)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#344A5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              >
                Let's work together

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <FiArrowRight size={15} aria-hidden="true" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Image and mission / vision */}
          <motion.div
            variants={fadeUp}
            className="relative mx-auto w-full max-w-[540px] lg:ml-auto"
          >
            {/* Technology image */}
            <div className="group relative overflow-hidden rounded-[26px] border border-white/80 bg-white/60 p-2 shadow-[0_24px_65px_-32px_rgba(36,48,62,0.35)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-[#E6EAF0]">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                  alt="Modern technology workspace with a collaborative team environment"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />

                {/* Soft image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#182635]/75 via-transparent to-white/5" />

                <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200">
                    Our approach
                  </span>

                  <h3 className="mt-2 max-w-sm font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-3xl">
                    Innovation with purpose.
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
                    Thoughtful ideas. Practical solutions. Technology that
                    moves business forward.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission and vision cards */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {MISSION_VISION.map((item, index) => {
                const Icon = item.icon

                return (
                  <motion.article
                    key={item.title}
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 14 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.45,
                      delay: reduceMotion ? 0 : index * 0.1,
                      ease: EASE,
                    }}
                    whileHover={
                      reduceMotion ? undefined : { y: -3 }
                    }
                    className="rounded-[20px] border border-white/90 bg-white/75 p-4 shadow-[0_8px_28px_-18px_rgba(36,48,62,0.24)] backdrop-blur-xl sm:p-5"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.accent}`}
                    >
                      <Icon size={19} aria-hidden="true" />
                    </div>

                    <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-[#202A35]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-[13px] leading-6 text-[#626975]">
                      {item.description}
                    </p>
                  </motion.article>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
