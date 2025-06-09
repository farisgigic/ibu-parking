// src/ParkingSlotBooking.jsx
import React, { useState, useEffect } from 'react';
import Header from './../../components/ParkingSlots/Header/Header';
import ParkingArea from './../../components/ParkingSlots/ParkingArea/ParkingArea';
import BookingDetails from './../../components/ParkingSlots/BookingDetails/BookingDetails';
import Toast from './../../components/ParkingSlots/Toast';


const ParkingSlotBooking = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setTimeout(() => {
        const mockData = [
          ...Array.from({length: 12}, (_, i) => ({ slot_code: `A${i + 1}`, section: 'L1', type: 'professor parking space', is_available: Math.random() > 0.3 })),
          ...Array.from({length: 24}, (_, i) => ({ slot_code: `B${i + 1}`, section: 'L1', type: 'student parking', is_available: Math.random() > 0.4 })),
          ...Array.from({length: 12}, (_, i) => ({ slot_code: `C${i + 1}`, section: 'L2', type: 'professor parking space', is_available: Math.random() > 0.3 })),
          ...Array.from({length: 24}, (_, i) => ({ slot_code: `D${i + 1}`, section: 'L2', type: 'student parking', is_available: Math.random() > 0.4 }))
        ];
        setParkingSlots(mockData);
        setLoading(false);
    }, 1000);
  }, []);

  const organizeSlots = () => {
    const organized = { l1Professor: [], l1Student: [], l2Professor: [], l2Student: [] };
    parkingSlots.forEach(slot => {
      const slotData = { id: slot.slot_code, status: slot.is_available ? 'available' : 'not-available', type: slot.type, section: slot.section };
      if (slot.section === 'L1' && slot.type === 'professor parking space') organized.l1Professor.push(slotData);
      else if (slot.section === 'L1' && slot.type === 'student parking') organized.l1Student.push(slotData);
      else if (slot.section === 'L2' && slot.type === 'professor parking space') organized.l2Professor.push(slotData);
      else if (slot.section === 'L2' && slot.type === 'student parking') organized.l2Student.push(slotData);
    });
    return organized;
  };

  const handleSlotClick = (id, status) => {
    if (status !== 'available' || bookingStatus !== 'selecting') return;
    setSelectedSlot(id);
    setTotalAmount(50);
  };

  const handleBookingButtonClick = () => {
    if (bookingStatus === 'idle') {
      setBookingStatus('selecting');
    } else if (bookingStatus === 'selecting' && selectedSlot) {
      setBookingStatus('confirmed');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const getButtonText = () => {
    if (bookingStatus === 'idle') return 'Start Booking';
    if (bookingStatus === 'selecting') return 'Confirm Booking';
    if (bookingStatus === 'confirmed') return 'Booking Confirmed';
    return 'Start Booking';
  };

  const isButtonDisabled = () => (bookingStatus === 'selecting' && !selectedSlot) || bookingStatus === 'confirmed';

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px' }}>Loading parking slots...</div>;
  }

  if (error) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#ef5b67' }}>Error: {error}</div>;
  }

  const slots = organizeSlots();
  const toastMessage = <>🎉 You have selected slot <strong>{selectedSlot}</strong>. Visit Student Affairs Office to complete payment.</>;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <Header />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(650px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          {/* FIX: Pass props explicitly with the correct names */}
          <ParkingArea icon="🎓" title="L1 - Professor Parking" slots={slots.l1Professor} gridClassName="professor-grid" onSlotClick={handleSlotClick} selectedSlot={selectedSlot} bookingStatus={bookingStatus} />
          <ParkingArea icon="🎒" title="L1 - Student Parking" slots={slots.l1Student} gridClassName="student-grid" onSlotClick={handleSlotClick} selectedSlot={selectedSlot} bookingStatus={bookingStatus} />
          <ParkingArea icon="🎓" title="L2 - Professor Parking" slots={slots.l2Professor} gridClassName="professor-grid" onSlotClick={handleSlotClick} selectedSlot={selectedSlot} bookingStatus={bookingStatus} />
          <ParkingArea icon="🎒" title="L2 - Student Parking" slots={slots.l2Student} gridClassName="student-grid" onSlotClick={handleSlotClick} selectedSlot={selectedSlot} bookingStatus={bookingStatus} />
        </div>
        
        <BookingDetails
          selectedSlot={selectedSlot}
          totalAmount={totalAmount}
          buttonText={getButtonText()}
          isButtonDisabled={isButtonDisabled()}
          onBook={handleBookingButtonClick}
        />
      </div>
      
      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ParkingSlotBooking;