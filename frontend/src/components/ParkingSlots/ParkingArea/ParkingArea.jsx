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

  const columns = 8;
  const roadAfterIndex = 15;

  const topSlots = slots.slice(0, roadAfterIndex + 1);
  const bottomSlots = slots.slice(roadAfterIndex + 1);

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

      {/* Header */}
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

      {/* Top grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        {topSlots.map((slot, index) => (
          <ParkingSlot
            key={slot.slot_code}
            slot={slot}
            isSelected={selectedSlot === slot.slot_code}
            bookingStatus={bookingStatus}
            onSlotClick={onSlotClick}
          />
        ))}
      </div>

      {/* ROAD */}
      <div
        style={{
          margin: '40px 0',
          height: '40px', 
          background: 'linear-gradient(90deg, #d1d5db 0%,rgb(204, 204, 206) 50%, #d1d5db 100%)',
          borderRadius: '6px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Road markings */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            right: '0',
            height: '1px',
            background: 'repeating-linear-gradient(90deg, #ffffff 0, #ffffff 20px, transparent 20px, transparent 40px)',
            transform: 'translateY(-50%)'
          }}
        />
      </div>

      {/* Bottom grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '12px',
        justifyContent: 'center'
      }}>
        {bottomSlots.map((slot, index) => (
          <ParkingSlot
            key={slot.slot_code}
            slot={slot}
            isSelected={selectedSlot === slot.slot_code}
            bookingStatus={bookingStatus}
            onSlotClick={onSlotClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ParkingArea;
