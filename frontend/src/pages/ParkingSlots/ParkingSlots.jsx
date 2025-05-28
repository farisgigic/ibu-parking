import React, { useState, useEffect } from 'react';

const ParkingSlotBooking = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockData = [
      // L1 Professor spaces (A1-A12)
      ...Array.from({length: 12}, (_, i) => ({
        slot_code: `A${i + 1}`,
        section: 'L1',
        type: 'professor parking space',
        is_available: Math.random() > 0.3
      })),
      // L1 Student spaces (B1-B24)
      ...Array.from({length: 24}, (_, i) => ({
        slot_code: `B${i + 1}`,
        section: 'L1',
        type: 'student parking',
        is_available: Math.random() > 0.4
      })),
      // L2 Professor spaces (C1-C12)
      ...Array.from({length: 12}, (_, i) => ({
        slot_code: `C${i + 1}`,
        section: 'L2',
        type: 'professor parking space',
        is_available: Math.random() > 0.3
      })),
      // L2 Student spaces (D1-D24)
      ...Array.from({length: 24}, (_, i) => ({
        slot_code: `D${i + 1}`,
        section: 'L2',
        type: 'student parking',
        is_available: Math.random() > 0.4
      }))
    ];
    setParkingSlots(mockData);
  }, []);

  const organizeSlots = () => {
    const organizedSlots = {
      l1Professor: [],
      l1Student: [],
      l2Professor: [],
      l2Student: []
    };

    parkingSlots.forEach(slot => {
      const slotData = {
        id: slot.slot_code,
        status: getSlotStatus(slot),
        type: slot.type,
        section: slot.section
      };

      if (slot.section === 'L1' && slot.type === 'professor parking space') {
        organizedSlots.l1Professor.push(slotData);
      } else if (slot.section === 'L1' && slot.type === 'student parking') {
        organizedSlots.l1Student.push(slotData);
      } else if (slot.section === 'L2' && slot.type === 'professor parking space') {
        organizedSlots.l2Professor.push(slotData);
      } else if (slot.section === 'L2' && slot.type === 'student parking') {
        organizedSlots.l2Student.push(slotData);
      }
    });

    return organizedSlots;
  };

  const getSlotStatus = (slot) => {
    return slot.is_available ? 'available' : 'not-available';
  };

  const handleSlotClick = (id, status) => {
    if (status !== 'available' || bookingStatus !== 'selecting') {
      return;
    }
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

  const renderSlot = (slot, index) => {
    const isSelected = selectedSlot === slot.id;
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
        onClick={() => handleSlotClick(slot.id, slot.status)}
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

  const getButtonText = () => {
    if (bookingStatus === 'idle') return 'Start Booking';
    if (bookingStatus === 'selecting') return 'Confirm Booking';
    if (bookingStatus === 'confirmed') return 'Booking Confirmed';
    return 'Start Booking';
  };

  const isButtonDisabled = () => {
    return (bookingStatus === 'selecting' && !selectedSlot) || bookingStatus === 'confirmed';
  };

  const slots = organizeSlots();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px' }}>
        Loading parking slots...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#ef5b67' }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          borderRadius: '20px', 
          padding: '30px', 
          marginBottom: '30px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <h1 style={{ 
              margin: 0, 
              color: '#2d3748', 
              fontWeight: 'bold', 
              fontSize: '32px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🚗 PARKING SLOT BOOKING
            </h1>
            
            {/* Legend */}
            <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', fontSize: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #4299e1, #3182ce)', borderRadius: '50%' }}></div>
                <span>Your Selection</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #48bb78, #38a169)', borderRadius: '50%' }}></div>
                <span>Available</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', background: 'linear-gradient(135deg, #e53e3e, #c53030)', borderRadius: '50%' }}></div>
                <span>Occupied</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#a0aec0', borderRadius: '50%' }}></div>
                <span>Locked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Areas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(650px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          
          {/* L1 Professor Parking */}
          <div className="parking-area-card">
            <div className="area-header">
              <div className="header-icon">🎓</div>
              <h2>L1 - Professor Parking</h2>
              <div className="area-stats">
                {slots.l1Professor.filter(s => s.status === 'available').length} / {slots.l1Professor.length} Available
              </div>
            </div>
            <div className="slots-container">
              <div className="slots-grid professor-grid">
                {slots.l1Professor.map((slot, index) => renderSlot(slot, index))}
              </div>
            </div>
          </div>

          {/* L1 Student Parking */}
          <div className="parking-area-card">
            <div className="area-header">
              <div className="header-icon">🎒</div>
              <h2>L1 - Student Parking</h2>
              <div className="area-stats">
                {slots.l1Student.filter(s => s.status === 'available').length} / {slots.l1Student.length} Available
              </div>
            </div>
            <div className="slots-container">
              <div className="slots-grid student-grid">
                {slots.l1Student.map((slot, index) => renderSlot(slot, index))}
              </div>
            </div>
          </div>

          {/* L2 Professor Parking */}
          <div className="parking-area-card">
            <div className="area-header">
              <div className="header-icon">🎓</div>
              <h2>L2 - Professor Parking</h2>
              <div className="area-stats">
                {slots.l2Professor.filter(s => s.status === 'available').length} / {slots.l2Professor.length} Available
              </div>
            </div>
            <div className="slots-container">
              <div className="slots-grid professor-grid">
                {slots.l2Professor.map((slot, index) => renderSlot(slot, index))}
              </div>
            </div>
          </div>

          {/* L2 Student Parking */}
          <div className="parking-area-card">
            <div className="area-header">
              <div className="header-icon">🎒</div>
              <h2>L2 - Student Parking</h2>
              <div className="area-stats">
                {slots.l2Student.filter(s => s.status === 'available').length} / {slots.l2Student.length} Available
              </div>
            </div>
            <div className="slots-container">
              <div className="slots-grid student-grid">
                {slots.l2Student.map((slot, index) => renderSlot(slot, index))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          borderRadius: '20px', 
          padding: '30px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{ margin: 0, color: '#2d3748', fontSize: '24px' }}>📋 BOOKING DETAILS</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ color: '#718096', fontSize: '14px', marginBottom: '5px' }}>Selected Slot</div>
                <div style={{ 
                  fontWeight: 'bold', 
                  fontSize: '20px', 
                  color: selectedSlot ? '#4299e1' : '#a0aec0',
                  padding: '10px 15px',
                  background: selectedSlot ? 'rgba(66, 153, 225, 0.1)' : 'rgba(160, 174, 192, 0.1)',
                  borderRadius: '10px',
                  minWidth: '100px',
                  textAlign: 'center'
                }}>
                  {selectedSlot || 'Not selected'}
                </div>
              </div>
              
              <div>
                <div style={{ color: '#718096', fontSize: '14px', marginBottom: '5px' }}>Total Amount</div>
                <div style={{ 
                  fontWeight: 'bold', 
                  fontSize: '20px', 
                  color: '#2d3748',
                  padding: '10px 15px',
                  background: 'rgba(45, 55, 72, 0.05)',
                  borderRadius: '10px',
                  minWidth: '100px',
                  textAlign: 'center'
                }}>
                  BAM {totalAmount}
                </div>
              </div>
              
              <button
                onClick={handleBookingButtonClick}
                disabled={isButtonDisabled()}
                style={{
                  background: isButtonDisabled() 
                    ? 'linear-gradient(135deg, #a0aec0, #718096)' 
                    : 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '15px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  cursor: isButtonDisabled() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isButtonDisabled() ? 'none' : '0 10px 20px rgba(102, 126, 234, 0.3)',
                  transform: isButtonDisabled() ? 'none' : 'translateY(-2px)'
                }}
                onMouseEnter={(e) => {
                  if (!isButtonDisabled()) {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isButtonDisabled()) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
                  }
                }}
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          padding: '20px 25px',
          borderRadius: '15px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease-out',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px' }}>
              🎉 You have selected slot <strong>{selectedSlot}</strong>. Visit Student Affairs Office to complete payment.
            </span>
            <button
              onClick={() => setShowToast(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                marginLeft: '15px'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .parking-area-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .parking-area-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }

        .area-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
        }

        .header-icon {
          font-size: 40px;
          padding: 15px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .area-header h2 {
          margin: 0;
          color: #2d3748;
          font-size: 24px;
          font-weight: bold;
          flex: 1;
        }

        .area-stats {
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          padding: 10px 15px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 14px;
        }

        .slots-container {
          background: #f7fafc;
          border-radius: 15px;
          padding: 20px;
          min-height: 300px;
        }

        .slots-grid {
          display: grid;
          gap: 15px;
          height: 100%;
        }

        .professor-grid {
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
        }

        .student-grid {
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(4, 1fr);
        }

        .parking-slot {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-weight: bold;
          transition: all 0.3s ease;
          position: relative;
          min-height: 70px;
          cursor: pointer;
          border: 3px solid transparent;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .parking-slot.available {
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
        }

        .parking-slot.available:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 25px rgba(72, 187, 120, 0.4);
        }

        .parking-slot.not-available {
          background: linear-gradient(135deg, #e53e3e, #c53030);
          color: white;
          cursor: not-allowed;
          opacity: 0.8;
        }

        .parking-slot.selected {
          background: linear-gradient(135deg, #4299e1, #3182ce);
          color: white;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 30px rgba(66, 153, 225, 0.5);
          border: 3px solid #ffffff;
        }

        .parking-slot.locked {
          background: linear-gradient(135deg, #a0aec0, #718096);
          color: white;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .slot-label {
          font-size: 16px;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .car-icon {
          font-size: 24px;
          margin-bottom: 3px;
        }

        .slot-status {
          font-size: 14px;
          font-weight: bold;
        }

        @media (max-width: 1200px) {
          .parking-area-card {
            min-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .slots-grid {
            gap: 10px;
          }
          
          .professor-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 1fr);
          }
          
          .student-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(6, 1fr);
          }
          
          .parking-slot {
            min-height: 60px;
          }

          .slot-label {
            font-size: 14px;
          }

          .car-icon {
            font-size: 20px;
          }

          .header-icon {
            font-size: 30px;
            padding: 10px;
          }

          .area-header h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ParkingSlotBooking;