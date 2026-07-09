import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches
    if (isTouch.current) return

    const cursor = cursorRef.current
    if (!cursor) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 4)
      yTo(e.clientY - 4)
    }

    const onEnterInteractive = () => cursor.classList.add('expanded')
    const onLeaveInteractive = () => cursor.classList.remove('expanded')

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, .glass-card, [data-cursor-expand]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    // Re-bind when DOM changes
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll('a, button, .glass-card, [data-cursor-expand]')
      newInteractives.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return <div ref={cursorRef} className="cursor-follower hidden md:block" />
}
