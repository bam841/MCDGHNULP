import React, { useState, useEffect } from 'react';
import { Images, ChevronLeft, ChevronRight, X, Maximize2, Grid, MoveHorizontal } from 'lucide-react';

const galleryImages = [
  { id: 1, title: 'Photo 1c — Clinical Duty Group', category: 'Clinical Duty', src: '/assets/gallery/1c.jpg', caption: 'MedTech Batch Alpha interns during laboratory clinical duty rotation (1c).' },
  { id: 2, title: 'Photo 2c — Laboratory Practice', category: 'Laboratory', src: '/assets/gallery/2c.jpg', caption: 'Diagnostic microscopic specimen analysis and laboratory practice (2c).' },
  { id: 4, title: 'Photo 4c — Serology & Blood Bank', category: 'Laboratory', src: '/assets/gallery/4c.jpg', caption: 'ABO/Rh blood typing and donor antibody screening (4c).' },
  { id: 6, title: 'Photo 6c — Hospital Orientation', category: 'Batch Events', src: '/assets/gallery/6c.jpg', caption: 'Partner hospital clinical internship orientation day (6c).' },
  { id: 7, title: 'Photo 7c — Microscopic Smear', category: 'Laboratory', src: '/assets/gallery/7c.jpg', caption: 'Oil-immersion blood film cellular morphology review (7c).' },
  { id: 10, title: 'Photo 10c — Duty Milestone', category: 'Batch Events', src: '/assets/gallery/10c.jpg', caption: 'Senior interns celebrating clinical duty milestones (10c).' },
  { id: 11, title: 'Photo 11c — Landing Showcase', category: 'Batch Events', src: '/assets/gallery/11c.jpg', caption: 'Official BATCH NU-LIPA ALPHA featured cover highlight (11c).' },
  { id: 12, title: 'Photo 12c — Internship Orientation', category: 'Batch Events', src: '/assets/gallery/12c.jpg', caption: 'Official clinical internship orientation showcase (12c).' },
  { id: 13, title: 'Photo 13c — President Portrait', category: 'Clinical Duty', src: '/assets/gallery/13c.jpg', caption: 'Class President in official clinical internship attire (13c).' },
  { id: 15, title: 'Photo 15c — Secretary Portrait', category: 'Clinical Duty', src: '/assets/gallery/15c.jpg', caption: 'Secretary in medical laboratory rotation (15c).' },
  { id: 16, title: 'Photo 16c — Assistant Secretary Portrait', category: 'Clinical Duty', src: '/assets/gallery/16c.jpg', caption: 'Assistant Secretary fulfilling clinical duty rotation (16c).' },
  { id: 17, title: 'Photo 17c — Treasurer Portrait', category: 'Clinical Duty', src: '/assets/gallery/17c.jpg', caption: 'Treasurer in medical laboratory diagnostic setting (17c).' },
  { id: 18, title: 'Photo 18c — Auditor Portrait', category: 'Clinical Duty', src: '/assets/gallery/18c.jpg', caption: 'Auditor in clinical laboratory duty rotation (18c).' },
  { id: 19, title: 'Photo 19c — Main PIO Portrait', category: 'Batch Events', src: '/assets/gallery/19c.jpg', caption: 'Public Information Officer clinical batch update (19c).' },
  { id: 20, title: 'Photo 20c — PIO 2 Portrait', category: 'Batch Events', src: '/assets/gallery/20c.jpg', caption: 'Media & communications intern team coordinator (20c).' }
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sliderIndex, setSliderIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  // Touch & Mouse Drag Swipe State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const categories = ['All', 'Clinical Duty', 'Laboratory', 'Batch Events'];

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  // Ensure sliderIndex stays within bounds when category changes
  useEffect(() => {
    setSliderIndex(0);
  }, [activeCategory]);

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

      {/* THUMBNAIL STRIP GRID */}
      <div className="gallery-grid-title">
        <h3><Grid size={18} /> All {filteredImages.length} Photo Cards</h3>
      </div>

      <div className="gallery-grid">
        {filteredImages.map((img, idx) => (
          <div 
            key={img.id} 
            className={`gallery-grid-item ${idx === sliderIndex ? 'active-thumb' : ''}`}
            onClick={() => {
              setSliderIndex(idx);
              setLightboxIndex(idx);
            }}
          >
            <img 
              src={img.src} 
              alt={img.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/cover_landing_page.jpeg";
              }} 
            />
            <div className="grid-item-overlay">
              <span className="grid-item-category">{img.title}</span>
              <Maximize2 size={18} color="#ffd700" />
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
