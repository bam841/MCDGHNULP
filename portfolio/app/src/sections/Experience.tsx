import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    initial: 'T',
    bgColor: '#3B51FF',
    date: '2022 — PRESENT',
    role: 'Senior Frontend Engineer',
    company: 'TechVision Labs',
    description: 'Leading the frontend architecture for a suite of B2B SaaS products. Responsible for design system implementation, performance optimization, and mentoring a team of 5 developers.',
    achievements: [
      'Reduced application bundle size by 45% through code splitting and lazy loading',
      'Built a component library adopted across 3 product teams',
      'Improved Core Web Vitals scores from 42 to 92 average',
      'Led migration from legacy jQuery codebase to modern React architecture',
    ],
    isCurrent: true,
  },
  {
    initial: 'N',
    bgColor: 'rgba(59, 81, 255, 0.3)',
    date: '2019 — 2022',
    role: 'Full-Stack Developer',
    company: 'Nexa Digital Agency',
    description: 'Developed custom web applications for clients across e-commerce, fintech, and healthcare sectors. Collaborated closely with designers to deliver pixel-perfect implementations.',
    achievements: [
      'Delivered 15+ client projects with 100% on-time completion rate',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
      'Built a reusable starter template that accelerated project kickoffs by 3x',
      'Received "Developer of the Year" award in 2021',
    ],
    isCurrent: false,
  },
]

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 7, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
]

function ExperienceCard({ exp }: { exp: typeof experiences[0] }) {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    if (expanded) {
      gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' })
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' })
    }
  }, [expanded])

  return (
    <div className="glass-card p-8 md:p-10" data-cursor-expand>
      {/* Header */}
      <div className="flex justify-between items-start">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-sans font-bold text-xl text-cream"
          style={{ background: exp.bgColor }}
        >
          {exp.initial}
        </div>
        <span className="font-mono text-[13px] uppercase" style={{ color: 'rgba(244, 238, 232, 0.5)' }}>
          {exp.date}
        </span>
      </div>

      {/* Role & Company */}
      <h3 className="font-sans font-semibold text-[22px] text-cream mt-5">{exp.role}</h3>
      <p className="font-sans font-normal text-base text-blue mt-1">{exp.company}</p>
      <p className="font-sans font-light text-[15px] leading-[1.6] mt-4" style={{ color: 'rgba(244, 238, 232, 0.65)' }}>
        {exp.description}
      </p>

      {/* Expandable Achievements */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 font-sans font-medium text-sm text-blue mt-5 hover:underline transition-all duration-300"
      >
        View Achievements
        <i className={`ph ph-caret-down transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <ul className="flex flex-col gap-3 mt-4">
          {exp.achievements.map((ach) => (
            <li key={ach} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
              <span className="font-sans font-light text-sm" style={{ color: 'rgba(244, 238, 232, 0.7)' }}>{ach}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null)
  const suffixRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (numRef.current) numRef.current.textContent = String(value)
      return
    }

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: numRef.current,
        start: 'top 85%',
      },
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(obj.val))
      },
      onComplete: () => {
        if (suffixRef.current) {
          gsap.fromTo(suffixRef.current, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
        }
      }
    })
  }, [value])

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-baseline">
        <span ref={numRef} className="font-sans font-bold text-[40px] md:text-[56px] text-blue">0</span>
        <span ref={suffixRef} className="font-sans font-bold text-[40px] md:text-[56px] text-blue">{suffix}</span>
      </div>
      <span className="font-mono text-xs uppercase tracking-[2px] mt-2" style={{ color: 'rgba(244, 238, 232, 0.5)' }}>
        {label}
      </span>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

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

      // Timeline draw
      gsap.fromTo(timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.2, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // Cards
      const cards = cardsRef.current?.querySelectorAll('.glass-card')
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
          }
        )
      }

      // Stats
      const statEls = statsRef.current?.children
      if (statEls) {
        gsap.fromTo(statEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-[100px] md:py-[150px] px-[5vw]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={labelRef} className="section-label mb-6">03 / EXPERIENCE</div>
        <h2 ref={headlineRef} className="font-sans font-medium text-[40px] md:text-[56px] text-cream mb-16 md:mb-20">
          Where I've Worked
        </h2>

        {/* Cards + Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Timeline connector (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] origin-top" style={{ background: 'rgba(244, 238, 232, 0.08)' }}>
            <div ref={timelineRef} className="w-full h-full origin-top" style={{ background: 'rgba(59, 81, 255, 0.3)' }} />
            {/* Timeline nodes */}
            <div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-blue"
              style={{ background: '#03020F', boxShadow: experiences[0].isCurrent ? '0 0 8px rgba(59, 81, 255, 0.6)' : 'none' }}
            />
            <div
              className="absolute top-[50%] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-blue"
              style={{ background: '#03020F' }}
            />
          </div>

          <div ref={cardsRef} className="contents">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.company} exp={exp} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-12 md:gap-20 mt-16 md:mt-20">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
