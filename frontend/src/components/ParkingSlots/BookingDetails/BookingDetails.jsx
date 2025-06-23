const BookingDetails = ({ selectedSlot, totalAmount, buttonText, isButtonDisabled, onBook, onCancel }) => {
    // Check if booking has started (when button text changes from "Start Booking")
    const isBookingStarted = buttonText !== "Start Booking";
    
    const handleCancel = () => {
        // Refresh the page when cancel is clicked
        window.location.reload();
    };

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <h2 style={{ margin: 0, color: '#2d3748', fontSize: '24px' }}>📋 BOOKING DETAILS</h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
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

                    <div style={{ display: 'flex', gap: '15px', marginTop: '27px' }}>
                        <button
                            onClick={onBook}
                            disabled={isButtonDisabled}
                            style={{
                                background: isButtonDisabled
                                    ? 'linear-gradient(135deg, #a0aec0, #718096)'
                                    : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '15px 35px',
                                borderRadius: '15px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: isButtonDisabled ? 'none' : '0 10px 20px rgba(102, 126, 234, 0.3)',
                                transform: isButtonDisabled ? 'none' : 'translateY(-2px)'
                            }}
                            onMouseEnter={(e) => {
                                if (!isButtonDisabled) {
                                    e.target.style.transform = 'translateY(-4px)';
                                    e.target.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isButtonDisabled) {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
                                }
                            }}
                        >
                            {buttonText}
                        </button>

                        {/* Show Cancel button only when booking has started */}
                        {isBookingStarted && (
                            <button
                                onClick={handleCancel}
                                style={{
                                    background: 'linear-gradient(135deg, #f56565, #c53030)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '15px 30px',
                                    borderRadius: '15px',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 20px rgba(245, 101, 101, 0.3)',
                                    transform: 'translateY(-2px)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-4px)';
                                    e.target.style.boxShadow = '0 15px 30px rgba(245, 101, 101, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 10px 20px rgba(245, 101, 101, 0.3)';
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;