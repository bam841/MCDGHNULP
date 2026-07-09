import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechFlow Inc.',
    image: '/assets/testimonial-1.jpg',
    quote: 'Alex transformed our vision into reality. The attention to detail and technical craftsmanship exceeded our expectations. Our platform\'s performance improved dramatically, and our users love the new interface.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Lead, InnovateLabs',
    image: '/assets/testimonial-2.jpg',
    quote: 'Working with Alex was a game-changer for our team. Not only did they deliver an exceptional product, but they also elevated our entire development process. Truly a world-class engineer.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Founder, DesignCraft Studio',
    image: '/assets/testimonial-3.jpg',
    quote: 'The perfect blend of technical expertise and design sensibility. Alex understood our aesthetic vision and built something that was both beautiful and blazingly fast. Highly recommended.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const quoteRef = useRef<HTMLDivElement>(null)

  const goTo = (index: number) => {
    if (isAnimating || index === current) return
    setIsAnimating(true)

    const direction = index > current ? 1 : -1

    // Animate out
    gsap.to(quoteRef.current, {
      opacity: 0,
      x: -40 * direction,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        // Animate in
        gsap.fromTo(quoteRef.current,
          { opacity: 0, x: 40 * direction },
          {
            opacity: 1, x: 0, duration: 0.4, ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        )
      }
    })
  }

  const next = () => goTo((current + 1) % testimonials.length)
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo(sliderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const t = testimonials[current]

  return (
    <section ref={sectionRef} className="py-[100px] md:py-[150px] px-[5vw]">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="section-label mb-4">06 / TESTIMONIALS</div>
          <h2 className="font-sans font-medium text-[36px] md:text-[48px] text-cream">What Clients Say</h2>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="relative">
          {/* Arrow Left */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-blue hover:bg-[rgba(59,81,255,0.1)] z-10"
            style={{ borderColor: 'rgba(244, 238, 232, 0.2)' }}
            aria-label="Previous testimonial"
          >
            <i className="ph ph-caret-left text-cream text-xl" />
          </button>

          {/* Arrow Right */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-blue hover:bg-[rgba(59,81,255,0.1)] z-10"
            style={{ borderColor: 'rgba(244, 238, 232, 0.2)' }}
            aria-label="Next testimonial"
          >
            <i className="ph ph-caret-right text-cream text-xl" />
          </button>

          {/* Card */}
          <div className="max-w-[700px] mx-auto text-center px-8 md:px-16">
            <div ref={quoteRef}>
              {/* Opening quote */}
              <div
                className="font-serif text-[80px] md:text-[120px] leading-none select-none -mb-8 md:-mb-12"
                style={{ color: 'rgba(59, 81, 255, 0.15)' }}
              >
                &ldquo;
              </div>

              <blockquote className="font-serif italic text-xl md:text-[28px] leading-[1.5] text-cream px-4 md:px-10">
                {t.quote}
              </blockquote>

              {/* Closing quote */}
              <div
                className="font-serif text-[80px] md:text-[120px] leading-none select-none -mt-8 md:-mt-12 text-right"
                style={{ color: 'rgba(59, 81, 255, 0.15)' }}
              >
                &rdquo;
              </div>

              {/* Divider */}
              <div className="w-[60px] h-[1px] mx-auto my-8" style={{ background: 'rgba(244, 238, 232, 0.08)' }} />

              {/* Client Photo */}
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full mx-auto object-cover"
                style={{ border: '2px solid rgba(59, 81, 255, 0.3)' }}
              />

              {/* Client Name & Role */}
              <p className="font-sans font-semibold text-base text-cream mt-4">{t.name}</p>
              <p className="font-sans font-light text-sm mt-1" style={{ color: 'rgba(244, 238, 232, 0.5)' }}>
                {t.role}
              </p>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-blue scale-125' : ''
                }`}
                style={{ background: i === current ? '#3B51FF' : 'rgba(244, 238, 232, 0.2)' }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
