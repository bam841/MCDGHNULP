import React, { useState } from 'react';
import { Search, Mail, Building2 } from 'lucide-react';

const internsData = [
  {
    id: 1,
    name: 'Class President, BSMT',
    badge: 'Senior Intern',
    hospitalKey: 'st-jude',
    hospitalName: 'St. Jude Medical Center',
    specialty: 'Microbiology & Parasitology',
    quote: '"Finding answers under the ocular lens to help doctors heal lives."',
    image: '/assets/interns/president.jpg',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  },
  {
    id: 2,
    name: 'Vice President, BSMT',
    badge: 'Chief Intern',
    hospitalKey: 'city-general',
    hospitalName: 'City General Hospital',
    specialty: 'Clinical Chemistry Specialist',
    quote: '"Accuracy and speed in diagnostic testing save lives every shift."',
    image: '/assets/interns/vicepresident.jpg',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  },
  {
    id: 3,
    name: 'Secretary, BSMT',
    badge: 'Senior Intern',
    hospitalKey: 'national-health',
    hospitalName: 'National Health Institute',
    specialty: 'Blood Bank & Serology',
    quote: '"Matching antibodies and ensuring safe blood transfusions for everyone."',
    image: '/assets/interns/secretary.jpg',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  },
  {
    id: 4,
    name: 'Assistant Secretary, BSMT',
    badge: 'Senior Intern',
    hospitalKey: 'st-jude',
    hospitalName: 'St. Jude Medical Center',
    specialty: 'Histopathology & Cytology',
    quote: '"Tissue analysis and biopsy staining: revealing the cellular story."',
    image: '/assets/interns/assistant_secretary.jpg',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  },
  {
    id: 5,
    name: 'Treasurer, BSMT',
    badge: 'Senior Intern',
    hospitalKey: 'mary-mediatrix',
    hospitalName: 'Mary Mediatrix Medical Center',
    specialty: 'Clinical Hematology',
    quote: '"Dedicated to precision blood count analysis and diagnostic clarity."',
    image: '/assets/interns/treasurer.jpg',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  },
  {
    id: 6,
    name: 'Auditor, BSMT',
    badge: 'Senior Intern',
    hospitalKey: 'city-general',
    hospitalName: 'City General Hospital',
    specialty: 'Immunohematology',
    quote: '"Every specimen represents a patient expecting our absolute best work."',
    image: '/assets/interns/auditor.jpg',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  }
];

export default function InternsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInterns = internsData.filter((intern) => {
    const matchesFilter = activeFilter === 'all' || intern.hospitalKey === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.hospitalName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="page-section">
      <div className="section-header">
        <span className="section-tag">Clinical Roster</span>
        <h2 className="section-title">BATCH NU-LIPA ALPHA Intern Roster</h2>
        <p className="section-subtitle">
          Meet the dedicated senior Medical Technology clinical interns of Batch Alpha fulfilling rotations across partner medical centers.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="interns-filter-bar">
        <div className="filter-tags">
          <button 
            className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Hospitals
          </button>
          <button 
            className={`filter-chip ${activeFilter === 'st-jude' ? 'active' : ''}`}
            onClick={() => setActiveFilter('st-jude')}
          >
            St. Jude Medical Center
          </button>
          <button 
            className={`filter-chip ${activeFilter === 'city-general' ? 'active' : ''}`}
            onClick={() => setActiveFilter('city-general')}
          >
            City General Hospital
          </button>
          <button 
            className={`filter-chip ${activeFilter === 'national-health' ? 'active' : ''}`}
            onClick={() => setActiveFilter('national-health')}
          >
            National Health Institute
          </button>
          <button 
            className={`filter-chip ${activeFilter === 'mary-mediatrix' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mary-mediatrix')}
          >
            Mary Mediatrix Medical Center
          </button>
        </div>

        <div className="search-box">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search intern name or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Intern Cards Grid */}
      <div className="interns-grid">
        {filteredInterns.length > 0 ? (
          filteredInterns.map((intern) => (
            <div className="intern-card" key={intern.id}>
              <div className="intern-card-header">
                <img 
                  src={intern.image} 
                  alt={intern.name} 
                  className="intern-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/cover_landing_page.jpeg";
                  }}
                />
                <span className="intern-badge">{intern.badge}</span>
              </div>

              <div className="intern-card-body">
                <h3 className="intern-name">{intern.name}</h3>
                <div className="intern-hospital">
                  <Building2 size={15} /> {intern.hospitalName}
                </div>
                <span className="intern-spec">{intern.specialty}</span>
                <p className="intern-quote">{intern.quote}</p>
              </div>

              {/* Social Links Footer */}
              <div className="intern-card-socials">
                <span className="social-label">Connect</span>
                <div className="social-links">
                  <a 
                    href={intern.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-btn" 
                    aria-label={`${intern.name}'s Facebook`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.72l-.43 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/>
                    </svg>
                  </a>
                  <a 
                    href={intern.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-btn" 
                    aria-label={`${intern.name}'s Instagram`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href={`mailto:intern@nulipa.edu.ph`} 
                    className="social-btn" 
                    aria-label={`Email ${intern.name}`}
                  >
                    <Mail size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No interns found matching "{searchQuery}". Try selecting another filter!
          </div>
        )}
      </div>
    </section>
  );
}
