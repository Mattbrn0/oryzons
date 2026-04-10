import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Navbar    from './components/Navbar'
import RouteSeo  from './components/RouteSeo'
import Hero      from './components/Hero'
import LogoStrip from './components/LogoStrip'
import Services  from './components/Services'
import Process   from './components/Process'
import Pricing  from './components/Pricing'
import Contact    from './components/Contact'
import Footer    from './components/Footer'

// Chargement différé de la page À propos (elle n'est pas visible au premier rendu)
const AboutPage = lazy(() => import('./pages/AboutPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const CGUPage = lazy(() => import('./pages/CGUPage'))
const CGVPage = lazy(() => import('./pages/CGVPage'))
const SitemapPage = lazy(() => import('./pages/SitemapPage'))
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'))

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function ScrollToTopOnRouteChange() {
  const location = useLocation()
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      let attempts = 0
      const maxAttempts = 40
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' })
          return
        }
        attempts += 1
        if (attempts < maxAttempts) requestAnimationFrame(scrollToTarget)
      }
      requestAnimationFrame(() => requestAnimationFrame(scrollToTarget))
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'instant' : 'smooth' })
    // `key` change à chaque navigation même si pathname/hash identiques (ex. même #contact + nouveau state).
  }, [location.pathname, location.hash, location.key])
  return null
}

function HomePage() {
  useReveal()
  return (
    <div className="min-h-svh bg-white">
      <Hero />
      <Services />
      <Process />
      <LogoStrip />
      <Pricing />
      <Contact />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const path = location.pathname
  const navMode = path === '/a-propos' ? 'about' : path === '/' ? 'home' : 'page'

  return (
    <div className="min-h-svh bg-white">
      <Navbar mode={navMode} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <main id="contenu-principal">
            <Routes location={location}>
              <Route path="/"         element={<HomePage />} />
            <Route path="/a-propos" element={
              <Suspense fallback={<div className="min-h-svh" />}>
                <AboutPage />
              </Suspense>
            } />
            <Route
              path="/services"
              element={
                <Suspense fallback={<div className="min-h-svh" />}>
                  <ServicesPage />
                </Suspense>
              }
            />
            <Route
              path="/FAQ"
              element={
                <Suspense fallback={<div className="min-h-svh" />}>
                  <FAQPage />
                </Suspense>
              }
            />
            <Route
              path="/support"
              element={
                <Suspense fallback={<div className="min-h-svh" />}>
                  <ComingSoonPage />
                </Suspense>
              }
            />
            <Route
              path="/cgu"
              element={
                <Suspense fallback={<div className="min-h-svh" />}>
                  <CGUPage />
                </Suspense>
              }
            />
            <Route
              path="/cgv"
              element={
                <Suspense fallback={<div className="min-h-svh" />}>
                  <CGVPage />
                </Suspense>
              }
            />
            <Route
              path="/plan-du-site"
              element={
                <Suspense fallback={<div className="min-h-svh" />}>
                  <SitemapPage />
                </Suspense>
              }
            />
            <Route
              path="/mentions-legales"
              element={
                <Suspense fallback={<div className="min-h-svh" />}>
                  <MentionsLegalesPage />
                </Suspense>
              }
            />
            </Routes>
          </main>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteSeo />
      <ScrollToTopOnRouteChange />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
