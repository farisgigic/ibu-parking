import React, { useEffect, useState } from 'react';
import studentParkingImage from '@images/parking.jpg';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  function isTokenExpired() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) return true;

    const payload = JSON.parse(atob(user.token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.tokenExpiry && Date.now() > storedUser.tokenExpiry) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      window.location.href = '/login';
    } else {
      setUser(storedUser);
      setIsAuthorized(storedUser.email.endsWith('@stu.ibu.edu.ba'));
    }
  }, []);

  if (!user) return null;

  const firstName = user.name?.split(' ')[0];

  return (
    <div className="container py-5">
      <div className="text-center py-5 text-white home_card">
        <h1 className="display-4 fw-bold">Welcome to Student Parking</h1>
        <p className="lead">Hi {firstName}! Ready to reserve your perfect spot?</p>

        {isAuthorized ? (
          <div className="mt-5">
            <div className="text-center mb-4">
              <img
                src={studentParkingImage}
                alt="Student parking illustration"
                className="img-fluid rounded shadow mb-4"
                style={{ maxWidth: '600px' }}
              />
            </div>

            <Row className="justify-content-center g-4">
              <Col md={3}>
                <Card className="cards">
                  <Card.Body>
                    <Card.Title>🚗 View Parking</Card.Title>
                    <Card.Text>
                      See real-time availability of student parking slots on campus.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <NavLink to="/slots" className="text-decoration-none">
                  <Card className="cards">
                    <Card.Body>
                      <Card.Title>🗓️ Reserve a Slot</Card.Title>
                      <Card.Text>
                        Secure your spot in advance and avoid last-minute hassle.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </NavLink>
              </Col>
              <Col md={3}>
                <Card className="cards">
                  <Card.Body>
                    <Card.Title>📅 Reservation History</Card.Title>
                    <Card.Text>
                      Track your past bookings and get organized!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* <div className="mt-5 text-center">
            <EmailForm />
          </div> */}
            <div className="mt-5 text-center">
              <Button variant="primary" size="lg" onClick={() => navigate('/reservations')}>
                Go to Reservations
              </Button>
            </div>
          </div>
        ) : (
          <Alert variant="danger" className="mt-5 text-center">
            Access denied. Only students with <code>@stu.ibu.edu.ba</code> email addresses are allowed.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default HomePage;
