import React, { useEffect, useState } from 'react';
import studentParkingImage from '@images/parking.jpg';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }, 5000); // Check every 5 seconds
  
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
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🚗 View Parking</Card.Title>
                  <Card.Text>
                    See real-time availability of student parking slots on campus.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🗓️ Reserve a Slot</Card.Title>
                  <Card.Text>
                    Secure your spot in advance and avoid last-minute hassle.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>📅 Reservation History</Card.Title>
                  <Card.Text>
                    Track your past bookings and get organized!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

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
