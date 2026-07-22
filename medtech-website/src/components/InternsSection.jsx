import React, { useState } from 'react';
import { Search, Mail, Building2 } from 'lucide-react';

const internsData = [
  {
    id: 1,
    name: 'Sebastien Aczon, MTI',
    badge: 'Alpha Intern',
    gender: 'male',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Pioneering diagnostic precision and compassionate patient care."',
    image: 'Aczon.jpg',
    facebook: 'https://www.facebook.com/share/194zDyMkeu/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/itschennotchan_?igsh=NDFqbGR2aXJxdnFu'
  },
  {
    id: 2,
    name: 'Kurt Mattieu Binayug, MTI',
    badge: 'Alpha Intern',
    gender: 'male',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Accuracy and dedication in every laboratory analysis."',
    image: 'Binayug, Kurt Mattieu B..jpeg',
    facebook: 'https://www.facebook.com/share/1DEEooyVRh/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/_mattieuuu?igsh=MWNweDdmaG1ieWE3Zg=='
  },
  {
    id: 3,
    name: 'Francine Cober, MTI',
    badge: 'Alpha Intern',
    gender: 'female',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Behind every sample is a patient relying on accurate diagnostic results."',
    image: 'Cober, Francine S..jpg',
    facebook: 'https://www.facebook.com/share/1EDVqeDh8M/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/seaur__chin?igsh=MWo4dDR0dzNhd2N3aQ=='
  },
  {
    id: 4,
    name: 'Franzine Alec Concordia, MTI',
    badge: 'Alpha Intern',
    gender: 'female',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Committed to excellence, integrity, and ethical clinical practice."',
    image: '/assets/interns/franzine_concordia.jpg',
    facebook: 'https://www.facebook.com/share/198qvjX9fq/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/lecaachin?igsh=ZTBkczRtNGdrcjBk'
  },
  {
    id: 5,
    name: 'Trisha Julieann Espiron, MTI',
    badge: 'Alpha Intern',
    gender: 'female',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Leading with resilience, precision, and passion for healthcare."',
    image: '/assets/interns/trisha_espiron.jpeg',
    facebook: 'https://www.facebook.com/share/1D1FJDTvL6/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/trishaespiron_?igsh=MXIwOGs4aTQ3MXQxbg=='
  },
  {
    id: 6,
    name: 'Nishamei Hally Monsod, MTI',
    badge: 'Alpha Intern',
    gender: 'female',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Rigorous attention to detail in every diagnostic specimen run."',
    image: '/assets/interns/nishamei_monsod.jpg',
    facebook: 'https://www.facebook.com/share/17uAHrbDD2/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/halmeiia?igsh=bW5wZHlwNmZqam0w'
  },
  {
    id: 7,
    name: 'Alejandro Pacano Jr., MTI',
    badge: 'Alpha Intern',
    gender: 'male',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Serving patients through microscopic accuracy and teamwork."',
    image: '/assets/interns/alejandro_pacano.jpg',
    facebook: 'https://www.facebook.com/share/1ArvNXojLn/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/alixxnfr?igsh=eWQ1dTVoYzhqM3Fz'
  },
  {
    id: 8,
    name: 'Jasmin Mari Quilantang, MTI',
    badge: 'Alpha Intern',
    gender: 'female',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Excellence in diagnostic science and compassionate clinical care."',
    image: '/assets/interns/jasmin_quilantang.jpg',
    facebook: 'https://www.facebook.com/share/161rWirTop2/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/sushij4zz?igsh=Y2Z1NG9ieXA2a29z'
  },
  {
    id: 9,
    name: 'Alexis Janell Umali, MTI',
    badge: 'Alpha Intern',
    gender: 'female',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Paving the way for clinical innovation and diagnostic mastery."',
    image: '/assets/interns/alexis_umali.jpg',
    facebook: 'https://www.facebook.com/share/1LDy2Y5yWu/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/ae_jie1?igsh=MTgzYWR3b3ZzbmR0OA=='
  },
  {
    id: 10,
    name: 'Kurt Jurei Vesliños, MTI',
    badge: 'Alpha Intern',
    gender: 'male',
    hospitalKey: 'mount-carmel',
    hospitalName: 'Mount Carmel Diocesan General Hospital',
    specialty: 'Clinical Laboratory Rotation',
    quote: '"Upholding ethical standards and diagnostic precision every shift."',
    image: '/assets/interns/kurt_veslinos.jpg',
    facebook: 'https://www.facebook.com/share/1JJ2EWZvm1/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/thekurtjrei?igsh=MWlmMXJ4ejN6MW94Mg=='
  }
];

export default function InternsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInterns = internsData.filter((intern) => {
    const matchesFilter = 
      activeFilter === 'all' || 
      intern.hospitalKey === activeFilter ||
      intern.gender === activeFilter;
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
        <span className="section-tag">Official Roster</span>
        <h2 className="section-title">NU–Lipa Alpha Interns Roster</h2>
        <p className="section-subtitle">
          Meet the 10 pioneering Medical Technology clinical interns of Batch NU-LIPA Alpha at Mount Carmel Diocesan General Hospital.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="interns-filter-bar">
        <div className="filter-tags">
          <button 
            className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All 10 Interns
          </button>
          <button 
            className={`filter-chip ${activeFilter === 'mount-carmel' ? 'active' : ''}`}
            onClick={() => setActiveFilter('mount-carmel')}
          >
            Mount Carmel Hospital
          </button>
          <button 
            className={`filter-chip ${activeFilter === 'female' ? 'active' : ''}`}
            onClick={() => setActiveFilter('female')}
          >
            Women Interns (6)
          </button>
          <button 
            className={`filter-chip ${activeFilter === 'male' ? 'active' : ''}`}
            onClick={() => setActiveFilter('male')}
          >
            Men Interns (4)
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
                  {intern.hospitalName}
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
