import React, { useEffect, useRef } from 'react';

const WORDS = [
  'Integrity',
  'Compassion',
  'Innovation',
  'Resilience',
  'Patriotism'
];

export default function TextMarqueeSection() {
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  
  const pos1Ref = useRef(0);
  const pos2Ref = useRef(0);
  
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      scrollVelocityRef.current += delta * 0.15;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const baseSpeed = 1.2;

    const animate = () => {
      scrollVelocityRef.current *= 0.92;

      const speed = isHoveredRef.current 
        ? 0.3 
        : baseSpeed + scrollVelocityRef.current;

      // Track 1: Move Left
      if (track1Ref.current) {
        pos1Ref.current -= speed;
        const width1 = track1Ref.current.scrollWidth / 2;
        if (width1 > 0) {
          if (pos1Ref.current <= -width1) {
            pos1Ref.current += width1;
          } else if (pos1Ref.current > 0) {
            pos1Ref.current -= width1;
          }
          track1Ref.current.style.transform = `translate3d(${pos1Ref.current}px, 0, 0)`;
        }
      }

      // Track 2: Move Right
      if (track2Ref.current) {
        pos2Ref.current += speed * 0.9;
        const width2 = track2Ref.current.scrollWidth / 2;
        if (width2 > 0) {
          if (pos2Ref.current >= 0) {
            pos2Ref.current -= width2;
          } else if (pos2Ref.current < -width2) {
            pos2Ref.current += width2;
          }
          track2Ref.current.style.transform = `translate3d(${pos2Ref.current}px, 0, 0)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const row1Items = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  const row2Items = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  return (
    <section className="marquee-section-wrapper" aria-label="Core Values Marquee">
      <div className="marquee-header-label">
        <span className="label-line"></span>
        <span className="label-text">CORE VALUES / BATCH NU-LIPA ALPHA</span>
        <span className="label-line"></span>
      </div>
      
      {/* Row 1: Forward Loop */}
      <div 
        className="marquee-container"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        <div className="marquee-track" ref={track1Ref}>
          {row1Items.map((word, idx) => {
            const isOutline = idx % 2 === 1;
            return (
              <React.Fragment key={`r1-${idx}`}>
                <span className={`marquee-word ${isOutline ? 'word-outline' : 'word-solid'}`}>
                  {word}
                </span>
                <span className="marquee-divider font-slash">/</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Row 2: Reverse Loop */}
      <div 
        className="marquee-container marquee-reverse"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        <div className="marquee-track" ref={track2Ref}>
          {row2Items.map((word, idx) => {
            const isOutline = idx % 2 === 0;
            return (
              <React.Fragment key={`r2-${idx}`}>
                <span className={`marquee-word ${isOutline ? 'word-outline' : 'word-solid'}`}>
                  {word}
                </span>
                <span className="marquee-divider font-slash">/</span>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
