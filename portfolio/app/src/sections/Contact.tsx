import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FormState = 'idle' | 'loading' | 'success' | 'error'

const socialLinks = [
  { icon: 'ph-github-logo', href: 'https://github.com/alexmorgan', label: 'GitHub' },
  { icon: 'ph-linkedin-logo', href: 'https://linkedin.com/in/alexmorgan', label: 'LinkedIn' },
  { icon: 'ph-x-logo', href: 'https://twitter.com/alexmorgan', label: 'Twitter' },
  { icon: 'ph-dribbble-logo', href: 'https://dribbble.com/alexmorgan', label: 'Dribbble' },
  { icon: 'ph-envelope', href: 'mailto:hello@alexmorgan.dev', label: 'Email' },
]

const contactItems = [
  { icon: 'ph-envelope', text: 'hello@alexmorgan.dev', isLink: true, href: 'mailto:hello@alexmorgan.dev' },
  { icon: 'ph-map-pin', text: 'San Francisco, CA', isLink: false },
  { icon: 'ph-clock', text: 'Response time: ~24 hours', isLink: false },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const infoCardRef = useRef<HTMLDivElement>(null)

  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormState('error')
      setTimeout(() => setFormState('idle'), 3000)
      return
    }
    setFormState('loading')
    setTimeout(() => {
      setFormState('success')
      setTimeout(() => {
        setFormState('idle')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    }, 1500)
  }

  const buttonConfig = {
    idle: { text: 'Send Message', className: 'bg-blue hover:bg-cream hover:text-bg' },
    loading: { text: 'Sending...', className: 'bg-blue opacity-80' },
    success: { text: 'Message Sent! ✓', className: 'bg-green-500' },
    error: { text: 'Please fill all fields', className: 'bg-red-500' },
  }

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

      gsap.fromTo(formCardRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      gsap.fromTo(infoCardRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )

      // Form fields stagger
      const fields = formCardRef.current?.querySelectorAll('.floating-label-group')
      if (fields) {
        gsap.fromTo(fields,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.3,
            scrollTrigger: { trigger: formCardRef.current, start: 'top 80%' }
          }
        )
      }

      // Contact items stagger
      const items = infoCardRef.current?.querySelectorAll('.contact-item')
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.4,
            scrollTrigger: { trigger: infoCardRef.current, start: 'top 80%' }
          }
        )
      }

      // Availability badge
      const badge = infoCardRef.current?.querySelector('.availability-badge')
      if (badge) {
        gsap.fromTo(badge,
          { scale: 0 },
          {
            scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.8,
            scrollTrigger: { trigger: infoCardRef.current, start: 'top 80%' }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-[100px] md:py-[175px] px-[5vw]">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="section-label mb-4">07 / CONTACT</div>
          <h2 className="font-sans font-medium text-[40px] md:text-[56px] text-cream">Let's Build Something</h2>
          <p className="font-sans font-light text-lg mt-4 max-w-[500px] mx-auto" style={{ color: 'rgba(244, 238, 232, 0.5)' }}>
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 md:gap-12">
          {/* Contact Form */}
          <div ref={formCardRef} className="glass-card p-8 md:p-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="floating-label-group">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <label>Your Name</label>
              </div>

              <div className="floating-label-group">
                <input
                  type="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <label>your@email.com</label>
              </div>

              <div className="floating-label-group">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
                <label>Project Inquiry</label>
              </div>

              <div className="floating-label-group">
                <textarea
                  rows={5}
                  placeholder=" "
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <label>Tell me about your project...</label>
              </div>

              <button
                type="submit"
                disabled={formState === 'loading'}
                className={`w-full font-sans font-semibold text-base uppercase tracking-[1px] py-4 rounded-xl transition-all duration-300 ${buttonConfig[formState].className} text-cream`}
              >
                {formState === 'loading' && (
                  <i className="ph ph-spinner animate-spin mr-2" />
                )}
                {buttonConfig[formState].text}
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div
            ref={infoCardRef}
            className="glass-card p-8 md:p-12"
            style={{ background: 'rgba(59, 81, 255, 0.05)' }}
          >
            <h3 className="font-sans font-semibold text-[22px] text-cream">Get in Touch</h3>
            <p className="font-sans font-light text-[15px] leading-[1.6] mt-3" style={{ color: 'rgba(244, 238, 232, 0.65)' }}>
              I'm currently available for freelance projects and full-time opportunities. Let's discuss how I can help bring your ideas to life.
            </p>

            {/* Contact Items */}
            <div className="flex flex-col gap-5 mt-8">
              {contactItems.map((item) => (
                <div key={item.text} className="contact-item flex items-center gap-4">
                  <i className={`ph ${item.icon} text-2xl text-blue`} />
                  {item.isLink ? (
                    <a href={item.href} className="font-sans font-normal text-[15px] text-cream hover:text-blue transition-colors duration-300">
                      {item.text}
                    </a>
                  ) : (
                    <span className="font-sans font-normal text-[15px]" style={{ color: item.text.includes('Response') ? 'rgba(244, 238, 232, 0.65)' : '#F4EEE8' }}>
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full h-[1px] my-8" style={{ background: 'rgba(244, 238, 232, 0.08)' }} />

            {/* Social Links */}
            <h4 className="font-sans font-semibold text-base text-cream">Follow Me</h4>
            <div className="flex items-center gap-4 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-blue hover:bg-[rgba(59,81,255,0.1)] group"
                  style={{ borderColor: 'rgba(244, 238, 232, 0.15)' }}
                >
                  <i className={`ph ${link.icon} text-lg transition-colors duration-300 group-hover:text-blue`} style={{ color: 'rgba(244, 238, 232, 0.7)' }} />
                </a>
              ))}
            </div>

            {/* Availability Badge */}
            <div className="availability-badge inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
              <span className="font-sans font-normal text-[13px] text-green-500">Available for new projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
