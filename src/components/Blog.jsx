
import { POSTS } from '../data'
import { FiArrowRight, FiCalendar } from 'react-icons/fi'
import Reveal from './Reveal'
import Visual from './Visual'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2'

export default function Blog() {
  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="container-x relative mx-auto max-w-7xl">
        {/* Section heading */}
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700 sm:text-[11px]">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-sky-600"
                />
                Insights & ideas
              </p>

              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-900">
                Latest insights{' '}
                <span className="text-slate-400">
                  for what's next.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Ideas, practical tips, and technology updates from
                the RD AI Labs team to help you build smarter
                digital experiences.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Technology & innovation
            </div>
          </div>
        </Reveal>

        {/* Blog cards */}
        {POSTS.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {POSTS.map((post, index) => (
              <Reveal key={post.title} delay={index * 0.08}>
                <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/[0.07] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Blog visual */}
                  <div className="relative overflow-hidden bg-slate-100">
                    <Visual
                      icon={post.icon}
                      from={post.from}
                      to={post.to}
                      className="h-44 w-full transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none sm:h-48"
                    />

                    {/* Soft image overlay */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* Date badge */}
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg border border-white/70 bg-white/95 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md">
                      <FiCalendar
                        size={14}
                        className="text-sky-700"
                        aria-hidden="true"
                      />
                      <span>{post.date}</span>
                    </div>

                    {/* Corner arrow */}
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-800 shadow-sm transition-all duration-300 group-hover:rotate-[-45deg] group-hover:bg-slate-900 group-hover:text-white">
                      <FiArrowRight
                        size={16}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  {/* Blog information */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                      RD AI Labs Journal
                    </p>

                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-sky-800 sm:text-xl">
                      {post.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                      {post.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <a
                        href="#blog"
                        onClick={(event) => event.preventDefault()}
                        aria-label={`Read more about ${post.title}`}
                        className={`inline-flex min-h-9 items-center gap-2 text-[13px] font-semibold text-slate-800 transition-colors duration-200 hover:text-sky-700 ${FOCUS}`}
                      >
                        Read article
                        <FiArrowRight
                          size={16}
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </a>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-14 text-center">
            <FiCalendar
              size={28}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              New insights coming soon
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Check back soon for articles, ideas, and technology
              updates from our team.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
