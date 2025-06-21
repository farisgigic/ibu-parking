import { useEffect, useState } from 'react';
import { Car, Calendar, Clock } from 'lucide-react';
import { ratingsApi } from './../../api/RatingsApi';
import { slotsApi } from '../../api/ParkingSlotsApi';
import { reservationApi } from '../../api/ReservationApi';
import { studentApi } from '../../api/StudentApi';
import StudentDashboard from '../../components/HomePage/StudentDashboard/StudentDashboard';
import AccessDenied from '../../components/HomePage/GuestDashboard/AccessDenided';
import { adminApi } from '../../api/AdminApi';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [errorTestimonials, setErrorTestimonials] = useState(null);
  const [count, setCount] = useState(null);
  const [countById, setCountbyId] = useState(null);


  useEffect(() => {
    const fetchSlotCount = async () => {
      try {
        const result = await slotsApi.countSlots();
        setCount(result.count);
      } catch (err) {
        console.error("Failed to fetch slot count", err);
        setCount(0);
      }
    };

    fetchSlotCount();
  }, []);
  useEffect(() => {
    const fetchSlotCountById = async () => {
      try {
        const email = localStorage.getItem("user");
        const parsedEmail = JSON.parse(email);
        console.log(parsedEmail.email);

        const userForCount = await studentApi.getStudentByEmail(parsedEmail.email);
        console.log(userForCount.student_id); 

        const result = await reservationApi.countReservationsByStudentId(userForCount.student_id);
        console.log(result);
        setCountbyId(result.count);
      } catch (err) {
        console.error("Failed to fetch slot count", err);
        setCountbyId(0);
      }
    };

    fetchSlotCountById();
  }, []);



  useEffect(() => {
    const checkAuthorization = async () => {
      const userFromStorage = localStorage.getItem("user");

      if (userFromStorage) {
        try {
          const parsedUser = JSON.parse(userFromStorage);
          setUser(parsedUser);

          const isStudent = parsedUser?.email?.endsWith('@stu.ibu.edu.ba');
          let isAdmin = false;

          try {
            isAdmin = await adminApi.ifAdministrator(parsedUser.email);
          } catch (err) {
            console.warn("Admin check failed or user is not an admin:", err);
          }
          setIsAuthorized(isAdmin);
        } catch (err) {
          console.error("Failed to parse user:", err);
          setIsAuthorized(false);
        }
      }
    };




    checkAuthorization();
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
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      color: '#00396d'
    }}>Loading...</div>;
  }

  return (
    <div className="homepage-container">
      <div className="campus-header">
        <div className="campus-image-container">
          <img src='images/parking1.jpg' alt="IBU Campus" className="campus-image" />
          <div className="campus-overlay">
            <div className="campus-content">
              <h1 className="campus-title">International Burch University</h1>
              <p className="campus-subtitle">Smart Campus Parking Solution</p>
              <p>Hi {user.first_name || user.name?.split(' ')[0]}! Your smart campus parking solution is here.</p>
              <div className="stats-grid">
                <div className="stat-card">
                  <Car size={24} />
                  <div className="stat-number">
                    {count !== null ? count : '...'}
                  </div>
                  <div className="stat-label">Available Spots</div>
                </div>
                <div className="stat-card">
                  <Calendar size={24} />
                  <div className="stat-number">{countById !== null ? countById : '...'}</div>
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

      {isAuthorized
        ? <StudentDashboard
          user={user}
          testimonials={testimonials}
          loadingTestimonials={loadingTestimonials}
          errorTestimonials={errorTestimonials}
        />
        : <AccessDenied />}
    </div>
  );
};

export default HomePage;
