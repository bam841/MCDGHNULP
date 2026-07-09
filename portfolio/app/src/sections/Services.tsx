import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    index: '01',
    icon: 'ph-code',
    title: 'Web Development',
    description: 'End-to-end development of modern web applications. From concept to deployment, I build fast, accessible, and visually stunning digital products.',
    deliverables: [
      'Responsive frontend development',
      'API design & backend integration',
      'Database architecture',
      'Performance optimization',
    ],
    price: 'Starting from $3,000',
  },
  {
    index: '02',
    icon: 'ph-lightbulb',
    title: 'Technical Consulting',
    description: 'Strategic guidance for your technical decisions. I help teams choose the right stack, improve code quality, and scale their applications.',
    deliverables: [
      'Architecture review & recommendations',
      'Code audits & refactoring plans',
      'Tech stack evaluation',
      'Team workflow optimization',
    ],
    price: 'Starting from $1,500',
  },
  {
    index: '03',
    icon: 'ph-users',
    title: 'Mentorship & Training',
    description: 'Personalized guidance for developers and teams. From coding fundamentals to advanced patterns, I help you level up your skills.',
    deliverables: [
      '1-on-1 coding sessions',
      'Code reviews & feedback',
      'Career guidance',
      'Workshop facilitation',
    ],
    price: 'Starting from $500',
  },
]

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <div
      className="glass-card p-10 md:p-12 relative transition-all duration-400 hover:-translate-y-1 group"
      style={{
        '--hover-glow': '0 0 40px rgba(59, 81, 255, 0.15)',
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(59, 81, 255, 0.15)'
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(59, 81, 255, 0.3)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = ''
        ;(e.currentTarget as HTMLElement).style.borderColor = ''
      }}
      data-cursor-expand
    >
      {/* Index number */}
      <div
        className="absolute top-8 right-10 font-sans font-bold text-[48px] select-none"
        style={{ color: 'rgba(59, 81, 255, 0.15)' }}
      >
        {service.index}
      </div>

      <i className={`ph ${service.icon} text-[48px] text-blue mb-6 block`} />
      <h3 className="font-sans font-semibold text-2xl text-cream mt-4">{service.title}</h3>
      <p className="font-sans font-light text-[15px] leading-[1.6] mt-3" style={{ color: 'rgba(244, 238, 232, 0.65)' }}>
        {service.description}
      </p>

      <div className="w-full h-[1px] my-6" style={{ background: 'rgba(244, 238, 232, 0.08)' }} />

      <ul className="flex flex-col gap-3">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <i className="ph ph-check text-blue text-base mt-0.5" />
            <span className="font-sans font-normal text-sm" style={{ color: 'rgba(244, 238, 232, 0.7)' }}>{item}</span>
          </li>
        ))}
      </ul>

      <p className="font-mono text-[13px] uppercase mt-6" style={{ color: 'rgba(244, 238, 232, 0.4)' }}>
        {service.price}
      </p>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo([labelRef.current, headlineRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      const cards = cardsRef.current?.querySelectorAll('.glass-card')
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80 },
          {
            opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[100px] md:py-[175px] px-[5vw]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={labelRef} className="section-label mb-6">05 / SERVICES</div>
        <h2 ref={headlineRef} className="font-sans font-medium text-[40px] md:text-[56px] text-cream mb-16 md:mb-20">
          What I Can Do For You
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.index} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
