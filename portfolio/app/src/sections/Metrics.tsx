import { useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { icon: 'ph-git-commit', value: '1,247', label: 'Commits this year' },
  { icon: 'ph-git-pull-request', value: '89', label: 'Pull requests' },
  { icon: 'ph-star', value: '2.4k', label: 'Stars earned' },
]

// Generate realistic contribution data (52 weeks × 7 days)
function generateHeatmapData(): number[][] {
  const data: number[][] = []
  for (let week = 0; week < 52; week++) {
    const weekData: number[] = []
    for (let day = 0; day < 7; day++) {
      // Less activity on weekends
      const weekendFactor = (day === 0 || day === 6) ? 0.3 : 1.0
      // Random clusters of activity
      const cluster = Math.sin(week * 0.3 + day) * 0.5 + 0.5
      const random = Math.random()
      const score = random * cluster * weekendFactor
      if (score < 0.15) weekData.push(0)
      else if (score < 0.4) weekData.push(1)
      else if (score < 0.7) weekData.push(2)
      else weekData.push(3)
    }
    data.push(weekData)
  }
  return data
}

const levelColors = [
  'rgba(244, 238, 232, 0.05)',
  'rgba(59, 81, 255, 0.3)',
  'rgba(59, 81, 255, 0.6)',
  '#3B51FF',
]

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const heatmapRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  const heatmapData = useMemo(() => generateHeatmapData(), [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
        }
      )

      // Heatmap cells cascade
      const cells = heatmapRef.current?.querySelectorAll('.heatmap-cell')
      if (cells) {
        gsap.fromTo(cells,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1, scale: 1, duration: 0.3, stagger: 0.002, ease: 'power2.out',
            scrollTrigger: { trigger: heatmapRef.current, start: 'top 85%' }
          }
        )
      }

      // Metrics
      const metricEls = metricsRef.current?.children
      if (metricEls) {
        gsap.fromTo(metricEls,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.5,
            scrollTrigger: { trigger: metricsRef.current, start: 'top 85%' }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-[100px] md:py-[150px] px-[5vw]">
      <div
        className="max-w-[1000px] mx-auto rounded-[24px] p-8 md:p-12"
        style={{
          background: 'rgba(7, 6, 20, 0.5)',
          border: '1px solid rgba(244, 238, 232, 0.05)',
        }}
      >
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <div className="section-label mb-4">04 / ACTIVITY</div>
          <h2 className="font-sans font-medium text-[36px] md:text-[48px] text-cream mt-4">Coding in Public</h2>
          <p className="font-sans font-light text-base mt-3" style={{ color: 'rgba(244, 238, 232, 0.5)' }}>
            A snapshot of my open-source contributions and coding activity.
          </p>
        </div>

        {/* Contribution Heatmap */}
        <div ref={heatmapRef} className="mt-12 overflow-x-auto">
          <div className="flex gap-[3px] min-w-max mx-auto justify-center">
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <div
                    key={di}
                    className="heatmap-cell w-[10px] h-[10px] rounded-sm"
                    style={{ background: levelColors[level] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div ref={metricsRef} className="flex flex-wrap justify-center gap-10 md:gap-16 mt-12">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center text-center">
              <i className={`ph ${m.icon} text-2xl text-blue`} />
              <span className="font-sans font-bold text-[28px] md:text-[32px] text-cream mt-3">{m.value}</span>
              <span className="font-sans font-light text-sm mt-1" style={{ color: 'rgba(244, 238, 232, 0.5)' }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="https://github.com/alexmorgan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium text-sm uppercase tracking-[1px] text-blue hover:text-cream hover:underline transition-all duration-300"
          >
            View Full Profile on GitHub &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
