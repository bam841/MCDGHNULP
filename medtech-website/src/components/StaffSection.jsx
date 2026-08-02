import React, { useState } from 'react';
import { Search, Mail, Shield, Award, UserCheck, Stethoscope, Star, CheckCircle } from 'lucide-react';

const staffData = [
  {
    id: 1,
    name: 'Dr. Carina P. Villamayor, FPSP',
    roles: ['Head - Pathology Department', 'Head - Blood Service Facility'],
    groups: ['leadership'],
    badges: ['Pathology Head', 'Blood Bank Chief', 'FPSP'],
    image: '/assets/staff/DR. CARINA P. VILLAMAYOR, FPSPHEAD- PATHOLOGY DEPARTMENTHEAD- BLOOD SERVICE FACILITY.png',
    bio: 'Directs overall department operations, pathology diagnostics, and the blood service facility, establishing high clinical standards and quality systems.',
    email: 'pathology@mcdgh.com.ph',
    priority: true,
    objectPosition: 'top'
  },
  {
    id: 2,
    name: 'Khristine T. Moreno, RMT, MPH',
    roles: ['Chief Medical Technologist', 'MedTech Internship Coordinator'],
    groups: ['leadership', 'officers'],
    badges: ['Chief MedTech', 'Internship Coordinator', 'MPH'],
    image: '/assets/staff/KHRISTINE T. MORENO, RMT, MPHCHIEF MEDICAL TECHNOLOGISTMEDTECH INTERNSHIP COORDINATOR.png',
    bio: 'Oversees laboratory staff management, clinical instruction, and acts as the chief academic coordinator for the National University MedTech internship program.',
    email: 'kmoreno@mcdgh.com.ph',
    priority: true,
    objectPosition: 'top'
  },
  {
    id: 3,
    name: 'Mae Ann O. Mondido, RMT, ASCPi',
    roles: ['Microbiology Section Supervisor', 'Internship Training Officer'],
    groups: ['supervisors', 'officers'],
    badges: ['Microbiology Head', 'Training Officer', 'ASCPi'],
    image: '/assets/staff/MAE ANN O. MONDIDO, RMT, ASCPiMICROBIOLOGY  INTERNSHIP TRAINING OFFICER.png',
    bio: 'Supervises microbiological testing, pathogen screening, and serves as the training officer, mentoring clinical interns in laboratory operations.',
    email: 'mmondido@mcdgh.com.ph',
    objectPosition: 'top'
  },
  {
    id: 4,
    name: 'Christine Joyce S. Cuevas, RMT',
    roles: ['Quality Assurance Officer'],
    groups: ['officers'],
    badges: ['QA Officer', 'Quality Control'],
    image: '/assets/staff/CHRISTINE JOYCE S. CUEVAS, RMTQUALITY ASSURANCE OFFICER.png',
    bio: 'Responsible for maintaining laboratory documentation, quality control logs, and instrument calibration validation to meet regulatory guidelines.',
    email: 'ccuevas@mcdgh.com.ph',
    objectPosition: 'top'
  },
  {
    id: 5,
    name: 'Glenn A. Apuya, RMT',
    roles: ['Biosafety Officer'],
    groups: ['officers'],
    badges: ['Biosafety Officer', 'Safety & Standards'],
    image: '/assets/staff/GLENN A. APUYA, RMTBIOSAFETY OFFICER.png',
    bio: 'Directs chemical hygiene, microbiological containment protocols, biosafety audits, and hazardous waste disposal systems within the lab.',
    email: 'gapuya@mcdgh.com.ph',
    objectPosition: 'top'
  },
  {
    id: 6,
    name: 'Anna Bernadette C. Tiongco, RN',
    roles: ['Donor Recruitment Officer'],
    groups: ['officers'],
    badges: ['Donor Officer', 'Registered Nurse'],
    image: '/assets/staff/ANNA BERNADETTE C. TIONGCO, RNDONOR RECRUITMENT OFFICER.png',
    bio: 'Coordinates donor outreach campaigns, manages donor selection criteria, and supports pre-transfusion blood services.',
    email: 'ationgco@mcdgh.com.ph',
    objectPosition: 'top'
  },
  {
    id: 7,
    name: 'Roshelle Maxine O. Evardome, RMT, ASCPi',
    roles: ['Clinical Chemistry Section Supervisor'],
    groups: ['supervisors'],
    badges: ['Chemistry Supervisor', 'ASCPi'],
    image: '/assets/staff/ROSHELLE MAXINE O. EVARDOME, RMT, ASCPi CLINICAL CHEMISTRY.png',
    bio: 'Manages automated serum analyzers, spectrophotometric testing, lipid panels, and blood electrolyte profiling.',
    email: 'revardome@mcdgh.com.ph',
    objectPosition: 'top'
  },
  {
    id: 8,
    name: 'Maria Jessica E. Malabumga, RMT',
    roles: ['Hematology & Clin. Microscopy Section Supervisor', 'HIV Counselor'],
    groups: ['supervisors'],
    badges: ['Hematology Head', 'Microscopy', 'HIV Counselor'],
    image: '/assets/staff/MARIA JESSICA E. MALABUMGA, RMTHEMATOLOGY & CLIN. MICROSCOPYHIV COUNSELOR.png',
    bio: 'Directs complete blood count testing, manual differential cell counts, urinalysis, and patient HIV pre-and-post test counselling.',
    email: 'mmalabumga@mcdgh.com.ph',
    objectPosition: 'top'
  },
  {
    id: 9,
    name: 'Jobelle C. Ayala, RMT',
    roles: ['Immunology & Serology Section Supervisor', 'HIV Proficient & RHIVDA'],
    groups: ['supervisors'],
    badges: ['Serology Head', 'RHIVDA Proficient'],
    image: '/assets/staff/JOBELLE C. AYALA, RMTIMMUNOLOGY & SEROLOGYHIV PROFICIENT & RHIVDA.png',
    bio: 'Specializes in antigen-antibody reactions, infectious disease screening, serology panels, and licensed HIV diagnostics.',
    email: 'jayala@mcdgh.com.ph',
    objectPosition: 'top'
  },
  {
    id: 10,
    name: 'Celeste M. Perez, RMLT, ASCPi',
    roles: ['Phlebotomy Coordinator'],
    groups: ['supervisors'],
    badges: ['Phlebotomy Head', 'ASCPi'],
    image: '/assets/staff/CELESTE M. PEREZ, RMLT, ASCPiPHLEBOTOMY.png',
    bio: 'Manages pre-analytical blood collections, phlebotomy supplies, venipuncture technique standards, and patient safety assurance.',
    email: 'cperez@mcdgh.com.ph',
    objectPosition: 'top'
  }
];

