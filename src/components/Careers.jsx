import { motion, useReducedMotion } from 'framer-motion'
import { PERKS, JOBS, COMPANY } from '../data'
import { FiArrowRight, FiBriefcase, FiMapPin, FiClock } from 'react-icons/fi'
import Reveal from './Reveal'

const SECTION_BG = {
  background:
    'radial-gradient(50% 45% at 100% 0%, rgba(111,156,240,.35) 0%, rgba(111,156,240,0) 70%),' +
    'radial-gradient(50% 50% at 0% 100%, rgba(255,179,71,.35) 0%, rgba(255,179,71,0) 70%),' +
    '#fbf1ea',
}

const CARD =
  'group relative overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(120,70,60,.35)] ' +
  'transition duration-300 hover:bg-white/60 hover:shadow-[0_24px_50px_-18px_rgba(120,70,60,.45)] motion-reduce:transition-none'

export default function Careers() {
  const reduce = useReducedMotion()

  return (
    <section id="careers" className="section relative overflow-hidden" style={SECTION_BG}>
      <div className="container-x relative">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Build the future with us
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            We&apos;re a curious, friendly team that loves solving hard problems. If you want to learn
            fast and do meaningful work, you&apos;ll fit right in.
          </p>

          {/* Funny sticky note that wiggles */}
          <motion.p
            animate={reduce ? undefined : { rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-6 inline-block -rotate-2 rounded-lg bg-amber-200 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md"
          >
            Warning: may cause sudden enthusiasm for clean code.
          </motion.p>
        </div>

        {/* Perks */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className={`${CARD} h-full rounded-2xl p-6 hover:-translate-y-1.5 motion-reduce:hover:translate-y-0`}>
                {/* gradient line draws in on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 transition duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition duration-300 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:scale-110 motion-reduce:transition-none">
                  <p.icon size={24} />
                </span>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight text-slate-950">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Open positions */}
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-slate-950">
              Open positions
            </h3>
            <p className="text-sm font-medium text-slate-700">
              Plot twist: the interview is also a conversation.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {JOBS.map((j, i) => (
            <Reveal key={j.title} delay={i * 0.07}>
              <div
                className={`${CARD} flex flex-col gap-5 rounded-2xl p-6 hover:translate-x-1.5 sm:flex-row sm:items-center sm:justify-between motion-reduce:hover:translate-x-0`}
              >
                {/* accent bar grows down the left edge */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-orange-500 via-rose-500 to-indigo-600 transition duration-500 group-hover:scale-y-100 motion-reduce:transition-none"
                />

                <div>
                  <h4 className="font-display text-lg font-extrabold uppercase tracking-tight text-slate-950">
                    {j.title}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-700">
                    <span className="inline-flex items-center gap-1.5"><FiBriefcase /> {j.type}</span>
                    <span className="inline-flex items-center gap-1.5"><FiMapPin /> {j.place}</span>
                    <span className="inline-flex items-center gap-1.5"><FiClock /> {j.exp}</span>
                  </div>
                </div>

                <a
                  href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('Application: ' + j.title)}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
                >
                  {/* label swaps to a playful one on hover */}
                  <span className="grid">
                    <span className="col-start-1 row-start-1 transition duration-300 group-hover:-translate-y-4 group-hover:opacity-0 motion-reduce:transition-none">
                      Apply now
                    </span>
                    <span className="col-start-1 row-start-1 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
                      Let&apos;s do this!
                    </span>
                  </span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-sm text-slate-700">
            <motion.span
              className="mr-1 inline-block origin-bottom-right"
              animate={reduce ? undefined : { rotate: [0, 18, -8, 18, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
              aria-hidden="true"
            >
              👋
            </motion.span>
            Don&apos;t see your role? Email your resume to{' '}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-semibold text-indigo-700 underline-offset-4 hover:underline"
            >
              {COMPANY.email}
            </a>
            . Even &quot;Hi, I&apos;m great&quot; is a fine start.
          </p>
        </Reveal>
      </div>
    </section>
  )
}