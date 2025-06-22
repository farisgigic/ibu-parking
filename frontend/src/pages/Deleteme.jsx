import { useState, useEffect } from 'react';

const ParkingBookingSystem = () => {
  const [currentView, setCurrentView] = useState('selection'); // 'selection' or 'booking'
  const [selectedSection, setSelectedSection] = useState(null);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Mock data for parking sections
  const parkingSections = [
    {
      id: 'l1-professor',
      title: 'L1 - Professor Parking',
      icon: '🎓',
      totalSlots: 12,
      availableSlots: 8,
      type: 'professor parking space',
      section: 'L1',
      color: 'from-blue-500 to-blue-600',
      description: 'Reserved for faculty members and professors',
      rules: [
        'Valid faculty ID required',
        'Monthly subscription only',
        'Reserved 24/7 access',
        'Close to main building entrance'
      ]
    },
    {
      id: 'l1-student',
      title: 'L1 - Student Parking',
      icon: '🎒',
      totalSlots: 24,
      availableSlots: 15,
      type: 'student parking',
      section: 'L1',
      color: 'from-green-500 to-green-600',
      description: 'General student parking area',
      rules: [
        'Valid student ID required',
        'Daily or monthly booking available',
        'Access during university hours',
        'Ground level parking'
      ]
    },
    {
      id: 'l2-professor',
      title: 'L2 - Professor Parking',
      icon: '🎓',
      totalSlots: 12,
      availableSlots: 5,
      type: 'professor parking space',
      section: 'L2',
      color: 'from-purple-500 to-purple-600',
      description: 'Upper level professor parking',
      rules: [
        'Valid faculty ID required',
        'Monthly subscription only',
        'Covered parking available',
        'Elevator access to floors'
      ]
    },
    {
      id: 'l2-student',
      title: 'L2 - Student Parking',
      icon: '🎒',
      totalSlots: 24,
      availableSlots: 12,
      type: 'student parking',
      section: 'L2',
      color: 'from-orange-500 to-orange-600',
      description: 'Upper level student parking',
      rules: [
        'Valid student ID required',
        'Daily or monthly booking available',
        'Second floor location',
        'Weather protected'
      ]
    }
  ];

  // Generate mock slots for selected section
  useEffect(() => {
    if (selectedSection) {
      const section = parkingSections.find(s => s.id === selectedSection);
      if (section) {
        const slots = [];
        const slotPrefix = section.section === 'L1' 
          ? (section.type === 'professor parking space' ? 'A' : 'B')
          : (section.type === 'professor parking space' ? 'C' : 'D');
        
        for (let i = 1; i <= section.totalSlots; i++) {
          slots.push({
            slot_code: `${slotPrefix}${i}`,
            section: section.section,
            type: section.type,
            status: Math.random() > 0.4 ? 'available' : 'not-available',
            is_locked: false
          });
        }
        setParkingSlots(slots);
      }
    }
  }, [selectedSection]);

  const handleSectionSelect = (sectionId) => {
    setSelectedSection(sectionId);
    setCurrentView('booking');
    setBookingStatus('idle');
    setSelectedSlot(null);
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
    setSelectedSection(null);
    setSelectedSlot(null);
    setBookingStatus('idle');
  };

  const handleSlotClick = (slotCode, status) => {
    if (status !== 'available' || bookingStatus !== 'selecting') return;
    setSelectedSlot(slotCode);
  };

  const handleBookingButtonClick = () => {
    if (bookingStatus === 'idle') {
      setBookingStatus('selecting');
    } else if (bookingStatus === 'selecting' && selectedSlot) {
      setBookingStatus('confirmed');
      setToastMessage(`🎉 Successfully booked slot ${selectedSlot}! Please visit Student Affairs Office to complete payment.`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setBookingStatus('idle');
        setSelectedSlot(null);
      }, 5000);
    }
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

  // Section Selection View
  if (currentView === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🚗 Parking Slot Booking System
            </h1>
            <p className="text-xl text-gray-600">
              Choose your preferred parking section
            </p>
          </div>

          {/* Parking Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {parkingSections.map((section) => (
              <div
                key={section.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => handleSectionSelect(section.id)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl bg-white bg-opacity-20 rounded-full p-3">
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{section.title}</h3>
                          <p className="text-white text-opacity-90">{section.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{section.availableSlots}</div>
                        <div className="text-sm text-white text-opacity-80">Available</div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-500">
                        Total Slots: {section.totalSlots}
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-500 mr-2">Availability:</div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${section.color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${(section.availableSlots / section.totalSlots) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Parking Rules:</h4>
                      <ul className="space-y-1">
                        {section.rules.slice(0, 2).map((rule, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 group-hover:bg-gray-700">
                      Select This Section →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📋 General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">💳</div>
                <h4 className="font-semibold text-gray-800 mb-2">Payment</h4>
                <p className="text-sm text-gray-600">Visit Student Affairs Office to complete payment after booking</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⏰</div>
                <h4 className="font-semibold text-gray-800 mb-2">Booking Hours</h4>
                <p className="text-sm text-gray-600">24/7 online booking available. Office hours: 8AM - 5PM</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-800 mb-2">Support</h4>
                <p className="text-sm text-gray-600">Need help? Contact student services or visit our help desk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Booking View
  const currentSection = parkingSections.find(s => s.id === selectedSection);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackToSelection}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span>←</span>
          <span>Back to Section Selection</span>
        </button>

        {/* Section Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className={`text-4xl bg-gradient-to-r ${currentSection.color} text-white rounded-full p-4`}>
                {currentSection.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{currentSection.title}</h2>
                <p className="text-gray-600">{currentSection.description}</p>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rules and Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Parking Rules & Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Reservation Rules:</h4>
              <ul className="space-y-2">
                {currentSection.rules.map((rule, index) => (
                  <li key={index} className="text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2 mt-0.5">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Additional Information:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-0.5">ℹ</span>
                  <span>Monthly fee: BAM 50</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-0.5">ℹ</span>
                  <span>Cancellation allowed up to 24h before</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-0.5">ℹ</span>
                  <span>Security cameras monitor all areas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-0.5">ℹ</span>
                  <span>Report issues to security immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Parking Slots */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Available Parking Slots</h3>
          <div className={`grid gap-4 ${
            currentSection.type === 'professor parking space' 
              ? 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8' 
              : 'grid-cols-4 md:grid-cols-8 lg:grid-cols-12'
          }`}>
            {parkingSlots.map((slot) => {
              const isSelected = selectedSlot === slot.slot_code;
              const isClickable = bookingStatus === 'selecting' && slot.status === 'available';
              
              return (
                <div
                  key={slot.slot_code}
                  className={`
                    relative aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center font-bold text-sm
                    ${isSelected 
                      ? 'bg-blue-500 text-white border-blue-600 transform scale-105 shadow-lg' 
                      : slot.status === 'available' 
                        ? 'bg-green-500 text-white border-green-600 hover:scale-105 hover:shadow-md' 
                        : 'bg-red-500 text-white border-red-600 cursor-not-allowed opacity-75'
                    }
                    ${bookingStatus === 'confirmed' ? 'pointer-events-none opacity-60' : ''}
                  `}
                  onClick={() => handleSlotClick(slot.slot_code, slot.status)}
                  title={`${slot.slot_code} - ${slot.status}`}
                >
                  <div className="text-xs mb-1">{slot.slot_code}</div>
                  <div className="text-lg">🚗</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-xl font-bold text-gray-800">Booking Details</h3>
            
            <div className="flex items-center space-x-8">
              <div>
                <div className="text-sm text-gray-500">Selected Slot</div>
                <div className="font-bold text-lg text-blue-600">
                  {selectedSlot || 'None selected'}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Monthly Fee</div>
                <div className="font-bold text-lg text-gray-800">BAM 50</div>
              </div>
              
              <button
                onClick={handleBookingButtonClick}
                disabled={isButtonDisabled()}
                className={`
                  px-6 py-3 rounded-lg font-bold transition-all duration-200
                  ${isButtonDisabled() 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                  }
                `}
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md animate-pulse">
          <div className="flex items-center justify-between">
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingBookingSystem;