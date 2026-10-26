import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data'
import { useGoTo } from '../hooks'

const GLASS = 'border border-white/60 bg-white/55 backdrop-blur-xl'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const { pathname } = useLocation()
  const goTo = useGoTo()

  // Glass background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link for the section currently in view
  useEffect(() => {
    if (pathname !== '/') return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    goTo(id)
  }

  // Split links so the logo sits in the middle
  const half = Math.ceil(NAV_LINKS.length / 2)
  const leftLinks = NAV_LINKS.slice(0, half)
  const rightLinks = NAV_LINKS.slice(half)

  const renderLink = (l) => {
    const isActive = active === l.id && pathname === '/'
    return (
      <li key={l.id}>
        <button
          onClick={() => go(l.id)}
          aria-current={isActive ? 'page' : undefined}
          className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
            isActive ? 'text-slate-950' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 -z-10 rounded-full bg-white/70 shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          {l.short}
        </button>
      </li>
    )
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled || open
            ? `${GLASS} shadow-[0_8px_40px_-12px_rgba(120,70,60,.35)]`
            : 'border border-transparent'
        }`}
      >
        {/* Left links */}
        <ul className="hidden items-center justify-end gap-1 lg:flex">
          {leftLinks.map(renderLink)}
        </ul>

        {/* Centered logo (sits in column 2 on every screen size) */}
        <button
          onClick={() => go('home')}
          aria-label="RD AI Labs home"
          className="col-start-2 mx-4 justify-self-center"
        >
          <img
            src="/rd-ai-labs-logo.png"
            alt="RD AI Labs logo"
            className="h-14 w-14 object-contain"
          />
        </button>

        {/* Right links + actions */}
        <div className="col-start-3 flex items-center justify-end gap-3 lg:justify-between">
          <ul className="hidden items-center gap-1 lg:flex">{rightLinks.map(renderLink)}</ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go('contact')}
              className="hidden items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:inline-flex"
            >
              Contact Us
            </button>
            <button
              className={`${GLASS} rounded-xl p-2.5 text-slate-900 lg:hidden`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className={`${GLASS} mx-auto mt-2 max-w-7xl rounded-2xl p-4 lg:hidden`}
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`w-full rounded-xl px-4 py-3 text-left text-base font-medium transition ${
                      active === l.id && pathname === '/'
                        ? 'bg-white/70 text-slate-950'
                        : 'text-slate-700 hover:bg-white/50'
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => go('contact')}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}