
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowUpRight, FiLayers } from 'react-icons/fi'
import { SERVICES } from '../data'
import { useGoTo } from '../hooks'

const EASE = [0.22, 1, 0.36, 1]

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
}

/*
  Each service has its own image.
  Specific service names are checked before generic keywords.
*/
const serviceImages = [
  {
    keywords: ['custom software'],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['website development', 'web development', 'website design', 'web design', 'website'],
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['mobile app', 'mobile application'],
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['artificial intelligence', 'machine learning', 'ai solutions', 'ai development'],
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['ui/ux', 'ui ux', 'user experience', 'graphic design', 'product design'],
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['cloud', 'devops', 'infrastructure'],
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['cybersecurity', 'cyber security', 'security'],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['automation'],
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  },
  {
    keywords: ['data analytics', 'data science', 'analytics'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
]

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'

function getServiceImage(title = '') {
  const normalizedTitle = title.toLowerCase().trim()

  const match = serviceImages.find(({ keywords }) =>
    keywords.some((keyword) => normalizedTitle.includes(keyword))
  )

  return match?.image || DEFAULT_IMAGE
}

export default function Services() {
  const goTo = useGoTo()
  const reduceMotion = useReducedMotion()

  const visibleServices = (SERVICES || []).filter(
    (service) =>
      !service.title?.toLowerCase().includes('digital marketing')
  )

  if (!visibleServices.length) return null

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="container-x relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: EASE,
          }}
          className="mb-9 flex flex-col gap-5 sm:mb-11 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700 sm:text-[11px]">
              <span
                className="h-px w-7 bg-sky-600"
                aria-hidden="true"
              />
              What we do
            </p>

            <h2 className="font-display text-[clamp(1.9rem,3.5vw,3.1rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-900">
              Technology built around{' '}
              <span className="text-slate-400">
                your business goals.
              </span>
            </h2>

           
          </div>

          <button
            type="button"
            onClick={() => goTo('contact')}
            className={`group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 ${FOCUS}`}
          >
            Discuss your project
            <FiArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>

        {/* Compact service cards */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.06 }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleServices.map((service) => {
            const image = getServiceImage(service.title)
            const Icon = service.icon || FiLayers

            return (
              <motion.article
                key={service.title}
                variants={cardVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { duration: 0.22 },
                      }
                }
                className="group relative isolate min-w-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm ring-1 ring-slate-200/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
              >
                {/* Card image */}
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />

                {/* Image overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/25 to-slate-900/10 transition-colors duration-500 group-hover:from-slate-950/95 group-hover:via-slate-950/65 group-hover:to-slate-950/25"
                />

                {/* Content */}
                <div className="flex min-h-[245px] flex-col justify-end p-4 sm:min-h-[270px] sm:p-5">
                  <div className="mb-auto flex items-start justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-white/15 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white/25">
                      <Icon size={18} aria-hidden="true" />
                    </div>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-slate-900">
                      <FiArrowUpRight
                        size={17}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  {/* Always-visible title */}
                  <h3 className="max-w-sm font-display text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                    {service.title}
                  </h3>

                  {/* Reveal description on hover, focus, or touch */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin] duration-300 ease-out group-hover:mt-2.5 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:mt-2.5 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 [@media(hover:none)]:mt-2.5 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                    <div className="overflow-hidden">
                      <p className="text-[12px] leading-5 text-white/85 sm:text-[13px] sm:leading-6">
                        {service.desc}
                      </p>

                      <button
                        type="button"
                        onClick={() => goTo('contact')}
                        aria-label={`Discuss ${service.title}`}
                        className={`mt-3 inline-flex min-h-8 items-center gap-2 text-xs font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-sky-200 sm:text-[13px] ${FOCUS}`}
                      >
                        Learn more
                        <FiArrowUpRight
                          size={15}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
