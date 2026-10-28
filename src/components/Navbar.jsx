import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data'
import { useGoTo } from '../hooks'

const EASE = [0.22, 1, 0.36, 1]

/*
  Tokens (shared with Hero)
  ink   #0E1330   text and primary button
  mist  #5B627C   secondary text
  iris  #4F5BFF   accent: focus, active indicator
*/

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F5BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

function BrandLogo() {
  return (
    <span className="flex items-center gap-3">
      <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#0E1330]/10 transition duration-300 group-hover:shadow-md group-hover:ring-[#4F5BFF]/40 sm:h-11 sm:w-11">
        <img
          src="/rd-ai-labs-logo.png"
          alt=""
          width={44}
          height={44}
          draggable={false}
          className="h-full w-full object-cover"
        />
      </span>

      <span className="flex flex-col text-left leading-none">
        <span className="whitespace-nowrap font-display text-[17px] font-semibold tracking-[-0.02em] text-[#0E1330] sm:text-lg">
          RD AI Labs
        </span>
        
      </span>
    </span>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  const goTo = useGoTo()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  })

  // Track page scroll for navbar styling.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect the currently visible section.
  useEffect(() => {
    if (pathname !== '/') {
      setActive('')
      return undefined
    }

    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter(Boolean)

    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length) setActive(visible[0].target.id)
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close mobile navigation when the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Allow Escape to close the mobile menu.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleNavigation = (id) => {
    setOpen(false)
    goTo(id)
  }

  const linkClass = (isActive) =>
    `relative isolate inline-flex items-center justify-center rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200 xl:px-4 ${FOCUS} ${
      isActive
        ? 'text-[#0E1330]'
        : 'text-[#0E1330]/60 hover:text-[#0E1330]'
    }`

  const ctaClass = `group inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#0E1330] py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,19,48,0.55)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(79,91,255,0.6)] ${FOCUS}`

  const ctaIcon =
    'flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0E1330] transition duration-300 group-hover:bg-[#4F5BFF] group-hover:text-white'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={`relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-[26px] border px-3 py-2 backdrop-blur-xl transition-all duration-300 sm:px-4 lg:rounded-full lg:pl-4 lg:pr-2 ${
          scrolled || open
            ? 'border-white/90 bg-white/85 shadow-[0_18px_50px_-20px_rgba(14,19,48,0.28)] ring-1 ring-[#0E1330]/5'
            : 'border-white/70 bg-white/60 shadow-[0_10px_34px_-20px_rgba(14,19,48,0.2)] ring-1 ring-[#0E1330]/[0.04]'
        }`}
      >
        {/* Left: brand */}
        <button
          type="button"
          onClick={() => handleNavigation('home')}
          aria-label="RD AI Labs home"
          className={`group flex shrink-0 items-center rounded-xl ${FOCUS}`}
        >
          <BrandLogo />
        </button>

        {/* Center: desktop navigation */}
        <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id && pathname === '/'

            return (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => handleNavigation(link.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={linkClass(isActive)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[#0E1330]/[0.06] ring-1 ring-[#0E1330]/[0.06]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  {link.short}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Right: CTA and mobile toggle */}
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={() => handleNavigation('contact')}
            className={`${ctaClass} hidden sm:inline-flex`}
          >
            Talk to us
            <span className={ctaIcon}>
              <FiArrowUpRight size={15} aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-[#0E1330]/10 bg-white/80 text-[#0E1330] transition hover:border-[#0E1330]/25 hover:bg-white lg:hidden ${FOCUS}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={
                  reduce ? false : { opacity: 0, rotate: -25, scale: 0.85 }
                }
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={
                  reduce ? undefined : { opacity: 0, rotate: 25, scale: 0.85 }
                }
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {open ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Scroll progress indicator */}
        {scrolled && !reduce && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 bottom-0 h-[2px] overflow-hidden rounded-full"
          >
            <motion.span
              className="block h-full origin-left rounded-full bg-gradient-to-r from-[#4F5BFF] to-[#8B95FF]"
              style={{ scaleX: progress }}
            />
          </span>
        )}
      </nav>

      {/* Mobile navigation panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="mx-auto mt-2 max-w-7xl overflow-y-auto rounded-[26px] border border-white/90 bg-white/95 p-3 shadow-[0_24px_60px_-20px_rgba(14,19,48,0.35)] ring-1 ring-[#0E1330]/5 backdrop-blur-xl lg:hidden"
            style={{ maxHeight: 'calc(100dvh - 110px)' }}
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, index) => {
                const isActive = active === link.id && pathname === '/'

                return (
                  <motion.li
                    key={link.id}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: reduce ? 0 : index * 0.035,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavigation(link.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors ${FOCUS} ${
                        isActive
                          ? 'bg-[#0E1330]/[0.06] text-[#0E1330]'
                          : 'text-[#0E1330]/65 hover:bg-[#0E1330]/[0.04] hover:text-[#0E1330]'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[#4F5BFF]" />
                      )}
                    </button>
                  </motion.li>
                )
              })}
            </ul>

            <button
              type="button"
              onClick={() => handleNavigation('contact')}
              className={`${ctaClass} mt-3 w-full justify-between py-2 pl-6 pr-2`}
            >
              Talk to us
              <span className={`${ctaIcon} h-8 w-8`}>
                <FiArrowUpRight size={16} aria-hidden="true" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}