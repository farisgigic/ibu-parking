// src/components/ParkingArea.jsx
import React from 'react';
import ParkingSlot from '../ParkingSlot/ParkingSlot'; 

const ParkingArea = ({ icon, title, slots, gridClassName, selectedSlot, bookingStatus, onSlotClick }) => {
  const availableCount = slots.filter(s => s.status === 'available').length;
  const totalCount = slots.length;

  return (
    <div className="parking-area-card">
      <div className="area-header">
        <div className="header-icon">{icon}</div>
        <h2>{title}</h2>
        <div className="area-stats">
          {availableCount} / {totalCount} Available
        </div>
      </div>
      <div className="slots-container">
        <div className={`slots-grid ${gridClassName}`}>
          {slots.map(slot => (
            <ParkingSlot
              key={slot.id}
              slot={slot}
              isSelected={selectedSlot === slot.id}
              bookingStatus={bookingStatus}
              onSlotClick={onSlotClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingArea;