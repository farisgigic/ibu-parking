// src/ParkingSlotBooking.jsx
import React, { useState, useEffect } from 'react';
import Header from './../../components/ParkingSlots/Header/Header';
import ParkingArea from './../../components/ParkingSlots/ParkingArea/ParkingArea';
import BookingDetails from './../../components/ParkingSlots/BookingDetails/BookingDetails';
import Toast from './../../components/ParkingSlots/Toast';
import { slotsApi } from './../../api/ParkingSlotsApi';

// Month Calendar Component
const MonthCalendar = ({ currentDate, onDateChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Add default date if currentDate is undefined
  const safeCurrentDate = currentDate || new Date();
  const currentMonth = safeCurrentDate.getMonth();
  const currentYear = safeCurrentDate.getFullYear();

  const goToPreviousMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const goToCurrentMonth = () => {
    const today = new Date();
    const newDate = new Date(today.getFullYear(), today.getMonth(), 1);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '30px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <button
          onClick={goToPreviousMonth}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ‹
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <h2 style={{
            margin: '0',
            fontSize: '24px',
            fontWeight: '600',
            color: '#333',
            minWidth: '200px',
            textAlign: 'center'
          }}>
            {months[currentMonth]} {currentYear}
          </h2>

          <button
            onClick={goToCurrentMonth}
            style={{
              backgroundColor: '#f8f9fa',
              color: '#6c757d',
              border: '2px solid #dee2e6',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#e9ecef';
              e.target.style.borderColor = '#adb5bd';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.borderColor = '#dee2e6';
            }}
          >
            Today
          </button>
        </div>

        <button
          onClick={goToNextMonth}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ›
        </button>
      </div>
    </div>
  );
};

const ParkingSlotBooking = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchParkingSlots = async () => {
      try {
        setLoading(true);
        const month = selectedDate.getMonth() + 1; // JS months are 0-indexed
        const year = selectedDate.getFullYear();
        const data = await slotsApi.getAllSlots(month, year);
        setParkingSlots(data);
      } catch (err) {
        setError(err.message || 'Failed to load parking slots');
      } finally {
        setLoading(false);
      }
    };

    fetchParkingSlots();
  }, [selectedDate]); // re-fetch when month changes


  const organizeSlots = () => {
    const organized = { l1Professor: [], l1Student: [], l2Professor: [], l2Student: [] };

    // Sort function to extract number from slot code and sort numerically
    const sortSlotsByNumber = (slots) => {
      return slots.sort((a, b) => {
        const numA = parseInt(a.slot_code.replace(/[A-Z]/g, ''));
        const numB = parseInt(b.slot_code.replace(/[A-Z]/g, ''));
        return numA - numB;
      });
    };

    parkingSlots.forEach(slot => {
      const slotData = {
        id: slot.slot_code,
        slot_code: slot.slot_code,
        is_available: slot.is_available ? true : false,
        is_locked: slot.is_locked || false,
        type: slot.type,
        section: slot.section
      };
      // console.log('Organizing slot:', slotData);
      if (slot.section === 'L1' && slot.type === 'professor parking space') {
        organized.l1Professor.push(slotData);
      } else if (slot.section === 'L1' && slot.type === 'student parking') {
        organized.l1Student.push(slotData);
      } else if (slot.section === 'L2' && slot.type === 'professor parking space') {
        organized.l2Professor.push(slotData);
      } else if (slot.section === 'L2' && slot.type === 'student parking') {
        organized.l2Student.push(slotData);
      }
    });

    // Sort each category by slot number
    organized.l1Professor = sortSlotsByNumber(organized.l1Professor);
    organized.l1Student = sortSlotsByNumber(organized.l1Student);
    organized.l2Professor = sortSlotsByNumber(organized.l2Professor);
    organized.l2Student = sortSlotsByNumber(organized.l2Student);

    return organized;
  };

  const handleSlotClick = (id, status) => {
    // Prevent selection of locked or unavailable slots
    if (status !== 'available' || bookingStatus !== 'selecting') return;

    // Additional check to ensure the slot isn't locked
    const slot = parkingSlots.find(s => s.slot_code === id);
    if (slot && slot.is_locked) return;

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

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

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

        {/* Calendar at the top of the page */}
        <MonthCalendar
          currentDate={selectedDate}
          onDateChange={handleDateChange}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(650px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          <ParkingArea
            icon="🎓"
            title="L1 - Professor Parking"
            slots={slots.l1Professor}
            gridClassName="professor-grid"
            onSlotClick={handleSlotClick}
            selectedSlot={selectedSlot}
            bookingStatus={bookingStatus}
          />
          <ParkingArea
            icon="🎒"
            title="L1 - Student Parking"
            slots={slots.l1Student}
            gridClassName="student-grid"
            onSlotClick={handleSlotClick}
            selectedSlot={selectedSlot}
            bookingStatus={bookingStatus}
          />
          <ParkingArea
            icon="🎓"
            title="L2 - Professor Parking"
            slots={slots.l2Professor}
            gridClassName="professor-grid"
            onSlotClick={handleSlotClick}
            selectedSlot={selectedSlot}
            bookingStatus={bookingStatus}
          />
          <ParkingArea
            icon="🎒"
            title="L2 - Student Parking"
            slots={slots.l2Student}
            gridClassName="student-grid"
            onSlotClick={handleSlotClick}
            selectedSlot={selectedSlot}
            bookingStatus={bookingStatus}
          />
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