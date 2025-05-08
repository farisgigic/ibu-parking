import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from "../../assets/data/API_BASE_URL";
import { Toast, ToastContainer } from 'react-bootstrap';

const ParkingSlotBooking = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchParkingSlots = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL + '/parking_slots/all/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setParkingSlots(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching parking slots:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchParkingSlots();
  }, []);

  const organizeSlots = () => {
    const organizedSlots = {
      pillar1: [],
      pillar2: [],
      pillar3: [],
      pillar4: []
    };

    if (loading || !parkingSlots.length) return organizedSlots;

    parkingSlots.forEach(slot => {
      const slotData = {
        id: slot.slot_code,
        status: getSlotStatus(slot),
        empty: false,
        type: slot.type,
        section: slot.section
      };

      if (slot.section === 'L1' && slot.type === 'professor parking space') {
        organizedSlots.pillar1.push(slotData);
      } else if (slot.section === 'L1' && slot.type === 'student parking') {
        organizedSlots.pillar2.push(slotData);
      } else if (slot.section === 'L2' && slot.type === 'professor parking space') {
        organizedSlots.pillar3.push(slotData);
      } else if (slot.section === 'L2' && slot.type === 'student parking') {
        organizedSlots.pillar4.push(slotData);
      }
    });

    return organizedSlots;
  };

  const groupSlots = (slotsArray, groupSize = 8) => {
    const groups = [];
    for (let i = 0; i < slotsArray.length; i += groupSize) {
      groups.push(slotsArray.slice(i, i + groupSize));
    }
    return groups;
  };

  const getSlotStatus = (slot) => {
    return slot.is_available ? 'available' : 'not-available';
  };

  const handleSlotClick = (id, status) => {
    if (status !== 'available' || bookingStatus !== 'selecting' || bookingStatus === 'confirmed') {
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

  const renderSlot = (slot) => {
    const isSelected = selectedSlot === slot.id;
    const isClickable =
      bookingStatus === 'selecting' &&
      slot.status === 'available' &&
      (!selectedSlot || isSelected);

    const getSlotClass = () => {
      if (isSelected) return 'slot selected';
      if (bookingStatus === 'selecting' && selectedSlot && !isSelected) return 'slot locked';
      if (bookingStatus === 'confirmed') return 'slot locked';
      if (slot.status === 'available') return 'slot available';
      return 'slot not-available';
    };

    return (
      <div
        key={slot.id}
        className={getSlotClass()}
        onClick={() => handleSlotClick(slot.id, slot.status)}
        style={{
          pointerEvents: isClickable ? 'auto' : 'none',
          cursor: isClickable ? 'pointer' : 'not-allowed'
        }}
      >
        {slot.id}
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
    return <div className="loading">Loading parking slots...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="parking-booking-container">
      <div className="main-content">
        <div className="container-fluid">
          <div className="booking-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold">BOOK YOUR SLOT</h3>
              <div className="slot-legend d-flex align-items-center">
                <div className="d-flex align-items-center me-3">
                  <span className="legend-icon your-selection"></span>
                  <span>Your Selection</span>
                </div>
                <div className="d-flex align-items-center me-3">
                  <span className="legend-icon booked"></span>
                  <span>Booked</span>
                </div>
                <div className="d-flex align-items-center me-3">
                  <span className="legend-icon available"></span>
                  <span>Available</span>
                </div>
                <div className="d-flex align-items-center me-3">
                  <span className="legend-icon not-available"></span>
                  <span>Not Available</span>
                </div>
                <div className="d-flex align-items-center me-3">
                  <span className="legend-icon locked"></span>
                  <span>Locked</span>
                </div>
              </div>
            </div>

            <div className="parking-layout">
              <div className="row">
                <div className="col-5">
                  {groupSlots(slots.pillar1).map((group, index) => (
                    <div className="slot-group" key={`pillar1-group-${index}`}>
                      {group.map(slot => renderSlot(slot))}
                    </div>
                  ))}
                  <div className="text-center my-3">PILLAR NO 1</div>
                  {groupSlots(slots.pillar3).map((group, index) => (
                    <div className="slot-group" key={`pillar3-group-${index}`}>
                      {group.map(slot => renderSlot(slot))}
                    </div>
                  ))}
                </div>
                <div className="col-2 d-flex flex-column justify-content-between align-items-center">
                  <div className="text-center mb-5">ENTRY</div>
                  <div className="divider"></div>
                  <div className="text-center mt-5">EXIT</div>
                </div>
                <div className="col-5">
                  {groupSlots(slots.pillar2).map((group, index) => (
                    <div className="slot-group" key={`pillar2-group-${index}`}>
                      {group.map(slot => renderSlot(slot))}
                    </div>
                  ))}
                  <div className="text-center my-3">PILLAR NO 2</div>
                  {groupSlots(slots.pillar4).map((group, index) => (
                    <div className="slot-group" key={`pillar4-group-${index}`}>
                      {group.map(slot => renderSlot(slot))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="booking-details mt-5">
              <div className="row">
                <div className="col-md-3">
                  <h4 className="fw-bold">BOOKING DETAILS</h4>
                </div>
                <div className="col-md-9">
                  <div className="d-flex justify-content-end align-items-center">
                    <div className="detail-item me-5">
                      <div className="text-muted">Slot Name</div>
                      <div className="fw-bold">{selectedSlot || 'Not selected'}</div>
                    </div>
                    <div className="detail-item me-5">
                      <div className="text-muted">Total Amount</div>
                      <div className="fw-bold">BAM {totalAmount}</div>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={handleBookingButtonClick}
                      disabled={isButtonDisabled()}
                    >
                      {getButtonText()}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide bg="info">
          <Toast.Body className="text-white">
            You have selected slot <strong>{selectedSlot}</strong>. Visit Student Affair Office and pay.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ParkingSlotBooking;
