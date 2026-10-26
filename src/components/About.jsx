import { ABOUT, VALUES, STATS, TEAM } from '../data'
import { FiTarget, FiEye, FiUser } from 'react-icons/fi'
import Reveal from './Reveal'
import Counter from './Counter'

const SECTION_BG = {
  background:
    'radial-gradient(50% 45% at 0% 0%, rgba(255,179,71,.30) 0%, rgba(255,179,71,0) 70%),' +
    'radial-gradient(50% 50% at 100% 100%, rgba(111,156,240,.35) 0%, rgba(111,156,240,0) 70%),' +
    '#fbf1ea',
}

const CARD =
  'group relative overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(120,70,60,.35)] ' +
  'transition duration-300 hover:-translate-y-1.5 hover:bg-white/60 hover:shadow-[0_24px_50px_-18px_rgba(120,70,60,.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0'

// Soft color glow that grows from the corner on hover
function HoverGlow({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-orange-300 via-rose-300 to-indigo-300 opacity-0 blur-2xl transition duration-500 group-hover:scale-150 group-hover:opacity-70 motion-reduce:transition-none ${className}`}
    />
  )
}

function Avatar({ member }) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="relative h-32 w-32">
      {/* Gradient ring that spins on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 transition duration-300 [animation-duration:3s] group-hover:animate-spin group-hover:opacity-100 motion-reduce:animate-none"
        style={{ background: 'conic-gradient(from 0deg, #fb923c, #f43f5e, #6366f1, #38bdf8, #fb923c)' }}
      />
      <div className="absolute inset-1 overflow-hidden rounded-full bg-[#fbf1ea]">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="h-full w-full rounded-full object-cover transition duration-500 group-hover:scale-110 motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-rose-400 to-indigo-500 font-display text-3xl font-bold text-white">
            {initials || <FiUser />}
          </div>
        )}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section relative overflow-hidden" style={SECTION_BG}>
      <div className="container-x relative">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Tap the untapped potential in your business
          </h2>
        </div>

        {/* Story + mission/vision */}
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-slate-700 sm:text-lg">
              <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-slate-950">
                Our story
              </h3>
              {ABOUT.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: FiTarget, title: 'Our Mission', text: ABOUT.mission },
              { icon: FiEye, title: 'Our Vision', text: ABOUT.vision },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.12}>
                <div className={`${CARD} h-full rounded-3xl p-7`}>
                  <HoverGlow />
                  <span className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition duration-300 group-hover:rotate-6 group-hover:scale-110 motion-reduce:transition-none">
                    <c.icon size={24} />
                  </span>
                  <h3 className="relative font-display text-xl font-extrabold uppercase tracking-tight text-slate-950">
                    {c.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-slate-700">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Counters */}
        <Reveal className="mt-20">
          <div className="grid gap-8 rounded-[2rem] border border-white/60 bg-white/30 p-8 text-center shadow-[0_20px_60px_-20px_rgba(120,70,60,.35)] backdrop-blur-xl sm:grid-cols-3 sm:p-12">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="transition duration-300 hover:scale-105 motion-reduce:hover:scale-100"
              >
                <div className="bg-gradient-to-r from-orange-600 via-rose-600 to-indigo-700 bg-clip-text font-display text-5xl font-extrabold text-transparent sm:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-800">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Values */}
        <div className="mt-20">
          <Reveal>
            <h3 className="mb-8 text-center font-display text-2xl font-extrabold uppercase tracking-tight text-slate-950">
              What we stand for
            </h3>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className={`${CARD} h-full rounded-2xl p-6`}>
                  {/* underline that draws in on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 transition duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <v.icon
                    className="mb-4 text-orange-600 transition duration-300 group-hover:scale-125 group-hover:text-indigo-700 motion-reduce:transition-none"
                    size={26}
                  />
                  <h4 className="font-display text-lg font-extrabold uppercase tracking-tight text-slate-950">
                    {v.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-24">
          <Reveal>
            <h3 className="mb-10 text-center font-display text-2xl font-extrabold uppercase tracking-tight text-slate-950">
              Meet the team
            </h3>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`${CARD} flex flex-col items-center rounded-3xl p-8 text-center`}>
                  <HoverGlow className="-left-10 right-auto" />
                  <div className="relative">
                    <Avatar member={m} />
                  </div>
                  <h4 className="relative mt-5 font-display text-lg font-extrabold uppercase tracking-tight text-slate-950">
                    {m.name}
                  </h4>
                  <p className="relative text-sm font-medium text-indigo-700">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}