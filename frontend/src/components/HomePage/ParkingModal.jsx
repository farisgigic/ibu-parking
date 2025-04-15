import React from 'react';

const ParkingModal = ({ slot, user, onClose }) => {
  const handleReserve = () => {
    alert(`Parking reserved for ${user.name} at slot ${slot.name}`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Reserve Parking Slot: {slot.name}</h3>
        <p>User: {user.name}</p>
        <p>Email: {user.email}</p>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleReserve}>Reserve</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ParkingModal;
