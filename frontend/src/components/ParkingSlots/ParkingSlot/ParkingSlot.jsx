// src/components/ParkingSlot.jsx
import React from 'react';

const ParkingSlot = ({ slot, isSelected, bookingStatus, onSlotClick }) => {
  const isClickable = bookingStatus === 'selecting' && slot.status === 'available';

  const getSlotClass = () => {
    if (isSelected) return 'parking-slot selected';
    if (bookingStatus === 'confirmed') return 'parking-slot locked';
    if (slot.status === 'available') return 'parking-slot available';
    return 'parking-slot not-available';
  };

  return (
    <div
      key={slot.id}
      className={getSlotClass()}
      onClick={() => onSlotClick(slot.id, slot.status)}
      style={{
        cursor: isClickable ? 'pointer' : 'not-allowed',
      }}
      title={`${slot.id} - ${slot.status}`}
    >
      <div className="slot-label">{slot.id}</div>
      <div className="car-icon">🚗</div>
      <div className="slot-status">
        {slot.status === 'available' ? '✓' : '✗'}
      </div>
    </div>
  );
};

export default ParkingSlot;