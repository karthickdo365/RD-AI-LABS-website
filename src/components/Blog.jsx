import { POSTS } from '../data'
import { FiArrowRight, FiCalendar } from 'react-icons/fi'
import Reveal from './Reveal'
import Visual from './Visual'

const SECTION_BG = {
  background:
    'radial-gradient(50% 50% at 0% 0%, rgba(255,179,71,.30) 0%, rgba(255,179,71,0) 70%),' +
    'radial-gradient(50% 50% at 100% 100%, rgba(111,156,240,.35) 0%, rgba(111,156,240,0) 70%),' +
    '#fbf1ea',
}

export default function Blog() {
  return (
    <section id="blog" className="section relative overflow-hidden" style={SECTION_BG}>
      <div className="container-x relative">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Latest insights
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Ideas, tips and updates from the RD AI Labs team.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-[0_10px_40px_-20px_rgba(120,70,60,.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/60 hover:shadow-[0_28px_60px_-18px_rgba(120,70,60,.5)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="relative overflow-hidden">
                  <Visual
                    icon={p.icon}
                    from={p.from}
                    to={p.to}
                    className="h-48 transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
                  />

                  {/* Light sweep across the image on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full -skew-x-12 bg-white/35 blur-md transition duration-1000 group-hover:translate-x-[450%] motion-reduce:hidden"
                  />

                  {/* Date badge */}
                  <p className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur-md">
                    <FiCalendar /> {p.date}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-extrabold uppercase leading-snug tracking-tight text-slate-950">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">{p.excerpt}</p>

                  {/* Replace "#blog" with the real post URL when you publish it */}
                  <a
                    href="#blog"
                    onClick={(e) => e.preventDefault()}
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950"
                  >
                    <span className="relative">
                      Read more
                      {/* underline draws in on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 transition duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                      />
                    </span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-1.5" />
                  </a>
                </div>

                {/* Gradient line draws along the bottom edge */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 transition duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}