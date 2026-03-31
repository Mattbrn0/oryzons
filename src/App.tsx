import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import LogoStrip from './components/LogoStrip'
import Services  from './components/Services'
import Process   from './components/Process'
import Pricing   from './components/Pricing'
import Contact   from './components/Contact'
import Footer    from './components/Footer'
import AboutPage from './pages/AboutPage'

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

function HomePage() {
  useReveal()
  return (
    <div className="min-h-svh bg-white">
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Services />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/a-propos" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}
