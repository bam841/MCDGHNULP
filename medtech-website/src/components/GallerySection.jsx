import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Images, ChevronLeft, ChevronRight, X, Maximize2, Grid, MoveHorizontal, PartyPopper } from 'lucide-react';

const galleryImages = [
  // --- Original images with orientation ---
  { id: 1, title: 'Photo 1 — Batch Group Shot', category: 'Batch Events', src: '/assets/gallery/1.jpg', caption: 'Batch Alpha group photo capturing the full intern cohort together.', orientation: 'portrait' },
  { id: 2, title: 'Photo 1c — Clinical Duty Group', category: 'Clinical Duty', src: '/assets/gallery/1c.jpg', caption: 'MedTech Batch Alpha interns during laboratory clinical duty rotation (1c).', orientation: 'portrait' },
  { id: 3, title: 'Photo 2 — Clinical Rotation Highlights', category: 'Clinical Duty', src: '/assets/gallery/2.jpg', caption: 'Interns during hands-on clinical rotation at the partner hospital.', orientation: 'portrait' },
  { id: 4, title: 'Photo 2c — Laboratory Practice', category: 'Laboratory', src: '/assets/gallery/2c.jpg', caption: 'Diagnostic microscopic specimen analysis and laboratory practice (2c).', orientation: 'landscape' },
  { id: 5, title: 'Photo 3 — Lab Session Group', category: 'Laboratory', src: '/assets/gallery/3.jpg', caption: 'Batch Alpha lab session — practical diagnostics and teamwork.', orientation: 'portrait' },
  { id: 6, title: 'Photo 4 — Duty Day Candid', category: 'Clinical Duty', src: '/assets/gallery/4.jpg', caption: 'Candid moment captured during a busy clinical duty day.', orientation: 'portrait' },
  { id: 7, title: 'Photo 4c — Serology & Blood Bank', category: 'Laboratory', src: '/assets/gallery/4c.jpg', caption: 'ABO/Rh blood typing and donor antibody screening (4c).', orientation: 'portrait' },
  { id: 8, title: 'Photo 5 — Batch Bonding', category: 'Batch Events', src: '/assets/gallery/5.jpg', caption: 'Off-duty batch bonding and camaraderie among interns.', orientation: 'portrait' },
  { id: 9, title: 'Photo 6 — Hospital Visit', category: 'Clinical Duty', src: '/assets/gallery/6.jpg', caption: 'Interns on-site at the partner hospital for clinical exposure.', orientation: 'portrait' },
  { id: 10, title: 'Photo 6c — Hospital Orientation', category: 'Batch Events', src: '/assets/gallery/6c.jpg', caption: 'Partner hospital clinical internship orientation day (6c).', orientation: 'landscape' },
  { id: 11, title: 'Photo 7 — Laboratory Workbench', category: 'Laboratory', src: '/assets/gallery/7.jpg', caption: 'Interns at the laboratory workbench performing diagnostic procedures.', orientation: 'portrait' },
  { id: 12, title: 'Photo 7c — Microscopic Smear', category: 'Laboratory', src: '/assets/gallery/7c.jpg', caption: 'Oil-immersion blood film cellular morphology review (7c).', orientation: 'landscape' },

  { id: 14, title: 'Photo 8c — Clinical Chemistry Portrait', category: 'Clinical Duty', src: '/assets/gallery/8c.jpg', caption: 'Intern in clinical chemistry section during duty rotation (8c).', orientation: 'portrait' },
  { id: 15, title: 'Photo 10c — Duty Milestone', category: 'Batch Events', src: '/assets/gallery/10c.jpg', caption: 'Senior interns celebrating clinical duty milestones (10c).', orientation: 'landscape' },
  { id: 16, title: 'Photo 11c — Landing Showcase', category: 'Batch Events', src: '/assets/gallery/11c.jpg', caption: 'Official BATCH NU-LIPA ALPHA featured cover highlight (11c).', orientation: 'portrait' },
  { id: 17, title: 'Photo 12c — Internship Orientation', category: 'Batch Events', src: '/assets/gallery/12c.jpg', caption: 'Official clinical internship orientation showcase (12c).', orientation: 'portrait' },
  { id: 18, title: 'Photo 13c — President Portrait', category: 'Clinical Duty', src: '/assets/gallery/13c.jpg', caption: 'Class President in official clinical internship attire (13c).', orientation: 'portrait' },
  { id: 19, title: 'Photo 14c — Vice President Portrait', category: 'Clinical Duty', src: '/assets/gallery/14c.jpg', caption: 'Vice President in official clinical internship attire (14c).', orientation: 'landscape' },
  { id: 20, title: 'Photo 15c — Secretary Portrait', category: 'Clinical Duty', src: '/assets/gallery/15c.jpg', caption: 'Secretary in medical laboratory rotation (15c).', orientation: 'portrait' },
  { id: 21, title: 'Photo 16c — Assistant Secretary Portrait', category: 'Clinical Duty', src: '/assets/gallery/16c.jpg', caption: 'Assistant Secretary fulfilling clinical duty rotation (16c).', orientation: 'landscape' },
  { id: 22, title: 'Photo 17c — Treasurer Portrait', category: 'Clinical Duty', src: '/assets/gallery/17c.jpg', caption: 'Treasurer in medical laboratory diagnostic setting (17c).', orientation: 'portrait' },
  { id: 23, title: 'Photo 18c — Auditor Portrait', category: 'Clinical Duty', src: '/assets/gallery/18c.jpg', caption: 'Auditor in clinical laboratory duty rotation (18c).', orientation: 'landscape' },
  { id: 24, title: 'Photo 19c — Main PIO Portrait', category: 'Batch Events', src: '/assets/gallery/19c.jpg', caption: 'Public Information Officer clinical batch update (19c).', orientation: 'portrait' },
  { id: 25, title: 'Photo 20c — PIO 2 Portrait', category: 'Batch Events', src: '/assets/gallery/20c.jpg', caption: 'Media & communications intern team coordinator (20c).', orientation: 'landscape' },

  // --- Newly added images ---
  { id: 26, title: 'New Memory 1 — Candid Moments', category: 'Batch Events', src: '/assets/gallery/newjpeg1.jpeg', caption: 'Candid moments with the batch — unforgettable memories together.', orientation: 'portrait' },
  { id: 27, title: 'New Memory 2 — Batch Bonding', category: 'Batch Events', src: '/assets/gallery/jpag2.jpeg', caption: 'Batch bonding and heartfelt connections captured in the moment.', orientation: 'portrait' },
  { id: 28, title: 'New Memory 3 — Group Panorama', category: 'Batch Events', src: '/assets/gallery/jpeg3_landscape.jpeg', caption: 'Wide-angle group panorama showcasing the full batch gathering.', orientation: 'landscape' },
  { id: 29, title: 'New Memory 4 — Clinical Duty Day', category: 'Clinical Duty', src: '/assets/gallery/jepg4.jpeg', caption: 'Another day on clinical duty — dedication and passion for healthcare.', orientation: 'portrait' },
  { id: 30, title: 'New Memory 5 — Lab Highlights', category: 'Laboratory', src: '/assets/gallery/jpeg5.jpeg', caption: 'Laboratory highlights — hands-on learning and practical diagnostics.', orientation: 'portrait' },
  { id: 31, title: 'New Memory 6 — Team Spirit', category: 'Batch Events', src: '/assets/gallery/jpeg6.jpeg', caption: 'Team spirit and camaraderie shining through in every moment.', orientation: 'portrait' },
  { id: 32, title: 'New Memory 7 — Group Snapshot', category: 'Batch Events', src: '/assets/gallery/jpeg7.jpeg', caption: 'Group snapshot — smiles and memories that will last a lifetime.', orientation: 'square' },
  { id: 33, title: 'New Memory 8 — Clinical Rotation', category: 'Clinical Duty', src: '/assets/gallery/jpeg8.jpeg', caption: 'Clinical rotation candid — learning in the field with passion.', orientation: 'portrait' },
  { id: 34, title: 'New Memory 9 — Batch Landscape', category: 'Batch Events', src: '/assets/gallery/landscapejpeg2.jpg', caption: 'Wide-angle batch group photo — everyone in the frame.', orientation: 'landscape' },
  { id: 35, title: 'New Memory 10 — Team Panorama', category: 'Batch Events', src: '/assets/gallery/landscape4.jpg', caption: 'Full team panorama — batch Alpha celebrating together.', orientation: 'landscape' },
];

