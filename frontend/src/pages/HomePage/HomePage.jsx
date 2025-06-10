import React, { useEffect, useState } from 'react';
import { Car, Calendar, History, MapPin, Clock, Shield, Settings, Star } from 'lucide-react';
import { ratingsApi } from './../../api/RatingsApi'; 

// 1. Uvezite styles iz CSS Modula
import styles from './HomePage.module.css';

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
    },
    {
      icon: <Settings size={28} />,
      title: 'Account Settings',
      description: 'Manage your profile, notification preferences, and account security.',
      action: () => console.log('Navigate to settings'),
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop'
    }
  ];

  return (
    // 2. Primenite klase koristeći 'styles' objekat
    <div className={styles.homepageContainer}>
      <div className={styles.heroSection}>
          <div className={styles.heroContent}>
              <h1>Welcome to Student Parking</h1>
              <p>Hi {firstName}! Your smart campus parking solution is here.</p>
              <div className={styles.statsGrid}>
                  <div className={styles.statCard}><Car size={24} /><div className={styles.statNumber}>127</div><div className={styles.statLabel}>Available Spots</div></div>
                  <div className={styles.statCard}><Calendar size={24} /><div className={styles.statNumber}>3</div><div className={styles.statLabel}>Your Reservations</div></div>
                  <div className={styles.statCard}><Clock size={24} /><div className={styles.statNumber}>24</div><div className={styles.statLabel}>Hours Saved</div></div>
              </div>
          </div>
      </div>

      {isAuthorized ? (
        <div className={styles.mainContent}>
          <h2 className={styles.sectionTitle}>Parking Features</h2>
          <div className={styles.featuresGrid}>
              {features.map((feature) => (
                  <div key={feature.title} className={styles.featureCard} onClick={feature.action}>
                      <div className={styles.featureImage} style={{ backgroundImage: `url(${feature.image})` }}><div className={styles.featureIcon}>{feature.icon}</div></div>
                      <div className={styles.featureContent}>
                          <h3 className={styles.featureTitle}>{feature.title}</h3>
                          <p className={styles.featureDescription}>{feature.description}</p>
                          <span className={styles.featureAction}>Learn More →</span>
                      </div>
                  </div>
              ))}
          </div>

          <div className={styles.ctaSection}>
              <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
              <p className={styles.ctaDescription}>Join thousands of students who have simplified their parking experience with our smart reservation system.</p>
              <div className={styles.ctaButtons}>
                  <button className={styles.btnPrimary} onClick={() => console.log('Navigate to reservations')}>View My Reservations</button>
                  <button className={styles.btnSecondary} onClick={() => console.log('Navigate to slots')}>Reserve Now</button>
              </div>
          </div>

          <div className={styles.testimonialsSection}>
            <h2 className={styles.sectionTitle}>What Students Say</h2>
            {loadingTestimonials ? (
              <p>Loading feedback...</p>
            ) : errorTestimonials ? (
              <p style={{ color: 'red', textAlign: 'center' }}>{errorTestimonials}</p>
            ) : (
              <div className={styles.testimonialsGrid}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className={styles.testimonialCard}>
                    <div className={styles.stars}>
                      {[...Array(Number(testimonial.rating))].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className={styles.testimonialText}>"{testimonial.comment}"</p>
                    <div className={styles.testimonialAuthor}>{testimonial.name}</div>
                    <div className={styles.testimonialRole}>{testimonial.role}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className={styles.trustSection}>
            <div className={styles.trustIcon}><Shield size={32} /></div>
            <h3 className={styles.trustTitle}>Secure & Reliable</h3>
            <p className={styles.trustDescription}>Your data is protected with enterprise-grade security. Our system ensures your parking reservations are always confirmed and your personal information stays safe.</p>
          </div>
        </div>
      ) : (
        <div className={styles.accessDenied}>
          <div className={styles.accessDeniedIcon}><Shield size={32} /></div>
          <h2>Access Restricted</h2>
          <p>Only students with <code>@stu.ibu.edu.ba</code> email addresses are allowed to access this system.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;