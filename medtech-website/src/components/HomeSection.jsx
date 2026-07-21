import React from 'react';
import { ArrowDownRight, Stethoscope, Microscope, Award, Image as ImageIcon } from 'lucide-react';

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
      {/* Hero Header Section */}
      <div className="hero-card">
        <div className="hero-meta-row">
          <span className="hero-tag">CLASS OF 2026</span>
          <span className="hero-dot">/</span>
          <span className="hero-tag">CLINICAL INTERNSHIP PORTAL</span>
        </div>
        
        <h1 className="hero-title">
          Precision in Diagnostics, <br />
          <span className="gold-accent">Excellence in Clinical Duty</span>
        </h1>

        <p className="hero-subtitle">
          The official Medical Technology clinical internship archive for <strong>BATCH NU-LIPA ALPHA</strong> at National University Lipa — documenting microscopic accuracy, specimen analyses, and hospital laboratory rotations.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => handleScrollTo('about')}>
            <Stethoscope size={16} /> Clinical Rotations <ArrowDownRight size={16} />
          </button>
          <button className="btn-secondary" onClick={() => handleScrollTo('interns')}>
            <Microscope size={16} /> Intern Roster
          </button>
        </div>
      </div>

      {/* FEATURED COVER LANDING SHOWCASE */}
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
            <ImageIcon size={14} /> COVER ARCHIVE / BATCH NU-LIPA ALPHA
          </div>
        </div>

        <div className="cover-info-bar">
          <div className="cover-title-box">
            <h3>
              <Award size={20} color="#ffd700" /> BATCH NU-LIPA ALPHA
            </h3>
            <p>National University Lipa — College of Medical Technology</p>
          </div>
          <div className="cover-stats-mini">
            <div className="mini-stat">
              <div className="mini-stat-num">1,664</div>
              <div className="mini-stat-label">Rotation Hours</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-num">09</div>
              <div className="mini-stat-label">Lab Sections</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-num">2026</div>
              <div className="mini-stat-label">Graduation Year</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">1,664</div>
          <div className="stat-label">Hospital Duty Hours</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">09</div>
          <div className="stat-label">Laboratory Divisions</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Diagnostic Accuracy Focus</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2026</div>
          <div className="stat-label">Clinical Intern Class</div>
        </div>
      </div>
    </section>
  );
}
