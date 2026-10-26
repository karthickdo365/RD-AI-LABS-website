import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiArrowUp } from 'react-icons/fi'
import { COMPANY, NAV_LINKS } from '../data'
import { useGoTo } from '../hooks'

const FOOTER_BG = {
  background:
    'radial-gradient(55% 80% at 0% 100%, rgba(255,179,71,.40) 0%, rgba(255,179,71,0) 70%),' +
    'radial-gradient(50% 80% at 100% 100%, rgba(111,156,240,.40) 0%, rgba(111,156,240,0) 70%),' +
    '#fbf1ea',
}

// Text link with a gradient underline that draws in on hover
const LINK =
  'relative inline-block text-slate-800 transition-colors hover:text-slate-950 ' +
  "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-orange-500 after:via-rose-500 after:to-indigo-600 after:transition after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none"

export default function Footer() {
  const goTo = useGoTo()

  const socials = [
    { icon: FaLinkedinIn, href: COMPANY.social.linkedin, label: 'LinkedIn' },
    { icon: FaInstagram, href: COMPANY.social.instagram, label: 'Instagram' },
    { icon: FaXTwitter, href: COMPANY.social.x, label: 'X' },
    { icon: FaGithub, href: COMPANY.social.github, label: 'GitHub' },
  ]

  return (
    <footer
      className="relative overflow-hidden border-t border-slate-900/10 px-5 pb-8 pt-16 sm:px-8"
      style={FOOTER_BG}
    >
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <button
              onClick={() => goTo('home')}
              aria-label="RD AI Labs home"
              className="group block"
            >
              <img
                src="/rd-ai-labs-logo.png"
                alt="RD AI Labs logo"
                className="h-14 w-14 object-contain transition duration-500 group-hover:rotate-[360deg] motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
              />
            </button>
            <p className="mt-3 font-display text-lg font-extrabold uppercase tracking-tight text-slate-950">
              {COMPANY.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-700">
              Modern software engineering, web applications and AI-powered solutions built around real-world needs.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-display text-lg font-extrabold uppercase tracking-tight text-slate-950">
              Quick links
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm font-medium">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`/#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      goTo(l.id)
                    }}
                    className={LINK}
                  >
                    {l.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 font-display text-lg font-extrabold uppercase tracking-tight text-slate-950">
              Connect
            </h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/60 bg-white/50 text-slate-900 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:text-white hover:shadow-[0_12px_24px_-10px_rgba(120,70,60,.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {/* color fills up from the bottom on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-y-full bg-gradient-to-br from-orange-500 via-rose-500 to-indigo-600 transition duration-300 group-hover:translate-y-0 motion-reduce:transition-none"
                  />
                  <s.icon size={18} className="relative transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>

            <p className="mt-5 text-sm font-medium leading-relaxed text-slate-800">
              <a href={`mailto:${COMPANY.email}`} className={LINK}>{COMPANY.email}</a>
              <br />
              {COMPANY.phone}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-900/15 pt-6 text-sm text-slate-700 sm:flex-row">
          <p>© {new Date().getFullYear()} RD AI Labs. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link to="/privacy" className={LINK}>Privacy Policy</Link>
            <Link to="/terms" className={LINK}>Terms &amp; Conditions</Link>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            >
              Back to top
              <FiArrowUp className="transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}