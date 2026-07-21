import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import TextMarqueeSection from './components/TextMarqueeSection';
import AboutSection from './components/AboutSection';
import InternsSection from './components/InternsSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'interns', 'gallery'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main className="container" style={{ flexGrow: 1 }}>
        <div id="home">
          <HomeSection scrollToSection={scrollToSection} />
        </div>

        {/* Sleek Infinite Scrolling Core Values Marquee Carousel */}
        <TextMarqueeSection />

        <div id="about">
          <AboutSection />
        </div>

        <div id="interns">
          <InternsSection />
        </div>

        <div id="gallery">
          <GallerySection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

