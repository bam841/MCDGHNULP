import React from 'react';
import { Microscope, Home, Info, Users, Images } from 'lucide-react';

export default function Navbar({ activeSection, scrollToSection }) {
  const handleNavClick = (sectionId) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header-glass">
      <div className="container header-container">
        {/* Brand Logo & Title */}
        <div className="brand-logo" onClick={() => handleNavClick('home')}>
          <div className="brand-icon">
            <Microscope size={26} color="#050b14" strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <h1>BATCH NU-LIPA ALPHA</h1>
            <span>NU Lipa Medical Technology</span>
          </div>
        </div>

        {/* Top Navigation Buttons (Home, About Us, Interns, Gallery) */}
        <nav className="nav-buttons-wrapper" aria-label="Main Navigation">
          <button 
            className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <Home size={18} />
            Home
          </button>
          
          <button 
            className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            <Info size={18} />
            About Us
          </button>
          
          <button 
            className={`nav-btn ${activeSection === 'interns' ? 'active' : ''}`}
            onClick={() => handleNavClick('interns')}
          >
            <Users size={18} />
            Interns
          </button>

          <button 
            className={`nav-btn ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => handleNavClick('gallery')}
          >
            <Images size={18} />
            Gallery
          </button>
        </nav>
      </div>
    </header>
  );
}

