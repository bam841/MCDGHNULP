import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Quote entrance
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // Divider line draw
      gsap.fromTo(dividerRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.0, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // Dot bounce in
      gsap.fromTo(dotRef.current,
        { scale: 0 },
        {
          scale: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // Bio paragraphs stagger
      const paragraphs = bioRef.current?.querySelectorAll('.bio-para')
      if (paragraphs) {
        gsap.fromTo(paragraphs,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.4,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-[100px] md:py-[175px] px-[5vw]"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 md:gap-20 items-start">
        {/* Left: Pull Quote */}
        <div ref={quoteRef} className="relative">
          {/* Decorative quotation mark */}
          <div
            className="font-serif text-[120px] leading-none select-none absolute -top-8 -left-4"
            style={{ color: 'rgba(59, 81, 255, 0.2)' }}
          >
            &ldquo;
          </div>
          <blockquote className="font-serif italic text-[28px] md:text-[36px] leading-[1.3] text-cream pt-16">
            The best code is the code you don't have to write — but when you do, make it beautiful.
          </blockquote>
        </div>

        {/* Divider (visible on desktop) */}
        <div className="hidden md:flex justify-center relative">
          <div
            ref={dividerRef}
            className="w-[1px] origin-top"
            style={{ background: 'rgba(244, 238, 232, 0.08)', minHeight: '300px' }}
          />
          <div
            ref={dotRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue"
            style={{ boxShadow: '0 0 12px rgba(59, 81, 255, 0.5)' }}
          />
        </div>

        {/* Right: Bio Text */}
        <div ref={bioRef} className="flex flex-col gap-6">
          <p className="bio-para font-sans font-light text-base leading-[1.7]" style={{ color: 'rgba(244, 238, 232, 0.65)' }}>
            With over seven years of experience building web applications, I've honed a philosophy that great software sits at the intersection of technical excellence and human-centered design. I don't just write code — I craft experiences.
          </p>
          <p className="bio-para font-sans font-light text-base leading-[1.7]" style={{ color: 'rgba(244, 238, 232, 0.65)' }}>
            My journey began with a curiosity about how things work under the hood, which evolved into a passion for creating interfaces that feel intuitive and performant. From startup MVPs to enterprise-scale applications, I bring the same dedication to quality and attention to detail.
          </p>
          <p className="bio-para font-sans font-light text-base leading-[1.7]" style={{ color: 'rgba(244, 238, 232, 0.65)' }}>
            When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or mentoring aspiring developers. I believe in continuous learning and the power of community.
          </p>

          <button
            onClick={() => {
              const el = document.querySelector('#experience')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bio-para flex items-center gap-2 font-sans font-medium text-sm uppercase tracking-[1px] text-blue hover:underline mt-2 group transition-all duration-300"
          >
            Read My Story
            <i className="ph ph-arrow-right text-base transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
