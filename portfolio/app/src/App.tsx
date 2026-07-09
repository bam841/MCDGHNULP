import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Preloader from './sections/Preloader'
import NavHeader from './sections/NavHeader'
import CustomCursor from './sections/CustomCursor'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Metrics from './sections/Metrics'
import Services from './sections/Services'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <div className="relative bg-bg min-h-screen">
      <Preloader />
      <CustomCursor />
      <NavHeader lenisRef={lenisRef} />
      <main>
        <Hero />
        <Philosophy />
        <Projects />
        <Skills />
        <Experience />
        <Metrics />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer lenisRef={lenisRef} />
    </div>
  )
}

export default App
