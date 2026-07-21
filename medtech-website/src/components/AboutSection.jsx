import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Droplet, TestTube, Dna, Syringe, Eye, Bug, Microscope, ShieldCheck, Binary, Award, Users, HeartPulse, Building2, Sparkles, GraduationCap, Compass, X, Heart } from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const carouselData = [
  {
    id: 1,
    badge: 'Clinical Microscopy & Hematology',
    title: 'High-Power Microscopic Analysis',
    description: 'Batch Alpha interns perform oil-immersion differential white blood cell counts, identifying abnormal cell morphologies and diagnostic parameters under precision microscopes.',
    quote: '"Behind every slide is a real patient waiting for an accurate diagnostic answer."',
    image: '/assets/gallery/1c.jpg'
  },
  {
    id: 2,
    badge: 'Automated Clinical Instrumentation',
    title: 'Complete Blood Count Calibration',
    description: 'Hands-on experience with modern flow-cytometry automated analyzers, running daily quality control samples, and verifying blood cell parameters before releasing hospital results.',
    quote: '"Quality control is the heartbeat of precise medical laboratory diagnostics."',
    image: '/assets/gallery/2c.jpg'
  },
  {
    id: 3,
    badge: 'Blood Bank & Immunohematology',
    title: 'ABO/Rh Blood Typing & Crossmatching',
    description: 'Critical clinical duty hours spent verifying donor blood compatibility, checking anti-globulin reactions, and safeguarding emergency blood transfusions for patients.',
    quote: '"Safe blood transfusions save lives — zero error margin allowed."',
    image: '/assets/gallery/4c.jpg'
  },
  {
    id: 4,
    badge: 'Hospital Internship Orientation',
    title: 'Clinical Rotation Orientation Day',
    description: 'Batch Alpha interns undergoing hospital policy orientation, infection control protocol training, and clinical laboratory safety guidelines.',
    quote: '"Preparation and discipline form the foundation of clinical excellence."',
    image: '/assets/gallery/6c.jpg'
  },
  {
    id: 5,
    badge: 'Diagnostic Hematology Smears',
    title: 'Oil-Immersion Cellular Morphology',
    description: 'Detailed evaluation of peripheral blood smears, erythrocyte indices, thrombocyte estimation, and pathologic leukocyte classification.',
    quote: '"Precision vision under 100x magnification."',
    image: '/assets/gallery/7c.jpg'
  },
  {
    id: 6,
    badge: 'Duty Milestone Celebration',
    title: 'Senior Clinical Intern Milestones',
    description: 'Commemorating successful completion of major clinical laboratory rotation blocks and hospital duty shifts.',
    quote: '"Every shift completed brings us closer to becoming registered Medical Technologists."',
    image: '/assets/gallery/10c.jpg'
  },
  {
    id: 7,
    badge: 'Batch Alpha Showcase',
    title: 'Official Internship Class Highlight',
    description: 'Featured gallery showcase of National University Lipa senior MedTech interns in full clinical duty uniform.',
    quote: '"United in purpose, dedicated to clinical precision."',
    image: '/assets/gallery/11c.jpg'
  },
  {
    id: 8,
    badge: 'Clinical Duty Rotation',
    title: 'Hospital Laboratory Operations',
    description: 'Senior interns participating in routine morning specimen processing, centrifuging blood tubes, and preparing analyzer racks.',
    quote: '"Accuracy in pre-analytical specimen preparation guarantees accurate diagnostic results."',
    image: '/assets/gallery/12c.jpg'
  },
  {
    id: 9,
    badge: 'Clinical Leadership',
    title: 'Class President Duty Rotation',
    description: 'Class President fulfilling hospital duty rotation in clinical microscopy and automated chemistry sections.',
    quote: '"Leading by example on the hospital laboratory floor."',
    image: '/assets/gallery/13c.jpg'
  },
  {
    id: 10,
    badge: 'Clinical Laboratory Operations',
    title: 'Secretary Duty Rotation',
    description: 'Class Secretary engaged in clinical serology and diagnostic assay validation.',
    quote: '"Rigorous attention to detail in every diagnostic run."',
    image: '/assets/gallery/15c.jpg'
  },
  {
    id: 11,
    badge: 'Hospital Rotation Duties',
    title: 'Assistant Secretary Rotation',
    description: 'Fulfilling histopathology specimen staining and slide mounting procedures.',
    quote: '"Cellular diagnosis requires patience and meticulous staining techniques."',
    image: '/assets/gallery/16c.jpg'
  },
  {
    id: 12,
    badge: 'Clinical Diagnostics',
    title: 'Treasurer Clinical Duty',
    description: 'Treasurer performing clinical chemistry spectrophotometric analysis and calibration.',
    quote: '"Delivering reliable results for patient health management."',
    image: '/assets/gallery/17c.jpg'
  }
];

