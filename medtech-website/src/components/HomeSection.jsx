import React from 'react';
import { Sparkles, Stethoscope, Microscope, Award, Image as ImageIcon } from 'lucide-react';

export default function HomeSection({ scrollToSection }) {
  const handleScrollTo = (sectionId) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="page-section">
      {/* Hero Header Card */}
      <div className="hero-card">
        <div className="hero-badge">
          <Sparkles size={16} /> BATCH NU-LIPA ALPHA Official Portal
        </div>
        <h1 className="hero-title">
          Precision in Diagnostics, <br />
          <span className="gold-accent">Excellence in Clinical Duty</span>
        </h1>
        <p className="hero-subtitle">
          Welcome to the official Medical Technology student & clinical intern portal for <strong>BATCH NU-LIPA ALPHA</strong> — 
          uniting passion for laboratory medicine, microscopic diagnostic accuracy, and dedicated hospital clinical internship rotations.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => handleScrollTo('about')}>
            <Stethoscope size={18} /> Explore Duty Experiences
          </button>
          <button className="btn-secondary" onClick={() => handleScrollTo('interns')}>
            <Microscope size={18} /> Meet Clinical Interns
          </button>
        </div>
      </div>

      {/* FEATURED COVER LANDING PAGE PICTURE SHOWCASE */}
      <div className="cover-landing-card">
        <div className="cover-image-wrapper">
          <img 
            src="/cover_landing_page.jpeg" 
            alt="BATCH NU-LIPA ALPHA Cover Landing Page" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/cover_landing_page.jpg";
            }}
          />
          <div className="cover-badge-tag">
            <ImageIcon size={16} /> COVER LANDING PAGE • BATCH NU-LIPA ALPHA
          </div>
        </div>
        <div className="cover-info-bar">
          <div className="cover-title-box">
            <h3>
              <Award size={22} color="#ffd700" /> BATCH NU-LIPA ALPHA — Class of 2026
            </h3>
            <p>National University NU-LIPA • College of Medical Technology</p>
          </div>
          <div className="cover-stats-mini">
            <div className="mini-stat">
              <div className="mini-stat-num">100%</div>
              <div className="mini-stat-label">Passionate Interns</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-num">9</div>
              <div className="mini-stat-label">Lab Sections</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-num">1,664</div>
              <div className="mini-stat-label">Duty Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">1,664</div>
          <div className="stat-label">Hospital Clinical Duty Hours</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">9</div>
          <div className="stat-label">Major Laboratory Sections</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Dedication to Patient Care</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2026</div>
          <div className="stat-label">Batch Alpha Intern Class</div>
        </div>
      </div>
    </section>
  );
}
