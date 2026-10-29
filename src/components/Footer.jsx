import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaInstagram, FaGithub, FaFacebookF } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiArrowUp } from 'react-icons/fi'
import { COMPANY, NAV_LINKS } from '../data'
import { useGoTo } from '../hooks'

// Text link with a gradient underline that draws in on hover
const LINK =
  'relative inline-block text-white transition-colors hover:text-white ' +
  "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-orange-500 after:via-rose-500 after:to-indigo-600 after:transition after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none"

// Social profile links
const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/rd-ai-labs-7a2ab1443/',
  instagram: 'https://www.instagram.com/rdailabsattur/',
  facebook: 'https://www.facebook.com/profile.php?id=61595078384135',
}

export default function Footer() {
  const goTo = useGoTo()

  const socials = [
    { icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
    { icon: FaXTwitter, href: COMPANY.social.x, label: 'X' },
    { icon: FaGithub, href: COMPANY.social.github, label: 'GitHub' },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 pb-8 pt-16 text-white sm:px-8">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <button
              onClick={() => goTo('home')}
              aria-label="RD AI Labs home"
              className="group block"
            >
              {/* white background behind the logo, larger size */}
              <span className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-2.5 shadow-lg">
                <img
                  src="/rd-ai-labs-logo.png"
                  alt="RD AI Labs logo"
                  className="h-full w-full object-contain transition duration-500 group-hover:rotate-[360deg] motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
                />
              </span>
            </button>
            <p className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight text-white">
              {COMPANY.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white">
              Modern software engineering, web applications and AI-powered solutions built around real-world needs.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-display text-lg font-extrabold uppercase tracking-tight text-white">
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
            <h3 className="mb-4 font-display text-lg font-extrabold uppercase tracking-tight text-white">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/30 bg-white/10 text-white backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_12px_24px_-10px_rgba(255,255,255,.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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

            <p className="mt-5 text-sm font-medium leading-relaxed text-white">
              <a href={`mailto:${COMPANY.email}`} className={LINK}>{COMPANY.email}</a>
              <br />
              {COMPANY.phone}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white sm:flex-row">
          <p>© {new Date().getFullYear()} RD AI Labs. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link to="/privacy" className={LINK}>Privacy Policy</Link>
            <Link to="/terms" className={LINK}>Terms &amp; Conditions</Link>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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