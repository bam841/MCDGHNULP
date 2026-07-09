import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: 'ph-github-logo', href: 'https://github.com/johnabrahm', label: 'GitHub' },
  { icon: 'ph-linkedin-logo', href: 'https://linkedin.com/in/johnabrahm', label: 'LinkedIn' },
  { icon: 'ph-x-logo', href: 'https://twitter.com/johnabrahm', label: 'Twitter' },
  { icon: 'ph-dribbble-logo', href: 'https://dribbble.com/johnabrahm', label: 'Dribbble' },
  { icon: 'ph-envelope', href: 'mailto:zapicoja@students.nu-lipa.edu.ph', label: 'Email' },
]

interface FooterProps {
  lenisRef: React.RefObject<Lenis | null>
}

export default function Footer({ lenisRef }: FooterProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(brandRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 1.0, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
        }
      )

      const links = navRef.current?.querySelectorAll('button')
      if (links) {
        gsap.fromTo(links,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
          }
        )
      }

      gsap.fromTo(socialsRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
        }
      )

      gsap.fromTo(bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (href: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { duration: 1.2 })
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer ref={sectionRef} className="bg-bg-card py-16 md:py-20 px-[5vw]">
      <div className="max-w-[1200px] mx-auto">
        {/* Brand Mark */}
        <div ref={brandRef} className="text-center">
          <div
            className="font-sans font-bold text-[48px] md:text-[80px] uppercase tracking-[20px] select-none"
            style={{ color: 'rgba(244, 238, 232, 0.06)' }}
          >
            AURYN
          </div>
          <div className="w-full h-[1px] my-8 md:my-10" style={{ background: 'rgba(244, 238, 232, 0.08)' }} />
        </div>

        {/* Navigation Links */}
        <div ref={navRef} className="flex flex-wrap justify-center gap-6 md:gap-10">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-sans font-normal text-sm uppercase tracking-[2px] transition-colors duration-300 hover:text-cream"
              style={{ color: 'rgba(244, 238, 232, 0.5)' }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div ref={socialsRef} className="flex justify-center gap-6 mt-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="block transition-all duration-300 hover:text-blue hover:scale-125"
              style={{ color: 'rgba(244, 238, 232, 0.3)' }}
            >
              <i className={`${link.icon} text-xl`} />
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 pt-6"
          style={{ borderTop: '1px solid rgba(244, 238, 232, 0.05)' }}
        >
          <span className="font-mono text-xs" style={{ color: 'rgba(244, 238, 232, 0.3)' }}>
            &copy; 2024 Alex Morgan. All rights reserved.
          </span>
          <button
            onClick={() => scrollTo('#top')}
            className="font-mono text-xs transition-colors duration-300 hover:text-blue group"
            style={{ color: 'rgba(244, 238, 232, 0.3)' }}
          >
            Back to Top
            <span className="inline-block ml-1 transition-transform duration-300 group-hover:-translate-y-1">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
