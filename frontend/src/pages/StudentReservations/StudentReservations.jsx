import { useState, useEffect } from 'react';
import { reservationApi } from '@api/ReservationApi';
import { studentApi } from '@api/StudentApi';
import LogoutModal from '@components/LogoutConfirmModal/LogoutModal'; 

const StudentReservations = ({ onViewDetails }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [studentId, setStudentId] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);

                const student = await studentApi.getStudentByEmail(user.email);
                const studentId = student?.student_id;

                if (!studentId) {
                    setError('Student not found.');
                    return;
                }

                const data = await reservationApi.getReservationsByStudentId(studentId);
                console.log('Fetched bookings:', data);
                setBookings(data);
            } catch (err) {
                setError('Failed to load bookings. Please try again later.');
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchBookings();
        }
    }, [user?.email]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleViewDetails = (booking) => {
        if (onViewDetails) {
            onViewDetails(booking);
        } else {
            setSelectedBooking(booking);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBooking(null);
    };

    const handleCancelBooking = (booking) => {
        setBookingToCancel(booking);
        setShowCancelModal(true);
    };

    const confirmCancelBooking = async () => {
        if (!bookingToCancel) return;

        try {
            setCancelLoading(true);
            await reservationApi.deleteReservation(bookingToCancel.id);
            
            // Remove the cancelled booking from the state
            setBookings(prevBookings => 
                prevBookings.filter(booking => booking.id !== bookingToCancel.id)
            );
            
            // Close modals
            setShowCancelModal(false);
            setShowModal(false);
            setBookingToCancel(null);
            setSelectedBooking(null);
            
            console.log('Reservation cancelled successfully');
        } catch (err) {
            console.error('Error cancelling reservation:', err);
            setError('Failed to cancel reservation. Please try again.');
        } finally {
            setCancelLoading(false);
        }
    };

    const cancelCancelBooking = () => {
        setShowCancelModal(false);
        setBookingToCancel(null);
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'confirmed':
                return 'status-active';
            case 'pending':
                return 'status-pending';
            case 'cancelled':
            case 'expired':
                return 'status-cancelled';
            default:
                return 'status-default';
        }
    };

    if (loading) {
        return (
            <div className="my-bookings">
                <div className="bookings-header">
                    <h2>My Parking Reservations</h2>
                </div>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading your bookings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-bookings">
                <div className="bookings-header">
                    <h2>My Bookings</h2>
                </div>
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-bookings">
            <div className="bookings-header">
                <h2>My Bookings</h2>
                <div className="bookings-count">
                    {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🅿️</div>
                    <h3>No bookings yet</h3>
                    <p>Your parking reservations will appear here once you make them.</p>
                </div>
            ) : (
                <div className="bookings-grid">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <div className="card-header">
                                <div className="parking-info">
                                    <h3>{booking.parkingSpot || booking.slot?.slot_code || 'Parking Spot'}</h3>
                                    <p className="spot-details">
                                        {booking.spotNumber && `Spot #${booking.spotNumber}`}
                                        {booking.zone && ` • Zone ${booking.zone}`}
                                    </p>
                                </div>
                                <div className={`status-badge ${getStatusClass(booking.status)}`}>
                                    {booking.status || 'Active'}
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="booking-details">
                                    <div className="detail-row">
                                        <div className="detail-item">
                                            <span className="detail-label">Date</span>
                                            <span className="detail-value">
                                                {formatDate(booking.reservations_start_date)}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Duration</span>
                                            <span className="detail-value">
                                                {booking.reservations_start_date && booking.reservations_end_date
                                                    ? `${formatDate(booking.reservations_start_date)} - ${formatDate(booking.reservations_end_date)}`
                                                    : booking.duration || 'N/A'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    {booking.vehicleInfo && (
                                        <div className="detail-row">
                                            <div className="detail-item full-width">
                                                <span className="detail-label">Vehicle</span>
                                                <span className="detail-value">
                                                    {booking.vehicleInfo.make} {booking.vehicleInfo.model} • {booking.vehicleInfo.licensePlate}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {booking.price && (
                                        <div className="detail-row">
                                            <div className="detail-item">
                                                <span className="detail-label">Price</span>
                                                <span className="detail-value price">
                                                    ${booking.price}
                                                </span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Booking ID</span>
                                                <span className="detail-value booking-id">
                                                    #{booking.id.toString().slice(-6)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="card-footer">
                                <button
                                    className="btn-secondaryy"
                                    onClick={() => handleViewDetails(booking)}
                                >
                                    View Details
                                </button>
                                {/* <button
                                    className="btn-danger"
                                    onClick={() => handleCancelBooking(booking)}
                                    disabled={booking.status?.toLowerCase() === 'cancelled'}
                                >
                                    Cancel
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Details Modal */}
            {showModal && selectedBooking && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Booking Details</h3>
                            <button className="close-button" onClick={closeModal}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-section">
                                <h4>Parking Information</h4>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Location</span>
                                        <span className="detail-value">International Burch University</span>
                                    </div>
                                    {selectedBooking.spotNumber && (
                                        <div className="detail-item">
                                            <span className="detail-label">Spot Number</span>
                                            <span className="detail-value">#{selectedBooking.spotNumber}</span>
                                        </div>
                                    )}
                                    {selectedBooking.zone && (
                                        <div className="detail-item">
                                            <span className="detail-label">Zone</span>
                                            <span className="detail-value">{selectedBooking.zone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4>Booking Information</h4>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">From</span>
                                        <span className="detail-value">{formatDate(selectedBooking.reservations_start_date)}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Until</span>
                                        <span className="detail-value">
                                            {selectedBooking.reservations_end_date
                                                ? `${formatDate(selectedBooking.reservations_end_date)}`
                                                : selectedBooking.duration || 'N/A'
                                            }
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Status</span>
                                        <span className={`detail-value status-text ${getStatusClass(selectedBooking.status)}`}>
                                            {selectedBooking.status || 'Active'}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Booking ID</span>
                                        <span className="detail-value booking-id">#{selectedBooking.id}</span>
                                    </div>
                                </div>
                            </div>

                            {selectedBooking.vehicleInfo && (
                                <div className="detail-section">
                                    <h4>Vehicle Information</h4>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Make & Model</span>
                                            <span className="detail-value">
                                                {selectedBooking.vehicleInfo.make} {selectedBooking.vehicleInfo.model}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">License Plate</span>
                                            <span className="detail-value">{selectedBooking.vehicleInfo.licensePlate}</span>
                                        </div>
                                        {selectedBooking.vehicleInfo.color && (
                                            <div className="detail-item">
                                                <span className="detail-label">Color</span>
                                                <span className="detail-value">{selectedBooking.vehicleInfo.color}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {selectedBooking.price && (
                                <div className="detail-section">
                                    <h4>Payment Information</h4>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Total Price</span>
                                            <span className="detail-value price">${selectedBooking.price}</span>
                                        </div>
                                        {selectedBooking.paymentMethod && (
                                            <div className="detail-item">
                                                <span className="detail-label">Payment Method</span>
                                                <span className="detail-value">{selectedBooking.paymentMethod}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondaryy" onClick={closeModal}>Close</button>
                            <button 
                                className="cancel_parking" 
                                onClick={() => handleCancelBooking(selectedBooking)}
                                disabled={selectedBooking.status?.toLowerCase() === 'cancelled'}
                            >
                                Cancel Reservation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            <LogoutModal
                isOpen={showCancelModal}
                onConfirm={confirmCancelBooking}
                onCancel={cancelCancelBooking}
                title="Cancel Reservation"
                message={`Are you sure you want to cancel your reservation for ${bookingToCancel?.parkingSpot || bookingToCancel?.slot?.slot_code || 'this parking spot'}? This action cannot be undone.`}
                option1="No, Keep Reservation"
                option2="Yes, Cancel Reservation"
            />

            {/* Loading overlay for cancel operation */}
            {cancelLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Cancelling reservation...</p>
                </div>
            )}
        </div>
    );
};

export default StudentReservations;