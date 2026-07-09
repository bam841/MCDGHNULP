import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Meridian E-Commerce Platform',
    image: '/assets/project-1.jpg',
    description: 'A full-stack e-commerce platform with real-time inventory, AI-powered recommendations, and a seamless checkout experience.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    demo: 'https://meridian-demo.vercel.app',
    github: 'https://github.com/alexmorgan/meridian',
  },
  {
    title: 'Nebula Design System',
    image: '/assets/project-2.jpg',
    description: 'An open-source component library with 60+ accessible components, theming engine, and comprehensive documentation.',
    tags: ['TypeScript', 'React', 'Storybook', 'Tailwind', 'Figma'],
    demo: 'https://nebula-ui.dev',
    github: 'https://github.com/alexmorgan/nebula',
  },
  {
    title: 'Pulse Analytics Dashboard',
    image: '/assets/project-3.jpg',
    description: 'Real-time analytics dashboard for SaaS platforms featuring interactive visualizations, custom reports, and team collaboration.',
    tags: ['Next.js', 'D3.js', 'GraphQL', 'Redis', 'Docker'],
    demo: 'https://pulse-analytics.io',
    github: 'https://github.com/alexmorgan/pulse',
  },
  {
    title: 'Aether Social Platform',
    image: '/assets/project-4.jpg',
    description: 'A community-driven platform with real-time messaging, content creation tools, and AI-powered content moderation.',
    tags: ['React Native', 'Firebase', 'TensorFlow', 'WebSocket'],
    demo: 'https://aether.social',
    github: 'https://github.com/alexmorgan/aether',
  },
  {
    title: 'Vertex 3D Configurator',
    image: '/assets/project-5.jpg',
    description: 'Browser-based 3D product configurator with real-time rendering, material switching, and AR preview capabilities.',
    tags: ['Three.js', 'WebGL', 'Vue.js', 'Blender', 'Vercel'],
    demo: 'https://vertex-3d.vercel.app',
    github: 'https://github.com/alexmorgan/vertex',
  },
  {
    title: 'Chrono Task Manager',
    image: '/assets/project-6.jpg',
    description: 'A productivity app featuring kanban boards, time tracking, pomodoro timer, and team sprint planning tools.',
    tags: ['Svelte', 'Supabase', 'Tailwind', 'PWA', 'Vite'],
    demo: 'https://chrono-tasks.app',
    github: 'https://github.com/alexmorgan/chrono',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // 3D tilt effect
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const card = cardRef.current
    if (!card) return

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      const rotY = dx * 8
      const rotX = -dy * 8
      gsap.to(card, { rotateX: rotX, rotateY: rotY, duration: 0.3, ease: 'power2.out' })
      gsap.to(imageRef.current, { x: -dx * 5, y: -dy * 5, duration: 0.3, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' })
      gsap.to(imageRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="glass-card overflow-hidden group"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      data-cursor-expand
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="font-sans font-semibold text-xl md:text-2xl text-cream">{project.title}</h3>
        <p className="font-sans font-light text-[15px] leading-[1.6] mt-3 line-clamp-2" style={{ color: 'rgba(244, 238, 232, 0.65)' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-5">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors duration-300 hover:text-blue"
            style={{ color: 'rgba(244, 238, 232, 0.5)' }}
          >
            <i className="ph ph-globe text-lg" />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors duration-300 hover:text-blue"
            style={{ color: 'rgba(244, 238, 232, 0.5)' }}
          >
            <i className="ph ph-github-logo text-lg" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Label + headline
      gsap.fromTo([labelRef.current, headlineRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // Left column cards
      const leftCards = leftColRef.current?.querySelectorAll('.glass-card')
      if (leftCards) {
        gsap.fromTo(leftCards,
          { opacity: 0, y: 80, rotateX: 5 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        )
      }

      // Right column cards (with delay for wave effect)
      const rightCards = rightColRef.current?.querySelectorAll('.glass-card')
      if (rightCards) {
        gsap.fromTo(rightCards,
          { opacity: 0, y: 80, rotateX: 5 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.3,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
          }
        )
      }

      // Parallax effect
      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        })
      }
      if (rightColRef.current) {
        gsap.to(rightColRef.current, {
          y: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const leftProjects = projects.filter((_, i) => i % 2 === 0)
  const rightProjects = projects.filter((_, i) => i % 2 === 1)

  return (
    <section ref={sectionRef} id="projects" className="py-[100px] md:py-[150px] px-[5vw]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Label */}
        <div ref={labelRef} className="section-label mb-6">01 / FEATURED PROJECTS</div>
        <h2 ref={headlineRef} className="font-sans font-medium text-[40px] md:text-[56px] text-cream mb-16 md:mb-20">
          Selected Work
        </h2>

        {/* Staggered Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div ref={leftColRef} className="flex flex-col gap-8 md:mt-20">
            {leftProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i * 2} />
            ))}
          </div>
          <div ref={rightColRef} className="flex flex-col gap-8">
            {rightProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
