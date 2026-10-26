
import rdLogo from './assets/rd-ai-labs-logo.png'
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Loader from './components/Loader'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Careers from './components/Careers'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import LegalPage from './components/LegalPage'

/** Home page: all sections stacked, each reachable from the navbar. */
function Home({ ready }) {
  const { state } = useLocation()

  // Coming from /privacy or /terms with a target section? Scroll to it.
  useEffect(() => {
    if (!state?.scrollTo) return
    const t = setTimeout(
      () => document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: 'smooth' }),
      120
    )
    return () => clearTimeout(t)
  }, [state])

  return (
    <main>
      <Hero ready={ready} />
      <Services />
      <About />
      <Portfolio />
      <Careers />
      <Blog />
      <Contact />
    </main>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)

  // Page-load animation: show the loader briefly, then reveal the site.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <CursorGlow />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home ready={!loading} />} />
        <Route path="/privacy" element={<LegalPage kind="privacy" />} />
        <Route path="/terms" element={<LegalPage kind="terms" />} />
        <Route path="*" element={<LegalPage kind="404" />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