/* ─── Confetti / Party Popper Helpers ─── */
function createConfettiPiece(container) {
  const colors = [
    '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#FF69B4', '#00CED1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F0B27A'
  ];
  const shapes = ['circle', 'square', 'strip'];
  const piece = document.createElement('div');
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 10 + 5;
  const startX = Math.random() * 100;
  const drift = (Math.random() - 0.5) * 200;
  const rotation = Math.random() * 720 - 360;
  const duration = Math.random() * 2 + 2.5;
  const delay = Math.random() * 0.8;

  piece.className = 'confetti-piece';
  piece.style.cssText = `
    position: absolute;
    top: -10px;
    left: ${startX}%;
    width: ${shape === 'strip' ? size * 0.4 : size}px;
    height: ${shape === 'strip' ? size * 2.5 : size}px;
    background: ${color};
    border-radius: ${shape === 'circle' ? '50%' : shape === 'strip' ? '2px' : '1px'};
    opacity: 1;
    pointer-events: none;
    z-index: 50;
    animation: confettiFall ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s forwards;
    --drift: ${drift}px;
    --rotation: ${rotation}deg;
  `;
  container.appendChild(piece);
  setTimeout(() => piece.remove(), (duration + delay) * 1000 + 200);
}

function launchConfetti(container, count = 80) {
  for (let i = 0; i < count; i++) {
    createConfettiPiece(container);
  }
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sliderIndex, setSliderIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  
  // Touch & Mouse Drag Swipe State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  // Refs
  const memoriesRef = useRef(null);
  const confettiContainerRef = useRef(null);

  const categories = ['All', 'Clinical Duty', 'Laboratory', 'Batch Events'];

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  // Ensure sliderIndex stays within bounds when category changes
  useEffect(() => {
    setSliderIndex(0);
  }, [activeCategory]);

  // Party Popper Confetti on Scroll into Memories Section
  useEffect(() => {
    if (confettiTriggered) return;
    const target = memoriesRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !confettiTriggered) {
            setConfettiTriggered(true);
            if (confettiContainerRef.current) {
              launchConfetti(confettiContainerRef.current, 90);
              // Second burst after a tiny delay for more drama
              setTimeout(() => {
                if (confettiContainerRef.current) {
                  launchConfetti(confettiContainerRef.current, 50);
                }
              }, 400);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [confettiTriggered]);

  // Keyboard Navigation for Lightbox & Slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
        if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
        if (e.key === 'Escape') setLightboxIndex(null);
      } else {
        if (e.key === 'ArrowRight') setSliderIndex((prev) => (prev + 1) % filteredImages.length);
        if (e.key === 'ArrowLeft') setSliderIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  // Slider Navigation
  const handlePrevSlider = () => {
    setSliderIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleNextSlider = () => {
    setSliderIndex((prev) => (prev + 1) % filteredImages.length);
  };

  // Lightbox Navigation
  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };

  // Universal Touch/Mouse Swipe Handlers
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = (onNext, onPrev) => {
    if (!isDragging) return;
    const diffX = startX - currentX;
    const threshold = 40;
    if (diffX > threshold) {
      onNext();
    } else if (diffX < -threshold) {
      onPrev();
    }
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const currentSlide = filteredImages[sliderIndex] || filteredImages[0];

  return (
    <section className="page-section">
      <div className="section-header">
        <span className="section-tag">Media & Photos</span>
        <h2 className="section-title">BATCH NU-LIPA ALPHA Photo Gallery</h2>
        <p className="section-subtitle">
          Swipe through authentic photos covering clinical duty moments, laboratory rotations, and batch highlights. Tap any photo for fullscreen view.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="gallery-filter-bar">
        <div className="filter-tags">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="gallery-count-badge">
          <Images size={16} /> {filteredImages.length} Authentic Photos
        </div>
      </div>

      {/* MAIN SWIPEABLE PHOTO CAROUSEL */}
      {filteredImages.length > 0 && (
        <div 
          className="gallery-swipe-container"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={() => handleDragEnd(handleNextSlider, handlePrevSlider)}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={() => handleDragEnd(handleNextSlider, handlePrevSlider)}
          onMouseLeave={() => isDragging && handleDragEnd(handleNextSlider, handlePrevSlider)}
        >
          <button 
            className="gallery-arrow prev" 
            onClick={(e) => { e.stopPropagation(); handlePrevSlider(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={26} />
          </button>

          <button 
            className="gallery-arrow next" 
            onClick={(e) => { e.stopPropagation(); handleNextSlider(); }}
            aria-label="Next photo"
          >
            <ChevronRight size={26} />
          </button>

          <div className="gallery-main-slide">
            <div className="gallery-image-wrapper">
              <img 
                src={currentSlide.src} 
                alt={currentSlide.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/cover_landing_page.jpeg";
                }}
              />
              
              <button 
                className="fullscreen-expand-btn"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(sliderIndex); }}
                title="Expand Fullscreen"
              >
                <Maximize2 size={16} /> Fullscreen
              </button>

              <div className="slide-counter-tag">
                {sliderIndex + 1} / {filteredImages.length}
              </div>
            </div>

            <div className="gallery-slide-caption">
              <h3>{currentSlide.title}</h3>
              <p>{currentSlide.caption}</p>
            </div>
          </div>

          {/* Touch Swipe Hint & Dot Indicators */}
          <div className="swipe-hint-bar">
            <div className="dots-row">
              {filteredImages.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot-item ${idx === sliderIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setSliderIndex(idx); }}
                />
              ))}
            </div>
            <span className="hint-text">
              <MoveHorizontal size={14} /> Swipe left or right to switch photos
            </span>
          </div>
        </div>
      )}

      {/* PHOTOBOOTH MEMORY WALL */}
      <div className="gallery-grid-title" ref={memoriesRef}>
        <div className="memories-title-row">
          <PartyPopper size={22} className={`popper-icon left ${confettiTriggered ? 'pop' : ''}`} />
          <h3><Images size={18} /> Our Photobooth Memories</h3>
          <PartyPopper size={22} className={`popper-icon right ${confettiTriggered ? 'pop' : ''}`} />
        </div>
        <p className="photobooth-subtitle">tap a memory to relive the moment</p>
      </div>

      {/* Confetti Container */}
      <div className="confetti-container" ref={confettiContainerRef}></div>

      <div className="photobooth-grid">
        {filteredImages.map((img, idx) => (
          <div 
            key={img.id} 
            className={`photobooth-card ${idx === sliderIndex ? 'active-card' : ''} ${img.orientation === 'landscape' ? 'landscape-card' : ''} ${img.orientation === 'square' ? 'square-card' : ''}`}
            style={{ animationDelay: `${idx * 70}ms` }}
            onClick={() => {
              setSliderIndex(idx);
              setLightboxIndex(idx);
            }}
          >
            <div className="polaroid-tape"></div>
            <div className={`polaroid-photo ${img.orientation === 'landscape' ? 'landscape-photo' : ''} ${img.orientation === 'square' ? 'square-photo' : ''}`}>
              <img 
                src={img.src} 
                alt={img.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/cover_landing_page.jpeg";
                }} 
              />
              <div className="photo-vignette"></div>
              <div className="photo-grain"></div>
              <div className="photo-shine"></div>
            </div>
            <div className="polaroid-caption">
              <span className="caption-text">BATCH ALPHA MOMENTS</span>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div 
          className="lightbox-backdrop"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={() => handleDragEnd(handleNextLightbox, handlePrevLightbox)}
          onClick={() => setLightboxIndex(null)}
        >
          <button 
            className="lightbox-close-btn" 
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="Close Lightbox"
          >
            <X size={26} />
          </button>

          <button 
            className="lightbox-nav-btn prev" 
            onClick={(e) => { e.stopPropagation(); handlePrevLightbox(); }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={30} />
          </button>

          <button 
            className="lightbox-nav-btn next" 
            onClick={(e) => { e.stopPropagation(); handleNextLightbox(); }}
            aria-label="Next Image"
          >
            <ChevronRight size={30} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[lightboxIndex]?.src} 
              alt={filteredImages[lightboxIndex]?.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/cover_landing_page.jpeg";
              }}
            />
            <div className="lightbox-footer">
              <div className="lightbox-info">
                <h4>{filteredImages[lightboxIndex]?.title}</h4>
                <p>{filteredImages[lightboxIndex]?.caption}</p>
              </div>
              <div className="lightbox-counter">
                {lightboxIndex + 1} of {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
