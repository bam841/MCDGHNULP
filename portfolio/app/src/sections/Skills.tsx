import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    icon: 'ph-code',
    title: 'Frontend',
    subtitle: 'Building beautiful interfaces',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Vue.js / Nuxt', level: 80 },
      { name: 'HTML5 / CSS3 / Sass', level: 98 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'GSAP / Framer Motion', level: 88 },
    ],
  },
  {
    icon: 'ph-server',
    title: 'Backend',
    subtitle: 'Powering robust systems',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Python / Django', level: 75 },
      { name: 'PostgreSQL / MongoDB', level: 85 },
      { name: 'GraphQL / REST APIs', level: 92 },
      { name: 'Docker / CI/CD', level: 80 },
      { name: 'AWS / Vercel / Netlify', level: 85 },
    ],
  },
  {
    icon: 'ph-layers',
    title: 'Design & Tools',
    subtitle: 'Crafting with precision',
    skills: [
      { name: 'Figma / Adobe XD', level: 88 },
      { name: 'Git / GitHub', level: 95 },
      { name: 'Webpack / Vite', level: 82 },
      { name: 'Jest / Cypress', level: 78 },
      { name: 'Agile / Scrum', level: 90 },
      { name: 'UI/UX Principles', level: 85 },
    ],
  },
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      if (barRef.current) barRef.current.style.width = `${level}%`
      return
    }

    gsap.fromTo(barRef.current,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1.0,
        ease: 'power2.out',
        delay,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
        }
      }
    )
  }, [level, delay])

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="font-sans font-normal text-[15px]" style={{ color: 'rgba(244, 238, 232, 0.8)' }}>{name}</span>
      </div>
      <div className="w-full h-1 rounded-full" style={{ background: 'rgba(244, 238, 232, 0.1)' }}>
        <div
          ref={barRef}
          className="h-full rounded-full bg-blue"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  return (
    <div className="glass-card p-8 md:p-10">
      <i className={`ph ${category.icon} text-[40px] text-blue`} />
      <h3 className="font-sans font-semibold text-[22px] text-cream mt-4">{category.title}</h3>
      <p className="font-sans font-light text-sm mt-1" style={{ color: 'rgba(244, 238, 232, 0.5)' }}>
        {category.subtitle}
      </p>
      <div className="flex flex-col gap-5 mt-8">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={index * 0.12 + i * 0.08}
          />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
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
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-[100px] md:py-[175px] px-[5vw]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={labelRef} className="section-label mb-6">02 / SKILLS & TOOLS</div>
        <h2 ref={headlineRef} className="font-sans font-medium text-[40px] md:text-[56px] text-cream mb-16 md:mb-20">
          My Tech Stack
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
