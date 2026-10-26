import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { SERVICES } from '../data'
import { useGoTo } from '../hooks'

const ease = [0.22, 1, 0.36, 1]

// One warm/cool gradient per service, cycled
const TONES = [
  'from-orange-400 via-rose-400 to-amber-300',
  'from-indigo-500 via-sky-400 to-cyan-300',
  'from-rose-500 via-orange-400 to-yellow-300',
  'from-violet-500 via-indigo-400 to-sky-300',
]

// Short lists shown inside the card (override per service with `tags` in data.js)
const DETAILS = {
  'custom software development': ['Enterprise apps', 'Internal tools', 'Cloud & APIs'],
  'website development': ['WordPress', 'React', 'E-commerce'],
  'mobile app development': ['Android', 'iOS'],
  'ui/ux design': ['Research', 'Wireframes', 'Prototypes'],
  'it consulting and support': ['Strategy', 'Infrastructure', 'Ongoing support'],
  'digital marketing and seo': ['SEO', 'Social media', 'Paid ads'],
  'ai and automation solutions': ['Chatbots', 'Workflow automation', 'Data insights'],
}

export default function Services() {
  const goTo = useGoTo()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  const current = SERVICES[active]
  const tone = TONES[active % TONES.length]
  const tags = current.tags || DETAILS[current.title.toLowerCase()] || []

  return (
    <section
      id="services"
      className="section relative overflow-hidden"
      style={{
        background:
          'radial-gradient(50% 50% at 100% 0%, rgba(111,156,240,.35) 0%, rgba(111,156,240,0) 70%),' +
          'radial-gradient(50% 50% at 0% 100%, rgba(255,179,71,.35) 0%, rgba(255,179,71,0) 70%),' +
          '#fbf1ea',
      }}
    >
      <div className="container-x relative">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Services built for modern business
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            End-to-end technology services, from the first idea to launch and beyond.
          </p>
        </div>

        <div className="grid items-stretch gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Service index */}
          <ul className="border-b border-slate-900/15">
            {SERVICES.map((s, i) => {
              const isActive = i === active
              return (
                <li key={s.title} className="border-t border-slate-900/15">
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group flex w-full items-center gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 sm:gap-6 sm:py-6"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isActive ? 'bg-slate-950 text-white' : 'bg-white/60 text-slate-800'
                      }`}
                    >
                      <s.icon size={22} />
                    </span>

                    <span
                      className={`flex-1 font-display text-2xl font-extrabold uppercase leading-tight tracking-tight transition-colors duration-300 sm:whitespace-nowrap sm:text-2xl lg:text-3xl ${
                        isActive ? 'text-slate-950' : 'text-slate-900/45 group-hover:text-slate-900/75'
                      }`}
                    >
                      {s.title}
                    </span>

                    <FiArrowUpRight
                      size={26}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive ? 'translate-x-0 text-slate-950 opacity-100' : '-translate-x-2 opacity-0'
                      }`}
                    />
                  </button>

                  {/* Mobile / tablet: description opens inline */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="inline"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="overflow-hidden lg:hidden"
                      >
                        {s.image && (
                          <img
                            src={s.image}
                            alt={s.imageAlt || s.title}
                            loading="lazy"
                            className="mb-4 ml-16 h-44 w-[calc(100%-4rem)] rounded-2xl object-cover sm:ml-[4.5rem] sm:w-[calc(100%-4.5rem)]"
                          />
                        )}
                        <p className="pb-6 pl-16 text-base leading-relaxed text-slate-700 sm:pl-[4.5rem]">
                          {s.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          {/* Desktop preview panel */}
          <div className="relative hidden lg:block">
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/60 bg-white/30 p-10 shadow-[0_20px_60px_-20px_rgba(120,70,60,.35)] backdrop-blur-xl">
              {/* Color field that changes with the active service */}
              <div
                aria-hidden="true"
                className={`absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br ${tone} opacity-70 blur-3xl transition-all duration-700`}
              />
              <div
                aria-hidden="true"
                className={`absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr ${tone} opacity-40 blur-3xl transition-all duration-700`}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative flex h-full flex-col justify-between gap-8"
                >
                  {current.image ? (
                    <div className="relative h-56 overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={current.image}
                        alt={current.imageAlt || current.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 bg-gradient-to-tr ${tone} opacity-25 mix-blend-soft-light`}
                      />
                      <span
                        className={`absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg`}
                      >
                        <current.icon size={24} />
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${tone} text-white shadow-lg`}
                    >
                      <current.icon size={44} />
                    </div>
                  )}

                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-slate-950">
                      {current.title}
                    </h3>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-800">
                      {current.desc}
                    </p>

                    {tags.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-slate-900/20 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate-900"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      onClick={() => goTo('contact')}
                      className="group mt-8 inline-flex items-center gap-3 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
                    >
                      Talk to us
                      <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile CTA */}
          <button
            onClick={() => goTo('contact')}
            className="inline-flex items-center justify-center gap-3 self-start rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white lg:hidden"
          >
            Talk to us <FiArrowUpRight />
          </button>
        </div>
      </div>
    </section>
  )
}