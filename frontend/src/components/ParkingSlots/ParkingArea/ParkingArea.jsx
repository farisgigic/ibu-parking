import React from 'react';
import ParkingSlot from '../ParkingSlot/ParkingSlot';

const ParkingArea = ({
  icon,
  title,
  slots,
  selectedSlot,
  bookingStatus,
  onSlotClick
}) => {
  const availableCount = slots.filter(s => s.is_available && !s.is_locked).length;
  const totalCount = slots.length;

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'transform 0.3s ease'
    }}>
      {/* Parking Area Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>{icon}</span>
          <h3 style={{ 
            margin: '0', 
            fontSize: '20px', 
            fontWeight: '600',
            color: '#333'
          }}>
            {title}
          </h3>
        </div>
        <div style={{
          backgroundColor: '#e8f5e8',
          color: '#2e7d32',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          {availableCount} / {totalCount} Available
        </div>
      </div>
      
      {/* Parking Slots Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: '12px',
        justifyContent: 'center'
      }}>
        {slots.map(slot => (
          <ParkingSlot
            key={slot.id}
            slot={slot}
            isSelected={selectedSlot === slot.id}
            bookingStatus={bookingStatus}
            onClick={onSlotClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ParkingArea;