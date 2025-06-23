import { Calendar, Shield, Star, MapPin, History } from 'lucide-react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slots from '@images/slots.png';
import rules from '@images/rules.png';

const StudentDashboard = ({ user, testimonials, loadingTestimonials, errorTestimonials }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MapPin size={28} />,
      title: 'Parking Rules',
      description: 'See real-time availability of student parking slots on campus with interactive maps.',
      action: () => {
        window.open('/settings', '_self');
      },
      image: rules
    },
    {
      icon: <Calendar size={28} />,
      title: 'Reserve a Slot',
      description: 'Secure your spot in advance and avoid last-minute hassle with our booking system.',
      action: () => {
        window.open('/slots', '_self');
      },
      image: slots
    },
    {
      icon: <History size={28} />,
      title: 'Student Area',
      description: 'Track your past bookings and manage your parking history efficiently.',
      action: () => {
        window.open('https://ibu.edu.ba', '_blank');
      },
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
    }
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="main-content-home">
      <h2 className="section-title">University Features</h2>
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
          <button className="btn-primary" onClick={() => navigate('/student-reservations')}>
            View My Reservations
          </button>
          <button className="btn-secondary" onClick={() => navigate('/slots')}>
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
  );
};

export default StudentDashboard;
