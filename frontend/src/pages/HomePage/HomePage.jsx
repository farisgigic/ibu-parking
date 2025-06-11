import { useEffect, useState } from 'react';
import { Car, Calendar, History, MapPin, Clock, Shield, Settings, Star } from 'lucide-react';
import { ratingsApi } from './../../api/RatingsApi';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [errorTestimonials, setErrorTestimonials] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setUser(parsedUser);
        if (parsedUser?.email?.endsWith('@stu.ibu.edu.ba')) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Failed to parse user:", err);
        setIsAuthorized(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoadingTestimonials(true);
        const data = await ratingsApi.getAllRatings();
        setTestimonials(data);
      } catch (error) {
        setErrorTestimonials("Could not load student feedback.");
      } finally {
        setLoadingTestimonials(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (!user) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2rem', color: '#00396d' }}>Loading...</div>;
  }

  const firstName = user.first_name || user.name?.split(' ')[0];

  const features = [
    {
      icon: <MapPin size={28} />,
      title: 'View Parking',
      description: 'See real-time availability of student parking slots on campus with interactive maps.',
      action: () => console.log('Navigate to parking'),
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop'
    },
    {
      icon: <Calendar size={28} />,
      title: 'Reserve a Slot',
      description: 'Secure your spot in advance and avoid last-minute hassle with our booking system.',
      action: () => console.log('Navigate to slots'),
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop'
    },
    {
      icon: <History size={28} />,
      title: 'Reservation History',
      description: 'Track your past bookings and manage your parking history efficiently.',
      action: () => console.log('Navigate to history'),
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
    }
  ];

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#1e3a8a'
      }}>
        Loading...
      </div>
    );
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false, 
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="homepage-container">
      <div className="campus-header">
        <div className="campus-image-container">
          <img
            src='images/parking1.jpg'
            // src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop&crop=center"
            alt="IBU Campus"
            className="campus-image"
          />
          <div className="campus-overlay">
            <div className="campus-content">
              <h1 className="campus-title">International Burch University</h1>
              <p className="campus-subtitle">Smart Campus Parking Solution</p>
              <p>Hi {firstName}! Your smart campus parking solution is here.</p>
              <div className="stats-grid">
                <div className="stat-card">
                  <Car size={24} />
                  <div className="stat-number">127</div>
                  <div className="stat-label">Available Spots</div>
                </div>
                <div className="stat-card">
                  <Calendar size={24} />
                  <div className="stat-number">3</div>
                  <div className="stat-label">Your Reservations</div>
                </div>
                <div className="stat-card">
                  <Clock size={24} />
                  <div className="stat-number">24</div>
                  <div className="stat-label">Hours Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Student Parking</h1>
          <p>Hi {firstName}! Your smart campus parking solution is here.</p>
          <div className="stats-grid">
            <div className="stat-card">
              <Car size={24} />
              <div className="stat-number">127</div>
              <div className="stat-label">Available Spots</div>
            </div>
            <div className="stat-card">
              <Calendar size={24} />
              <div className="stat-number">3</div>
              <div className="stat-label">Your Reservations</div>
            </div>
            <div className="stat-card">
              <Clock size={24} />
              <div className="stat-number">24</div>
              <div className="stat-label">Hours Saved</div>
            </div>
          </div>
        </div>
      </div> */}

      {isAuthorized ? (
        <div className="main-content-home">
          <h2 className="section-title">Parking Features</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card" onClick={feature.action}>
                <div className="feature-image" style={{ backgroundImage: `url(${feature.image})` }}>
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <span className="feature-action">Learn More →</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join thousands of students who have simplified their parking experience with our smart reservation system.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => console.log('Navigate to reservations')}>
                View My Reservations
              </button>
              <button className="btn-secondary" onClick={() => console.log('Navigate to slots')}>
                Reserve Now
              </button>
            </div>
          </div>

          <div className="content-card testimonials-section">
          <h2 className="section-title">What Students Say</h2>
          {loadingTestimonials ? (
            <p style={{ textAlign: 'center' }}>Loading feedback...</p>
          ) : errorTestimonials ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{errorTestimonials}</p>
          ) : (
            <div className="carousel-container">
              <Slider {...carouselSettings}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-slide-wrapper">
                    <div className="testimonial-card">
                      <div className="stars">
                        {[...Array(Number(testimonial.rating))].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <p className="testimonial-text">"{testimonial.comment}"</p>
                      <div className="testimonial-author-group">
                        <div className="testimonial-author">{testimonial.name}</div>
                        <div className="testimonial-role">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>

          <div className="trust-section">
            <div className="trust-icon">
              <Shield size={32} />
            </div>
            <h3 className="trust-title">Secure & Reliable</h3>
            <p className="trust-description">
              Your data is protected with enterprise-grade security. Our system ensures your parking reservations
              are always confirmed and your personal information stays safe.
            </p>
          </div>
        </div>
      ) : (
        <div className="access-denied">
          <div className="access-denied-icon">
            <Shield size={32} />
          </div>
          <h2>Access Restricted</h2>
          <p>
            Only students with <code>@stu.ibu.edu.ba</code> email addresses are allowed to access this system.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;