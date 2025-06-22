import { useNavigate } from "react-router";

const Footer = () => {
  let navigate = useNavigate();
  
  return (
    <footer className="modern-footer">
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      
      <div className="footer-container">
        <div className="footer-grid">
          {/* Academic Links */}
          <div className="footer-section">
            <h4>Academic</h4>
            <nav className="footer-nav">
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/courses')}
              >
                Course Catalog
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/programs')}
              >
                Degree Programs
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/schedule')}
              >
                Class Schedule
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/enrollment')}
              >
                Enrollment
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/grades')}
              >
                Academic Records
              </button>
            </nav>
          </div>

          {/* Campus Services */}
          <div className="footer-section">
            <h4>Campus Services</h4>
            <nav className="footer-nav">
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/library')}
              >
                Digital Library
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/dining')}
              >
                Dining Services
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/housing')}
              >
                Student Housing
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/wellness')}
              >
                Health & Wellness
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/activities')}
              >
                Campus Activities
              </button>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Information</h4>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-label">Address:</div>
                <div className="contact-details">
                  <div>Francuske revolucije bb</div>
                  <div>71000 Sarajevo, BiH</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-label">Phone:</div>
                <a href="tel:+38733944400" className="contact-link">+387 33 944 400</a>
              </div>
              
              <div className="contact-item">
                <div className="contact-label">Email:</div>
                <a href="mailto:info@ibu.edu.ba" className="contact-link">info@ibu.edu.ba</a>
              </div>
              
              <div className="contact-item">
                <div className="contact-label">Website:</div>
                <a 
                  href="https://www.ibu.edu.ba" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  www.ibu.edu.ba
                </a>
              </div>
            </div>
          </div>

          {/* Student Resources */}
          <div className="footer-section">
            <h4>Student Resources</h4>
            <nav className="footer-nav">
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/portal')}
              >
                Student Portal
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/career')}
              >
                Career Services
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/financial-aid')}
              >
                Financial Aid
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/support')}
              >
                Academic Support
              </button>
              <button 
                className="nav-link-custom" 
                onClick={() => navigate('/alumni')}
              >
                Alumni Network
              </button>
            </nav>
          </div>
        </div>

        {/* Footer Bottom with Logo */}
        <div className="footer-bottom">
          {/* Logo Section */}
          <div className="footer-logo-bottom">
            <div className="logo-container-bottom">
              <img 
                src="/images/logo.png"
                alt="IBU - International Burch University"
                className="ibu-logo-bottom"
              />
              <div className="logo-text-bottom">
                <h2>International Burch University</h2>
                <p>Smart University Solutions</p>
              </div>
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2025 International Burch University. All rights reserved.
            </div>
            <div className="footer-links">
              <button 
                className="footer-link-btn"
                onClick={() => navigate('/terms')}
              >
                Terms of Service
              </button>
              <button 
                className="footer-link-btn"
                onClick={() => navigate('/privacy')}
              >
                Privacy Policy
              </button>
              <button 
                className="footer-link-btn"
                onClick={() => navigate('/cookies')}
              >
                Cookie Policy
              </button>
              <button 
                className="footer-link-btn"
                onClick={() => navigate('/accessibility')}
              >
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;