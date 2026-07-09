import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

interface NavHeaderProps {
  lenisRef: React.RefObject<Lenis | null>
}

export default function NavHeader({ lenisRef }: NavHeaderProps) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 100)
      if (y > lastScrollY.current && y > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Track active section
    const sections = ['projects', 'about', 'skills', 'experience', 'contact']
    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      })
    })

    // Entrance animation
    const handlePreloaderComplete = () => {
      gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power3.out' })
    }
    window.addEventListener('preloaderComplete', handlePreloaderComplete)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('preloaderComplete', handlePreloaderComplete)
      ScrollTrigger.getAll().forEach(t => {
        if (sections.includes(t.vars.trigger?.toString().replace('#', '') || '')) t.kill()
      })
    }
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { duration: 1.2 })
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 h-[85px] flex items-center justify-between px-[5vw] transition-all duration-500 opacity-0 ${
          scrolled ? 'nav-blur scrolled' : 'nav-blur'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#top')}
          className="font-sans font-bold text-[20px] tracking-[4px] uppercase text-cream hover:text-blue transition-colors duration-300"
        >
          AURYN
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`font-sans font-normal text-base text-cream hover:text-blue transition-colors duration-300 relative pb-1 ${
                activeSection === link.href.slice(1) ? 'text-blue' : ''
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-blue text-cream font-sans font-semibold text-sm uppercase tracking-[1px] px-6 py-2.5 rounded-[30px] hover:bg-cream hover:text-bg transition-all duration-300"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[2px] bg-cream transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-cream transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-cream transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-overlay flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-sans font-normal text-[32px] text-cream hover:text-blue transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-4 bg-blue text-cream font-sans font-semibold text-sm uppercase tracking-[1px] px-8 py-3 rounded-[30px]"
          >
            Let's Talk
          </button>
        </div>
      )}
    </>
  )
}
