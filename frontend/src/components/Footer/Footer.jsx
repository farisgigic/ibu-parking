const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-section">
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDQwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IndoaXRlIi8+CiAgPHRleHQgeD0iMjAiIHk9IjcwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDAzOTZkIj5JQlU8L3RleHQ+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjIwIiB4Mj0iMjAwIiB5Mj0iODAiIHN0cm9rZT0iI2NjYyIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iMjIwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5Ij5JbnRlcm5hdGlvbmFsPC90ZXh0PgogIDx0ZXh0IHg9IjIyMCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSI+QnVyY2g8L3RleHQ+CiAgPHRleHQgeD0iMjIwIiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5Ij5Vbml2ZXJzaXR5PC90ZXh0Pgo8L3N2Zz4="
                alt="IBU - International Burch University"
                className="ibu-logo"
              />
              <p>
                International Burch University is a leading private university in Sarajevo, 
                Bosnia and Herzegovina, dedicated to providing quality education and fostering innovation.
              </p>
              <p>
                The Student Parking System is designed to make campus life easier and more efficient 
                for our students and staff.
              </p>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#" onClick={() => console.log('Navigate to parking')}>View Parking</a></li>
                <li><a href="#" onClick={() => console.log('Navigate to reserve')}>Reserve Slot</a></li>
                <li><a href="#" onClick={() => console.log('Navigate to history')}>My History</a></li>
                <li><a href="#" onClick={() => console.log('Navigate to settings')}>Account Settings</a></li>
                <li><a href="#" onClick={() => console.log('Navigate to support')}>Help & Support</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact Info</h3>
              <ul>
                <li>📍 Francuske revolucije bb</li>
                <li>71000 Sarajevo, BiH</li>
                <li>📞 +387 33 944 400</li>
                <li>✉️ info@ibu.edu.ba</li>
                <li>🌐 www.ibu.edu.ba</li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#" onClick={() => console.log('Navigate to FAQ')}>FAQ</a></li>
                <li><a href="#" onClick={() => console.log('Navigate to user guide')}>User Guide</a></li>
                <li><a href="#" onClick={() => console.log('Navigate to technical support')}>Technical Support</a></li>
                <li><a href="#" onClick={() => console.log('Navigate to feedback')}>Report Issue</a></li>
                <li><a href="#" onClick={() => console.log('Navigate to policies')}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © 2025 International Burch University. All rights reserved.
            </div>
            <div className="footer-links">
              <a href="#" onClick={() => console.log('Navigate to terms')}>Terms of Service</a>
              <a href="#" onClick={() => console.log('Navigate to privacy')}>Privacy Policy</a>
              <a href="#" onClick={() => console.log('Navigate to cookies')}>Cookie Policy</a>
              <a href="#" onClick={() => console.log('Navigate to accessibility')}>Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;