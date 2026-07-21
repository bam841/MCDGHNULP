import React, { useState } from 'react';
import { Microscope, Home, Info, Users, Images, Menu, X } from 'lucide-react';

export default function Navbar({ activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
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
            <Microscope size={24} color="#050b14" strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <h1>BATCH NU-LIPA ALPHA</h1>
            <span>NU Lipa Medical Technology</span>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Menu (Desktop Inline / Mobile Collapsible Drawer) */}
        <nav 
          className={`nav-buttons-wrapper ${mobileMenuOpen ? 'mobile-open' : ''}`} 
          aria-label="Main Navigation"
        >
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
