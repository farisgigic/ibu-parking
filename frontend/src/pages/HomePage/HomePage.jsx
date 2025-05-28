import React, { useEffect, useState } from 'react';
import { Car, Calendar, History, MapPin, Clock, Shield, Settings } from 'lucide-react';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mock user data for demo - replace with your actual logic
  useEffect(() => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@stu.ibu.edu.ba'
    };
    setUser(mockUser);
    setIsAuthorized(mockUser.email.endsWith('@stu.ibu.edu.ba'));
    setMounted(true);
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

      <style jsx>{`
        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .enhanced-card {
          background: white;
          border-radius: 20px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: none;
          height: 280px !important;
        }
        
        .enhanced-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }
        
        .card-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 20px;
        }
        
        .enhanced-card:hover .card-gradient-overlay {
          opacity: 0.1;
        }
        
        .feature-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px;
          border-radius: 16px;
          margin-bottom: 20px;
          transition: transform 0.3s ease;
        }
        
        .enhanced-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .learn-more {
          color: #667eea;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .enhanced-card:hover .learn-more {
          color: #764ba2;
          transform: translateX(5px);
        }
        
        .cta-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 60px 40px;
          text-align: center;
          margin: 40px auto;
          max-width: 800px;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
        }
        
        .cta-button {
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .cta-button.primary {
          background: white;
          color: #667eea;
        }
        
        .cta-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          background: #f8f9ff;
        }
        
        .cta-button.secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        
        .cta-button.secondary:hover {
          background: white;
          color: #667eea;
          transform: translateY(-2px);
        }
        
        .trust-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          max-width: 600px;
          margin: 40px auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .trust-icon {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 16px;
          border-radius: 16px;
          display: inline-block;
          margin-bottom: 20px;
        }
        
        .access-denied {
          background: #fef2f2;
          border: 2px solid #fecaca;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          max-width: 500px;
          margin: 40px auto;
        }
        
        .access-denied-icon {
          background: #fee2e2;
          color: #dc2626;
          padding: 16px;
          border-radius: 16px;
          display: inline-block;
          margin-bottom: 20px;
        }
        
        .access-denied h2 {
          color: #991b1b;
          margin-bottom: 15px;
        }
        
        .access-denied p {
          color: #7f1d1d;
        }
        
        .access-denied code {
          background: #fee2e2;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: monospace;
        }
        
        @media (max-width: 768px) {
          .cta-section {
            padding: 40px 20px;
          }
          
          .cta-button {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;