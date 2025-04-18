import React, { useState, useEffect } from 'react';
import Modal from '../components/HomePage/ParkingModal';

const HomePage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [slots, setSlots] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      window.location.href = '/login';
    } else {
      setUser(storedUser);

      // Check email domain
      if (storedUser.email.endsWith('@stu.ibu.edu.ba')) {
        setIsAuthorized(true);

        // Fetch parking slots if authorized
        const fetchSlots = async () => {
          try {
            const response = await fetch('http://localhost:8787/parking_slots/all/');
            const data = await response.json();
            const formattedSlots = data.map(slot => ({
              id: slot.id,
              name: slot.slot_code,
              available: slot.is_available,
            }));
            setSlots(formattedSlots);
          } catch (error) {
            console.error('Error fetching parking slots:', error);
          }
        };

        fetchSlots();
      } else {
        setIsAuthorized(false);
      }
    }
  }, []);

  const handleSlotClick = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setShowModal(true);
    }
  };

  if (!user) return null;

  return (
    <div className="homepage-container">
      <h2>Welcome, {user.name} 👋</h2>

      {isAuthorized ? (
        <>
          <p>Select a parking slot from the map below to reserve.</p>

          <div className="slots-grid">
            {slots.length === 0 ? (
              <p>Loading parking slots...</p>
            ) : (
              slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`slot ${slot.available ? 'available' : 'unavailable'}`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot.name}
                </div>
              ))
            )}
          </div>

          {showModal && (
            <Modal
              slot={selectedSlot}
              user={user}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      ) : (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          You cannot enter this.
        </p>
      )}
    </div>
  );
};

export default HomePage;