const labSectionsData = [
  { 
    id: 1, 
    name: 'Hematology', 
    icon: Droplet, 
    desc: 'Analysis of blood cellular components, coagulation profiles, hemoglobinopathies, and blood cell morphologies under 100x oil-immersion.',
    quote: '"Behind every differential count is a patient waiting for diagnostic clarity."',
    image: '/assets/gallery/1c.jpg'
  },
  { 
    id: 2, 
    name: 'Clinical Chemistry', 
    icon: TestTube, 
    desc: 'Quantitative spectrophotometric analysis of blood glucose, electrolytes, lipid profiles, and cardiac enzyme markers.',
    quote: '"Precision chemistry calibration guarantees reliable treatment management."',
    image: '/assets/gallery/2c.jpg'
  },
  { 
    id: 3, 
    name: 'Microbiology', 
    icon: Dna, 
    desc: 'Isolation, Gram staining, biochemical identification, and antimicrobial susceptibility testing of bacterial pathogens.',
    quote: '"Targeting microbial pathogens to guide antibiotic therapy."',
    image: '/assets/gallery/6c.jpg'
  },
  { 
    id: 4, 
    name: 'Blood Bank / Immunohematology', 
    icon: Syringe, 
    desc: 'Blood donor screening, ABO/Rh typing, antibody identification, and emergency compatibility crossmatching.',
    quote: '"Safe blood transfusions save lives — zero error margin allowed."',
    image: '/assets/gallery/4c.jpg'
  },
  { 
    id: 5, 
    name: 'Clinical Microscopy', 
    icon: Eye, 
    desc: 'Routine urinalysis, physical and chemical reagent strip testing, microscopic urinary sediment examination, and renal function parameters.',
    quote: '"Microscopic sediment analysis reveals early metabolic & renal signals."',
    image: '/assets/gallery/7c.jpg'
  },
  { 
    id: 6, 
    name: 'Phlebotomy', 
    icon: Droplet, 
    desc: 'Patient preparation, venipuncture, capillary blood collection techniques, anti-coagulant tube sequencing, and proper specimen handling.',
    quote: '"Gentle hands and precise technique ensure pre-analytical quality."',
    image: '/assets/gallery/12c.jpg'
  },
  { 
    id: 7, 
    name: 'Histopathology & Cytology', 
    icon: Microscope, 
    desc: 'Tissue processing, H&E paraffin section staining, frozen biopsy analysis, and Papanicolaou cytodiagnostics.',
    quote: '"Meticulous staining reveals cellular diagnostic answers."',
    image: '/assets/gallery/16c.jpg'
  },
  { 
    id: 8, 
    name: 'Immunology & Serology', 
    icon: ShieldCheck, 
    desc: 'Serum antibody-antigen reaction testing, autoimmune disease screening, syphilis, and viral hepatitis assays.',
    quote: '"Uncovering immune system responses for targeted patient care."',
    image: '/assets/gallery/15c.jpg'
  },
  { 
    id: 9, 
    name: 'Laboratory Management', 
    icon: ShieldCheck, 
    desc: 'Quality assurance systems, laboratory operations, biosafety protocols, inventory control, and administrative workflows.',
    quote: '"Leadership and biosafety standards uphold hospital laboratory integrity."',
    image: '/assets/gallery/10c.jpg'
  }
];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Instagram Instant Story Viewer Modal States
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [storyLiked, setStoryLiked] = useState({});
  
  const stickyWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const narrativeRef = useRef(null);
  const rotationTrackRef = useRef(null);
  const [isNarrativeInView, setIsNarrativeInView] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [wrapperHeightPx, setWrapperHeightPx] = useState(null);

  // Auto-advance Instagram Story Viewer
  useEffect(() => {
    if (activeStoryIndex === null) return;
    const timer = setTimeout(() => {
      setActiveStoryIndex((prev) => (prev + 1) % labSectionsData.length);
    }, 5500);
    return () => clearTimeout(timer);
  }, [activeStoryIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNarrativeInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (narrativeRef.current) {
      observer.observe(narrativeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const updateWrapperHeight = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const maxTranslate = Math.max(0, trackWidth - windowWidth + 120);
        const calculatedHeight = Math.max(windowHeight * 4, windowHeight + maxTranslate + 500);
        setWrapperHeightPx(calculatedHeight);
      }
    };

    updateWrapperHeight();
    window.addEventListener('resize', updateWrapperHeight);
    const timer = setTimeout(updateWrapperHeight, 300);

    return () => {
      window.removeEventListener('resize', updateWrapperHeight);
      clearTimeout(timer);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
  };

  const currentSlide = carouselData[currentIndex];

  const scrollRotations = (direction) => {
    if (rotationTrackRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      rotationTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openStoryModal = (index) => {
    setActiveStoryIndex(index);
  };

  const closeStoryModal = () => {
    setActiveStoryIndex(null);
  };

  const nextStory = (e) => {
    e?.stopPropagation();
    setActiveStoryIndex((prev) => (prev + 1) % labSectionsData.length);
  };

  const prevStory = (e) => {
    e?.stopPropagation();
    setActiveStoryIndex((prev) => (prev - 1 + labSectionsData.length) % labSectionsData.length);
  };

  const toggleLike = (e, id) => {
    e?.stopPropagation();
    setStoryLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--spotlight-x', `${x}%`);
    card.style.setProperty('--spotlight-y', `${y}%`);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--spotlight-x', `${x}%`);
      card.style.setProperty('--spotlight-y', `${y}%`);
    }
  };

  return (
    <section className="page-section">
      {/* SECTION HEADER & ABOUT NARRATIVE */}
      <div className="section-header">
        <span className="section-tag">Pioneering Batch Story</span>
        <h2 className="section-title">About NU–Lipa Alpha Interns</h2>
        <p className="section-subtitle">
          Paving the way as the inaugural clinical laboratory internship class at Mount Carmel Diocesan General Hospital.
        </p>
      </div>

      {/* ANIMATED NARRATIVE STORY SHOWCASE WITH ROAMING SPOTLIGHT */}
      <div 
        className={`narrative-story-container ${isNarrativeInView ? 'in-view' : ''}`}
        ref={narrativeRef}
      >
        {/* Story Card 1: The Pioneering Legacy */}
        <div 
          className="narrative-card card-pioneer"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <div className="roaming-spotlight-beam" aria-hidden="true"></div>
          <div className="narrative-card-glow" aria-hidden="true"></div>
          <div className="narrative-header-row">
            <div className="narrative-icon-badge">
              <Building2 size={22} className="pulse-story-icon" />
            </div>
            <span className="narrative-badge-tag">PIONEERING INTERNSHIP CLASS</span>
          </div>
          <p className="narrative-paragraph">
            We are the <strong className="gold-sparkle-text">NU–Lipa Alpha Interns</strong>, the pioneering group of interns from <strong>National University–Lipa</strong> assigned to <strong className="gold-sparkle-text">Mount Carmel Diocesan General Hospital</strong>. As the first batch from our institution to complete our internship at this hospital, we proudly carry the title <span className="title-quote-badge">"Alpha Interns,"</span> symbolizing leadership, resilience, and the beginning of a meaningful partnership between our school and the institution.
          </p>
        </div>

        {/* Story Card 2: Team Composition & Unity */}
        <div 
          className="narrative-card card-team"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <div className="roaming-spotlight-beam" aria-hidden="true"></div>
          <div className="narrative-card-glow" aria-hidden="true"></div>
          <div className="narrative-header-row">
            <div className="narrative-icon-badge cyan-badge">
              <Users size={22} className="pulse-story-icon" />
            </div>
            <span className="narrative-badge-tag cyan-tag">10 DEDICATED CLINICAL INTERNS</span>
          </div>
          
          <div className="team-metrics-grid">
            <div className="team-metric-pill">
              <span className="metric-num">10</span>
              <span className="metric-label">Total Interns</span>
            </div>
            <div className="team-metric-pill">
              <span className="metric-num female">6</span>
              <span className="metric-label">Women Leaders</span>
            </div>
            <div className="team-metric-pill">
              <span className="metric-num male">4</span>
              <span className="metric-label">Men Leaders</span>
            </div>
          </div>

          <p className="narrative-paragraph">
            Our team is composed of <strong>10 dedicated interns</strong>—<strong>6 women and 4 men</strong>—who bring diverse strengths, perspectives, and talents to patient care and clinical practice. Despite our different backgrounds and personalities, we are united by a shared commitment to learning, collaboration, and compassionate healthcare. Through teamwork, dedication, and professionalism, we strive to grow into competent and ethical healthcare professionals.
          </p>
        </div>

        {/* Story Card 3: Legacy of Excellence */}
        <div 
          className="narrative-card card-legacy"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <div className="roaming-spotlight-beam" aria-hidden="true"></div>
          <div className="narrative-card-glow" aria-hidden="true"></div>
          <div className="narrative-header-row">
            <div className="narrative-icon-badge amber-badge">
              <Compass size={22} className="pulse-story-icon" />
            </div>
            <span className="narrative-badge-tag amber-tag">PAVING THE WAY</span>
          </div>
          <p className="narrative-paragraph">
            As the first NU–Lipa interns to train at <strong className="gold-sparkle-text">Mount Carmel Diocesan General Hospital</strong>, we are honored to pave the way for future batches. We aspire to leave a lasting legacy of <strong className="gold-sparkle-text">excellence, integrity, and service</strong> while making a positive impact on the patients, hospital staff, and communities we serve.
          </p>
        </div>
      </div>

      <div className="section-header" style={{ marginTop: '4rem' }}>
        <span className="section-tag">Clinical Experiences</span>
        <h2 className="section-title">Life On Duty — BATCH NU-LIPA ALPHA</h2>
        <p className="section-subtitle">
          Step inside 1,664 clinical duty hours across 9 major laboratory sections, specimen analyses, and hospital internship moments of NU-LIPA MedTech students.
        </p>
      </div>

      {/* PHOTO CAROUSEL */}
      <div 
        className="carousel-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button className="carousel-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>

        <button className="carousel-nav-btn next-btn" onClick={handleNext} aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        <div className="carousel-container">
          <div className="carousel-slide">
            <div className="slide-image-box">
              <img 
                src={currentSlide.image} 
                alt={currentSlide.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/cover_landing_page.jpeg";
                }}
              />
            </div>
            <div className="slide-content">
              <span className="duty-dept-badge">{currentSlide.badge}</span>
              <h3 className="slide-title">{currentSlide.title}</h3>
              <p className="slide-description">{currentSlide.description}</p>
              <blockquote className="slide-quote">{currentSlide.quote}</blockquote>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {carouselData.map((_, idx) => (
            <button 
              key={idx}
              className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 9 Clinical Laboratory Rotations Showcase Section - Horizontal Swipe Slider */}
      <div id="rotations" className="rotations-showcase-wrapper" style={{ marginTop: '4rem' }}>
        <div className="section-header">
          <span className="section-tag">9 Clinical Rotations</span>
          <h2 className="section-title">Major Laboratory Rotations</h2>
          <p className="section-subtitle">
            Swipe left or right to explore all 9 specialized laboratory rotations at <strong>Mount Carmel Diocesan General Hospital</strong>.
          </p>
        </div>

        {/* HORIZONTAL SWIPE CAROUSEL */}
        <div className="rotations-swipe-wrapper">
          <button 
            className="rotations-scroll-btn prev" 
            onClick={() => scrollRotations('left')}
            aria-label="Swipe Left"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            className="rotations-scroll-btn next" 
            onClick={() => scrollRotations('right')}
            aria-label="Swipe Right"
          >
            <ChevronRight size={24} />
          </button>

          <div className="rotations-swipe-track" ref={rotationTrackRef}>
            {labSectionsData.map((sec) => {
              const IconComp = sec.icon;
              return (
                <div className="rotation-swipe-card" key={sec.id}>
                  <div className="rotation-card-glow" aria-hidden="true"></div>
                  <div className="rotation-card-header">
                    <span className="rotation-badge">SECTION 0{sec.id} / 09</span>
                    <div className="rotation-icon-wrapper">
                      <IconComp size={24} className="rotation-icon" />
                    </div>
                  </div>
                  <h3 className="rotation-title">{sec.name}</h3>
                  <p className="rotation-desc">{sec.desc}</p>

                  <div className="rotation-card-footer">
                    <span className="rotation-hospital-tag">
                      <Building2 size={13} /> Mount Carmel Diocesan General Hospital
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rotations-swipe-hint">
            <span>SWIPE CARDS LEFT OR RIGHT TO EXPLORE</span>
          </div>
        </div>
      </div>

      {/* FULLSCREEN INSTAGRAM INSTANT STORY VIEWER MODAL */}
      {activeStoryIndex !== null && (
        <div className="ig-story-modal-overlay" onClick={closeStoryModal}>
          <div className="ig-story-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Top Segmented Progress Bars */}
            <div className="ig-story-progress-bar-row">
              {labSectionsData.map((sec, idx) => (
                <div key={sec.id} className="ig-story-progress-segment">
                  <div 
                    className={`ig-story-progress-fill ${
                      idx < activeStoryIndex ? 'completed' : idx === activeStoryIndex ? 'active' : ''
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Instagram Story Header */}
            <div className="ig-story-header">
              <div className="ig-story-user-info">
                <div className="ig-story-avatar-small">
                  <Microscope size={18} color="#ffd700" />
                </div>
                <div className="ig-story-user-text">
                  <span className="ig-story-username">nulipa.alpha_interns</span>
                  <span className="ig-story-location">Mount Carmel Hospital • SECTION 0{labSectionsData[activeStoryIndex].id}/09</span>
                </div>
              </div>
              <button className="ig-story-close-btn" onClick={closeStoryModal} aria-label="Close Story">
                <X size={22} />
              </button>
            </div>

            {/* Story Image Canvas & Touch Controls */}
            <div className="ig-story-media-box">
              <img 
                src={labSectionsData[activeStoryIndex].image} 
                alt={labSectionsData[activeStoryIndex].name}
                className="ig-story-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/cover_landing_page.jpeg";
                }}
              />

              {/* Touch Side Navigators */}
              <div className="ig-story-touch-left" onClick={prevStory} title="Previous Story"></div>
              <div className="ig-story-touch-right" onClick={nextStory} title="Next Story"></div>

              {/* Story Overlay Caption */}
              <div className="ig-story-caption-overlay">
                <span className="ig-story-dept-badge">
                  ROTATION 0{labSectionsData[activeStoryIndex].id} / 09 • {labSectionsData[activeStoryIndex].name.toUpperCase()}
                </span>
                <h3 className="ig-story-dept-name">{labSectionsData[activeStoryIndex].name}</h3>
                <p className="ig-story-desc">{labSectionsData[activeStoryIndex].desc}</p>
                <blockquote className="ig-story-quote">{labSectionsData[activeStoryIndex].quote}</blockquote>
              </div>
            </div>

            {/* Story Footer Actions */}
            <div className="ig-story-footer">
              <button 
                className={`ig-story-like-btn ${storyLiked[labSectionsData[activeStoryIndex].id] ? 'liked' : ''}`}
                onClick={(e) => toggleLike(e, labSectionsData[activeStoryIndex].id)}
              >
                <Heart 
                  size={20} 
                  fill={storyLiked[labSectionsData[activeStoryIndex].id] ? "#ef4444" : "none"} 
                  color={storyLiked[labSectionsData[activeStoryIndex].id] ? "#ef4444" : "#ffffff"} 
                />
                <span>{storyLiked[labSectionsData[activeStoryIndex].id] ? 'Liked!' : 'Send Reaction'}</span>
              </button>

              <span className="ig-story-hospital-tag">
                <Building2 size={13} /> Mount Carmel Diocesan General Hospital
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