export default function StaffSection() {
  const [activeGroup, setActiveGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = staffData.filter((staff) => {
    const matchesGroup = activeGroup === 'all' || staff.groups.includes(activeGroup);
    const matchesSearch =
      searchQuery === '' ||
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.roles.some(role => role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      staff.badges.some(badge => badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGroup && matchesSearch;
  });

  return (
    <section className="page-section" style={{ position: 'relative' }}>
      {/* Visual background accents */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '2%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 191, 255, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="section-header" style={{ position: 'relative', zIndex: 1 }}>
        <span className="section-tag" style={{ border: '1px solid var(--gold-main)', color: 'var(--gold-bright)' }}>Clinical Mentors</span>
        <h2 className="section-title">THE HEADS AND STAFFS</h2>
        <p className="section-subtitle">
          Meet the professional pathology department heads, laboratory supervisors, and clinical staff of Mount Carmel Diocesan General Hospital supervising Batch NU-Lipa Alpha.
        </p>
      </div>

      {/* Roster Controls */}
      <div className="interns-filter-bar" style={{ position: 'relative', zIndex: 1, marginBottom: '2.5rem' }}>
        <div className="filter-tags">
          <button 
            className={`filter-chip ${activeGroup === 'all' ? 'active' : ''}`}
            onClick={() => setActiveGroup('all')}
          >
            All 10 Staff
          </button>
          <button 
            className={`filter-chip ${activeGroup === 'leadership' ? 'active' : ''}`}
            onClick={() => setActiveGroup('leadership')}
          >
            Leadership
          </button>
          <button 
            className={`filter-chip ${activeGroup === 'officers' ? 'active' : ''}`}
            onClick={() => setActiveGroup('officers')}
          >
            Specialized Officers
          </button>
          <button 
            className={`filter-chip ${activeGroup === 'supervisors' ? 'active' : ''}`}
            onClick={() => setActiveGroup('supervisors')}
          >
            Section Supervisors
          </button>
        </div>

        <div className="search-box">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search name, section, or credentials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="interns-grid" style={{ position: 'relative', zIndex: 1 }}>
        {filteredStaff.length > 0 ? (
          filteredStaff.map((staff, index) => {
            const isLeader = staff.groups.includes('leadership');
            return (
              <div 
                className="intern-card-wrapper" 
                key={staff.id} 
                style={{ 
                  animationDelay: `${index * 60}ms`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <div 
                  className="intern-card"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: isLeader 
                      ? '1px solid rgba(255, 215, 0, 0.35)' 
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    background: isLeader 
                      ? 'linear-gradient(145deg, rgba(13, 27, 48, 0.95), rgba(10, 23, 40, 0.98))' 
                      : 'var(--navy-card)',
                    boxShadow: isLeader 
                      ? '0 8px 24px rgba(255, 215, 0, 0.05)' 
                      : 'var(--shadow-soft)'
                  }}
                >
                  {/* Executive Ribbon for Leadership */}
                  {isLeader && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'linear-gradient(90deg, #ffd700, #ffaa00)',
                        color: '#050b14',
                        fontWeight: '800',
                        fontSize: '0.62rem',
                        textTransform: 'uppercase',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        zIndex: 10,
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}
                    >
                      <Award size={10} strokeWidth={3} /> EXECUTIVE
                    </div>
                  )}

                  {/* Card Image Container */}
                  <div className="intern-card-header" style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}>
                    <img 
                      src={staff.image} 
                      alt={staff.name} 
                      className="intern-img"
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: staff.objectPosition || 'top',
                        height: '100%',
                        width: '100%'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/cover_landing_page.jpeg";
                      }}
                    />
                    
                    <span 
                      className="intern-badge"
                      style={{
                        borderColor: isLeader ? 'var(--gold-main)' : 'rgba(255, 255, 255, 0.25)',
                        background: 'rgba(8, 16, 28, 0.9)',
                        color: isLeader ? 'var(--gold-bright)' : 'var(--text-primary)'
                      }}
                    >
                      {staff.badges[0]}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="intern-card-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 className="intern-name" style={{ fontSize: '1.15rem', color: isLeader ? 'var(--gold-bright)' : '#ffffff' }}>
                      {staff.name}
                    </h3>
                    
                    <div className="intern-hospital" style={{ color: isLeader ? 'var(--gold-main)' : 'var(--cyan-main)', minHeight: '34px', fontSize: '0.82rem', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.15rem' }}>
                      {staff.roles.map((role, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Shield size={12} style={{ flexShrink: 0 }} />
                          <span>{role}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.85rem' }}>
                      {staff.badges.slice(1).map((b, idx) => (
                        <span 
                          key={idx} 
                          className="intern-spec" 
                          style={{ 
                            fontSize: '0.68rem', 
                            padding: '0.1rem 0.4rem', 
                            marginBottom: 0,
                            background: isLeader ? 'rgba(255, 215, 0, 0.08)' : 'rgba(255,255,255,0.05)',
                            border: isLeader ? '1px solid rgba(255, 215, 0, 0.15)' : '1px solid rgba(255,255,255,0.05)',
                            color: isLeader ? 'var(--gold-bright)' : 'var(--text-secondary)'
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <p className="intern-quote" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.65rem', fontStyle: 'normal' }}>
                      {staff.bio}
                    </p>
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            No staff members found matching your search. Try adjusting your query or filters.
          </div>
        )}
      </div>
    </section>
  );
}
