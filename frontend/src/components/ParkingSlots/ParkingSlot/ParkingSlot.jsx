const ParkingSlot = ({ slot, isSelected, bookingStatus, onSlotClick }) => {
  const isClickable = bookingStatus === 'selecting' && slot.is_available && !slot.is_locked && slot.status !== 'pending';
  const getSlotStatusIcon = (slot) => {
    if (slot.is_locked) return '🔒';
    if (slot.status === 'pending') return '❔';
    if (slot.is_available) return '✓';
    return '✗';
  };

  const getSlotClass = () => {
    if (isSelected) return 'parking-slot selected';
    if (slot.status == "pending") return 'parking-slot pending';                // yellow
    if (slot.is_locked) return 'parking-slot locked';                            // grey
    if (slot.is_available && !slot.is_locked) return 'parking-slot available';   // green
    return 'parking-slot not-available';                                         // red
  };

  return (
    <div
      key={slot.slot_code}
      className={getSlotClass()}
      onClick={() =>
        isClickable && onSlotClick(slot.slot_code, slot.is_available ? 'available' : 'not-available')
      }
      style={{
        cursor: isClickable ? 'pointer' : 'not-allowed',
        backgroundColor: slot.is_locked ? '#a0a0a0' : undefined, // grey background if locked
        opacity: slot.is_locked ? 0.6 : 1,
        userSelect: 'none',
      }}
      title={
        slot.is_locked
          ? `Slot ${slot.slot_code} is locked`
          : slot.is_available
            ? `Slot ${slot.slot_code} is available`
            : `Slot ${slot.slot_code} is not available`
      }
    >
      <div className="slot-label">{slot.slot_code}</div>
      <div className="car-icon">🚗</div>
      <div className="slot-status">{getSlotStatusIcon(slot)}</div>
    </div>
  );
};

export default ParkingSlot;
