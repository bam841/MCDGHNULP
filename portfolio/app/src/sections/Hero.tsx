import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const socialLinks = [
  { icon: 'ph-github-logo', href: 'https://github.com/johnabrahm', label: 'GitHub' },
  { icon: 'ph-linkedin-logo', href: 'https://linkedin.com/in/johnabrahm', label: 'LinkedIn' },
  { icon: 'ph-x-logo', href: 'https://twitter.com/johnabrahm', label: 'Twitter' },
  { icon: 'ph-dribbble-logo', href: 'https://dribbble.com/johnabrahm', label: 'Dribbble' },
  { icon: 'ph-envelope', href: 'mailto:zapicoja@students.nu-lipa.edu.ph', label: 'Email' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const name1Ref = useRef<HTMLDivElement>(null)
  const name2Ref = useRef<HTMLDivElement>(null)
  const decor1Ref = useRef<HTMLDivElement>(null)
  const decor2Ref = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const elements = [
      subtitleRef.current,
      name1Ref.current,
      name2Ref.current,
      decor1Ref.current,
      decor2Ref.current,
      descRef.current,
      ctaRef.current,
      socialsRef.current,
      scrollRef.current,
    ]
    gsap.set(elements.filter(Boolean), { opacity: 0 })
    gsap.set([name1Ref.current, name2Ref.current], { y: 60 })
    gsap.set(subtitleRef.current, { y: 20 })
    gsap.set(descRef.current, { y: 30 })
    gsap.set(ctaRef.current, { y: 20 })

    const tl = gsap.timeline({ delay: 2.6 }) // After preloader

    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(name1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to(name2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.65')
      .to([decor1Ref.current, decor2Ref.current], { opacity: 0.08, duration: 1.0, ease: 'power2.out' }, '-=0.6')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to(socialsRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .to(scrollRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')

    // Orb drift
    gsap.to(orbRef.current, {
      y: '+=20',
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Mouse parallax
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) * 0.03
      const dy = (e.clientY - cy) * 0.03
      const dx2 = (e.clientX - cx) * 0.02
      const dy2 = (e.clientY - cy) * 0.02
      gsap.to(orbRef.current, { x: dx, y: dy - 10, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
      gsap.to([decor1Ref.current, decor2Ref.current], { x: dx2, y: dy2, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      tl.kill()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Gradient Orb */}
      <div
        ref={orbRef}
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(59, 81, 255, 0.15) 0%, rgba(125, 249, 255, 0.05) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Subtitle */}
        <div ref={subtitleRef} className="font-mono text-[13px] uppercase tracking-[3px] mb-8" style={{ color: 'rgba(244, 238, 232, 0.5)' }}>
          Computer Science Student &middot; Aspiring Developer &middot; Always Coding
        </div>

        {/* Title Group */}
        <div className="relative">
          <div className="font-sans font-light text-2xl text-cream mb-2">Hi, I'm</div>

          <div className="relative">
            {/* Decorative italic words */}
            <div
              ref={decor1Ref}
              className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 font-serif italic text-[64px] md:text-[120px] pointer-events-none select-none z-0"
              style={{ color: 'rgba(244, 238, 232, 0.08)' }}
            >
              Developer
            </div>
            <div
              ref={name1Ref}
              className="relative z-10 font-sans font-bold text-[48px] md:text-[80px] text-cream tracking-[-1px]"
            >
              John
            </div>
          </div>

          <div className="relative mt-1">
            <div
              ref={decor2Ref}
              className="absolute -right-4 md:-right-24 top-1/2 -translate-y-1/2 font-serif italic text-[64px] md:text-[120px] pointer-events-none select-none z-0"
              style={{ color: 'rgba(244, 238, 232, 0.08)' }}
            >
              Student
            </div>
            <div
              ref={name2Ref}
              className="relative z-10 font-sans font-bold text-[48px] md:text-[80px] text-cream tracking-[-1px]"
            >
              Abrahm
            </div>
          </div>
        </div>

        {/* Role Description */}
        <div ref={descRef} className="mt-10 max-w-[520px]">
          <p className="font-sans font-light text-lg leading-relaxed" style={{ color: 'rgba(244, 238, 232, 0.65)' }}>
            I build exceptional digital experiences that blend precision engineering with creative design.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-5 mt-10">
          <button
            onClick={() => scrollTo('#projects')}
            className="border border-[rgba(244,238,232,0.3)] bg-transparent text-cream font-sans font-semibold text-sm uppercase tracking-[1px] px-8 py-3 rounded-[30px] hover:bg-cream hover:text-bg transition-all duration-300"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-blue text-cream font-sans font-semibold text-sm uppercase tracking-[1px] px-8 py-3 rounded-[30px] hover:bg-cream hover:text-bg transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>

        {/* Social Links */}
        <div ref={socialsRef} className="flex items-center gap-6 mt-16">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="block transition-all duration-300 hover:text-blue hover:scale-125"
              style={{ color: 'rgba(244, 238, 232, 0.5)' }}
            >
              <i className={`${link.icon} text-2xl`} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="relative w-[1px] h-10" style={{ background: 'rgba(244, 238, 232, 0.3)' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue animate-scroll-dot" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[3px]" style={{ color: 'rgba(244, 238, 232, 0.3)' }}>
          SCROLL
        </span>
      </div>
    </section>
  )
}
