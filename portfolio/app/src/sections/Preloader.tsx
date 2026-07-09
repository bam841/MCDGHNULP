import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const lineTopRef = useRef<HTMLDivElement>(null)
  const lineBottomRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setHidden(true)
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    const tl = gsap.timeline({
      onComplete: () => {
        setHidden(true)
        document.body.style.overflow = ''
        window.dispatchEvent(new Event('preloaderComplete'))
      }
    })

    tl.set(lineTopRef.current, { scaleX: 0 })
      .set([lineTopRef.current, lineBottomRef.current], { scaleX: 0 })
      .set(labelRef.current, { opacity: 0, y: 10 })

    tl.to(lineTopRef.current, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' })
      .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.8')
      .to(labelRef.current, { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in' }, '+=0.6')
      .to(lineTopRef.current, { y: '-50vh', duration: 0.8, ease: 'expo.inOut' }, '+=0.1')
      .to(lineBottomRef.current, { y: '50vh', duration: 0.8, ease: 'expo.inOut' }, '<')
      .to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }, '-=0.2')

    return () => { tl.kill() }
  }, [])

  if (hidden) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
      style={{ pointerEvents: hidden ? 'none' : 'auto' }}
    >
      {/* Center line that scales then splits */}
      <div ref={lineRef} className="absolute w-full h-[2px] flex flex-col items-center justify-center">
        <div
          ref={lineTopRef}
          className="w-full h-full bg-cream origin-center"
          style={{ position: 'absolute', top: 0 }}
        />
        <div
          ref={lineBottomRef}
          className="w-full h-full bg-cream origin-center"
          style={{ position: 'absolute', top: 0 }}
        />
      </div>

      {/* Logo label */}
      <div
        ref={labelRef}
        className="relative z-10 font-sans font-light text-[48px] tracking-[12px] text-cream uppercase"
      >
        AURYN
      </div>
    </div>
  )
}
