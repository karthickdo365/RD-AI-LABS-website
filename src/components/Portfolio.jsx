
import { PROJECTS } from '../data'
import {
  FiArrowUpRight,
  FiTrendingUp,
  FiLayers,
} from 'react-icons/fi'
import { useGoTo } from '../hooks'
import Reveal from './Reveal'
import Visual from './Visual'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2'

export default function Portfolio() {
  const goTo = useGoTo()

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="container-x relative mx-auto max-w-7xl">
        {/* Section heading */}
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700 sm:text-[11px]">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-sky-600"
                />
                Our portfolio
              </p>

              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-900">
                Case studies that{' '}
                <span className="text-slate-400">
                  deliver results.
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Explore sample projects showcasing how thoughtful
                design and modern technology can solve business
                challenges.
              </p>
            </div>

            <button
              type="button"
              onClick={() => goTo('contact')}
              className={`group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-800 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 ${FOCUS}`}
            >
              Start a project
              <FiArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </Reveal>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/[0.07] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                {/* Project visual */}
                <div className="relative overflow-hidden bg-slate-100">
                  <Visual
                    icon={p.icon || FiLayers}
                    from={p.from}
                    to={p.to}
                    className="h-48 w-full transition-transform duration-500 ease-out group-hover:scale-[1.035] motion-reduce:transition-none sm:h-52"
                  />

                  {/* Soft image overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Sample label */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700 shadow-sm backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                    Sample project
                  </span>

                  {/* Project action */}
                  <button
                    type="button"
                    onClick={() => goTo('contact')}
                    aria-label={`Discuss a project like ${p.title}`}
                    className={`absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-md transition-all duration-300 hover:bg-slate-900 hover:text-white group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 ${FOCUS}`}
                  >
                    <FiArrowUpRight size={18} aria-hidden="true" />
                  </button>
                </div>

                {/* Project information */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                    {p.industry}
                  </p>

                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl">
                    {p.title}
                  </h3>

                  {/* Technology tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors duration-200 group-hover:border-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project result */}
                  <div className="mt-5 flex flex-1 items-start gap-3 border-t border-slate-100 pt-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                      <FiTrendingUp size={16} aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                        Project outcome
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {p.result}
                      </p>
                    </div>
                  </div>

                  {/* Contact link */}
                  <button
                    type="button"
                    onClick={() => goTo('contact')}
                    className={`group/link mt-5 inline-flex min-h-10 w-fit items-center gap-2 text-[13px] font-semibold text-slate-800 transition-colors hover:text-sky-700 ${FOCUS}`}
                  >
                    Discuss a similar project
                    <FiArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </button>
                </div>

                {/* Bottom accent */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </article>
            </Reveal>
          ))}
        </div>

        {/* Empty state */}
        {PROJECTS.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-14 text-center">
            <FiLayers
              size={28}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Projects coming soon
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon to explore our work.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
