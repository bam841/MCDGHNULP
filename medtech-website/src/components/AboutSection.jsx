import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Droplet, TestTube, Dna, Syringe, Eye, Bug, Microscope, ShieldCheck, Binary } from 'lucide-react';

const carouselData = [
  {
    id: 1,
    badge: 'Clinical Microscopy & Hematology',
    title: 'High-Power Microscopic Analysis',
    description: 'Batch Alpha interns perform oil-immersion differential white blood cell counts, identifying abnormal cell morphologies and diagnostic parameters under precision microscopes.',
    quote: '"Behind every slide is a real patient waiting for an accurate diagnostic answer."',
    image: '/assets/gallery/1.JPG'
  },
  {
    id: 2,
    badge: 'Automated Clinical Instrumentation',
    title: 'Complete Blood Count Calibration',
    description: 'Hands-on experience with modern flow-cytometry automated analyzers, running daily quality control samples, and verifying blood cell parameters before releasing hospital results.',
    quote: '"Quality control is the heartbeat of precise medical laboratory diagnostics."',
    image: '/assets/gallery/3.JPG'
  },
  {
    id: 3,
    badge: 'Blood Bank & Immunohematology',
    title: 'ABO/Rh Blood Typing & Crossmatching',
    description: 'Critical clinical duty hours spent verifying donor blood compatibility, checking anti-globulin reactions, and safeguarding emergency blood transfusions for patients.',
    quote: '"Safe blood transfusions save lives — zero error margin allowed."',
    image: '/assets/interns/president.jpg'
  }
];

const labSectionsData = [
  { id: 1, name: 'Clinical Hematology', icon: Droplet, desc: 'Analysis of blood cellular components, coagulation profiles, hemoglobinopathies, and bone marrow smears.' },
  { id: 2, name: 'Clinical Chemistry', icon: TestTube, desc: 'Quantitative spectrophotometric analysis of blood glucose, electrolytes, lipid profiles, and cardiac enzyme markers.' },
  { id: 3, name: 'Clinical Microbiology', icon: Dna, desc: 'Isolation, Gram staining, biochemical identification, and antimicrobial susceptibility testing of bacterial pathogens.' },
  { id: 4, name: 'Blood Bank / Immunohematology', icon: Syringe, desc: 'Blood donor screening, ABO/Rh typing, antibody identification, and emergency compatibility crossmatching.' },
  { id: 5, name: 'Clinical Microscopy & Urinalysis', icon: Eye, desc: 'Physical, chemical, and microscopic urinary sediment analysis, urine protein profiling, and renal function screening.' },
  { id: 6, name: 'Parasitology', icon: Bug, desc: 'Identification of intestinal and blood parasites, ova, protozoans, and microscopic parasite morphology.' },
  { id: 7, name: 'Histopathology & Cytology', icon: Microscope, desc: 'Tissue processing, H&E paraffin section staining, frozen biopsy analysis, and Papanicolaou cytodiagnostics.' },
  { id: 8, name: 'Immunology & Serology', icon: ShieldCheck, desc: 'Serum antibody-antigen reaction testing, autoimmune disease screening, syphilis, and viral hepatitis assays.' },
  { id: 9, name: 'Molecular Diagnostics', icon: Binary, desc: 'Real-time PCR nucleic acid amplification, viral load quantification, and advanced genetic diagnostic panels.' }
];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
  };

  const currentSlide = carouselData[currentIndex];

  return (
    <section className="page-section">
      <div className="section-header">
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

      {/* 9 Clinical Laboratory Sections Grid */}
      <div className="section-header" style={{ marginBottom: '1.75rem', marginTop: '3.5rem' }}>
        <span className="section-tag">9 Clinical Rotations</span>
        <h3 className="section-title" style={{ fontSize: '1.8rem' }}>Major Laboratory Sections</h3>
      </div>

      <div className="dept-grid">
        {labSectionsData.map((sec) => {
          const IconComp = sec.icon;
          return (
            <div className="dept-card" key={sec.id}>
              <div className="dept-icon">
                <IconComp size={24} color="#ffd700" />
              </div>
              <h3>{sec.name}</h3>
              <p>{sec.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
