import React, { useState, useEffect } from 'react';
import Modal from '../components/HomePage/ParkingModal';

// The state to store the slots data
const HomePage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [slots, setSlots] = useState([]);  // To hold the fetched parking slots

  // Fetch the user and parking slots data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      window.location.href = '/login';
    } else {
      setUser(storedUser);
    }

    // Function to fetch parking slots from the backend API
    const fetchSlots = async () => {
      try {
        const response = await fetch('http://localhost:8787/parking_slots/all/');
        const data = await response.json();
        // Format the data if necessary to match the slot structure
        const formattedSlots = data.map(slot => ({
          id: slot.id,
          name: slot.slot_code,  // Assuming 'slot_code' is the name you want to display
          available: slot.is_available,  // Assuming 'is_available' is the field to check availability
        }));
        setSlots(formattedSlots);
      } catch (error) {
        console.error('Error fetching parking slots:', error);
      }
    };

    fetchSlots();  // Fetch the slots data
  }, []);

  // Handle slot click to open modal
  const handleSlotClick = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setShowModal(true);
    }
  };

  if (!user) return null;  // Return nothing if user is not found

  return (
    <div className="homepage-container">
      <h2>Welcome, {user.name} 👋</h2>
      <p>Select a parking slot from the map below to reserve.</p>

      {/* Slots Grid */}
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

      {/* Show modal if selectedSlot is set */}
      {showModal && (
        <Modal
          slot={selectedSlot}
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
