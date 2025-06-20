import { useState, useEffect } from 'react';
import Header from './../../components/ParkingSlots/Header/Header';
import ParkingArea from './../../components/ParkingSlots/ParkingArea/ParkingArea';
import BookingDetails from './../../components/ParkingSlots/BookingDetails/BookingDetails';
import Toast from './../../components/ParkingSlots/Toast';
import MonthCalendar from '../../components/ParkingSlots/MonthCalendar/MonthCalendar';

import { studentApi } from './../../api/StudentApi';
import { reservationApi } from './../../api/ReservationApi';
import { slotsApi } from '../../api/ParkingSlotsApi';
const ParkingSlotBooking = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchParkingSlots = async () => {
    try {
      setLoading(true);
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const data = await reservationApi.getSlotsWithMonthlyReservations(month, year);
      setParkingSlots(data);
    } catch (err) {
      setError(err.message || 'Failed to load parking slots');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingSlots();
  }, [selectedDate]);


  const organizeSlots = () => {
    const organized = { l1Professor: [], l1Student: [], l2Professor: [], l2Student: [] };

    const sortSlotsByNumber = (slots) => {
      return slots.sort((a, b) => {
        const numA = parseInt(a.slot_code.replace(/[A-Z]/g, ''));
        const numB = parseInt(b.slot_code.replace(/[A-Z]/g, ''));
        return numA - numB;
      });
    };

    parkingSlots.forEach(slot => {
      // KLJUČNA PROMJENA #1: Nemojte kreirati novi, nepotpuni objekt.
      // Proslijedite cijeli `slot` objekt koji ste dobili s backenda.
      // Tako će svi propertiji, uključujući `status`, biti sačuvani.
      if (slot.section === 'L1' && slot.type === 'professor parking space') {
        organized.l1Professor.push(slot);
      } else if (slot.section === 'L1' && slot.type === 'student parking') {
        organized.l1Student.push(slot);
      } else if (slot.section === 'L2' && slot.type === 'professor parking space') {
        organized.l2Professor.push(slot);
      } else if (slot.section === 'L2' && slot.type === 'student parking') {
        organized.l2Student.push(slot);
      }
    });

    organized.l1Professor = sortSlotsByNumber(organized.l1Professor);
    organized.l1Student = sortSlotsByNumber(organized.l1Student);
    organized.l2Professor = sortSlotsByNumber(organized.l2Professor);
    organized.l2Student = sortSlotsByNumber(organized.l2Student);

    return organized;
  };

  const handleSlotClick = (id, status) => {
    // Vaša logika ostaje ista
    if (status !== 'available' || bookingStatus !== 'selecting') return;
    const slot = parkingSlots.find(s => s.slot_code === id);
    if (slot && slot.is_locked) return;
    setSelectedSlot(id);
    setTotalAmount(50);
  };

  const handleBookingButtonClick = async () => {
    const local = localStorage.getItem("user");
    const parsedStudent = JSON.parse(local);
    const user_email = parsedStudent?.email;

    const student = await studentApi.getStudentByEmail(user_email);
    const user_id = student.student_id;

    if (bookingStatus === 'idle') {
      setBookingStatus('selecting');
    } else if (bookingStatus === 'selecting' && selectedSlot) {
      try {
        const slotData = await slotsApi.getBySlotCode(selectedSlot);
        const slot_id = slotData.id;

        const startDate = new Date(selectedDate);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        await reservationApi.reserveSlot({
          slotId: slot_id,
          studentId: user_id,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        });

        // KLJUČNA PROMJENA #2: Nakon što je rezervacija uspješno poslana,
        // pozovite `fetchParkingSlots` da osvježite stanje s novim podacima sa servera!
        await fetchParkingSlots();

        setBookingStatus('confirmed');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
        setSelectedSlot(null); // Resetiraj odabir nakon uspješne rezervacije
      } catch (error) {
        console.error('Booking failed:', error);
        alert('Failed to book the slot. Please try again.');
      }
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