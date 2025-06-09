import React, { useEffect, useState } from 'react';
import { Car, Calendar, History, MapPin, Clock, Shield, Settings } from 'lucide-react';
import utils from './../../assets/data/utils';


const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");

    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
  }, []);


  if (!user) return null;

  const firstName = user.name?.split(' ')[0];

  const features = [
    {
      icon: <MapPin size={32} />,
      title: '🚗 View Parking',
      description: 'See real-time availability of student parking slots on campus.',
      action: () => console.log('Navigate to parking')
    },
    {
      icon: <Calendar size={32} />,
      title: '🗓️ Reserve a Slot',
      description: 'Secure your spot in advance and avoid last-minute hassle.',
      action: () => console.log('Navigate to slots')
    },
    {
      icon: <History size={32} />,
      title: '📅 Reservation History',
      description: 'Track your past bookings and get organized!',
      action: () => console.log('Navigate to history')
    },
    {
      icon: <Settings size={32} />,
      title: '⚙️ Account Settings',
      description: 'Manage your profile, notifications preferences.',
      action: () => console.log('Navigate to settings')
    }
  ];

  return (
    <div className="homepage-container">
      <div className="hero-section home_card animate-fade-in">
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Welcome to Student Parking
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: '#ffffff',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Hi {firstName}! Ready to reserve your perfect spot?
          </p>

          {/* Stats Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            <div className="stat-card">
              <Car size={24} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>127</div>
              <div style={{ color: '#e3f2fd', fontSize: '0.9rem' }}>Available Spots</div>
            </div>
            <div className="stat-card">
              <Calendar size={24} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>3</div>
              <div style={{ color: '#e3f2fd', fontSize: '0.9rem' }}>Your Reservations</div>
            </div>
            <div className="stat-card">
              <Clock size={24} />
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>24</div>
              <div style={{ color: '#e3f2fd', fontSize: '0.9rem' }}>Hours Saved</div>
            </div>
          </div>
        </div>
      </div>

      {isAuthorized ? (
        <div className="main-content">
          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '60px',
            maxWidth: '1400px',
            margin: '0 auto 60px'
          }}>
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`cards enhanced-card animate-fade-in`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={feature.action}
              >
                <div className="card-gradient-overlay"></div>
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="card-title" style={{ marginBottom: '20px' }}>
                    {feature.title}
                  </h3>
                  <p className="card-text" style={{
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {feature.description}
                  </p>
                  <div className="learn-more">
                    Learn More →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="cta-section animate-fade-in" style={{ animationDelay: '800ms' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '20px'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#e3f2fd',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Join thousands of students who have simplified their parking experience.
            </p>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="cta-button primary"
                onClick={() => console.log('Navigate to reservations')}
              >
                View My Reservations
              </button>
              <button
                className="cta-button secondary"
                onClick={() => console.log('Navigate to slots')}
              >
                Reserve Now
              </button>
            </div>
          </div>

          {/* Trust Section */}
          <div className="trust-section animate-fade-in" style={{ animationDelay: '1000ms' }}>
            <div className="trust-icon">
              <Shield size={32} />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '15px' }}>
              Secure & Reliable
            </h3>
            <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
              Your data is protected with enterprise-grade security. Our system ensures your
              parking reservations are always confirmed and your personal information stays safe.
            </p>
          </div>
        </div>
      ) : (
        <div className="access-denied animate-fade-in">
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