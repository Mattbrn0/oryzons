import Hero from './components/Hero'
import Services from './components/Services'
import SiteHeader from './components/SiteHeader'

export default function App() {
  return (
    <div className="relative min-h-dvh">
      <SiteHeader />
      <Hero />
      <Services />
      <section
        id="contact"
        className="scroll-mt-[5.5rem] border-t border-white/10 bg-[#0c1c24] px-5 py-16 text-center sm:px-8 sm:py-20"
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading" className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Contact
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/65">
          Une question ou un projet ? Écrivez-nous, on vous répond rapidement.
        </p>
      </section>
    </div>
  )
}
