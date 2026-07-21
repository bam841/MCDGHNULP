import React from 'react';
import { Microscope } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-site">
      <div className="container footer-content">
        <div className="footer-brand">
          <Microscope size={18} className="footer-icon" />
          <span className="footer-title">BATCH NU-LIPA ALPHA</span>
          <span className="footer-divider">/</span>
          <span className="footer-sub">Medical Technology</span>
        </div>
        <p className="footer-copy">
          &copy; 2026 National University NU-LIPA College of Medical Technology. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
