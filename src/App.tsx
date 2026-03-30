import { useEffect } from 'react'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import LogoStrip from './components/LogoStrip'
import Services  from './components/Services'
import Process   from './components/Process'
import Pricing   from './components/Pricing'
import Contact   from './components/Contact'
import Footer    from './components/Footer'

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

export default function App() {
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
