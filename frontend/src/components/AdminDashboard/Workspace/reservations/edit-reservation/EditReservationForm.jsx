import { useState, useEffect } from 'react';
import { reservationApi } from '../../../../../api/ReservationApi';

const EditReservationForm = ({ reservation, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    reservations_start_date: '',
    reservations_end_date: '',
    status: '',
    slot_code: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (reservation) {
      setFormData({
        reservations_start_date: reservation.reservations_start_date 
          ? new Date(reservation.reservations_start_date).toISOString().split('T')[0] 
          : '',
        reservations_end_date: reservation.reservations_end_date 
          ? new Date(reservation.reservations_end_date).toISOString().split('T')[0] 
          : '',
        status: reservation.status || '',
        slot_code: reservation.slot?.slot_code || '',
      });
    }
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate dates
      const startDate = new Date(formData.reservations_start_date);
      const endDate = new Date(formData.reservations_end_date);
      
      if (startDate >= endDate) {
        setError('End date must be after start date');
        setLoading(false);
        return;
      }

      await reservationApi.updateReservation(reservation.id, {
        reservations_start_date: formData.reservations_start_date,
        reservations_end_date: formData.reservations_end_date,
        status: formData.status,
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Failed to update reservation:', error);
      setError('Failed to update reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'accepted/paid':
        return 'status-accepted/paid';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  if (!reservation) return null;

  return (
    <div className="edit-form-container">
      <div className="edit-form-header">
        <h2 className="edit-form-title">Edit Reservation</h2>
        <button type="button" onClick={onClose} className="close-button">
          <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Student Information Section */}
      <div className="student-info-section">
        <h3 className="student-info-title">Student Information</h3>
        <div className="student-info">
          <img 
            src={reservation.student?.picture_url || '/default-avatar.png'} 
            alt="Student" 
            className="student-avatar"
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
            referrerpolicy="no-referrer"
          />
          <div className="student-details">
            <h4>{reservation.student?.full_name || 'Unknown Student'}</h4>
            <p>{reservation.student?.email || 'No email provided'}</p>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ 
          background: '#fee2e2', 
          color: '#991b1b', 
          padding: '12px', 
          borderRadius: '8px', 
          fontSize: '14px',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Slot Code</label>
            <input 
              type="text"
              value={formData.slot_code} 
              className="form-input"
              disabled
              style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select 
              name="status"
              value={formData.status} 
              onChange={handleChange} 
              className="form-select status-select"
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="accepted/paid">Accepted/Paid</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input 
              type="date"
              name="reservations_start_date"
              value={formData.reservations_start_date} 
              onChange={handleChange} 
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Date</label>
            <input 
              type="date"
              name="reservations_end_date"
              value={formData.reservations_end_date} 
              onChange={handleChange} 
              className="form-input"
              required
            />
          </div>
        </div>

        {/* Current Information Display */}
        <div style={{ 
          background: '#f9fafb', 
          padding: '16px', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#374151', fontSize: '0.875rem' }}>
            Current Reservation Details
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.875rem' }}>
            <div>
              <strong>Original Start:</strong> {formatDate(reservation.reservations_start_date)}
            </div>
            <div>
              <strong>Original End:</strong> {formatDate(reservation.reservations_end_date)}
            </div>
            <div>
              <strong>Current Status:</strong>{' '}
              <span className={getStatusBadgeClass(reservation.status)}>
                {reservation.status || 'Unknown'}
              </span>
            </div>
            <div>
              <strong>Slot:</strong> {reservation.slot?.slot_code || 'N/A'}
            </div>
          </div>
        </div>

        <div className="button-group">
          <button type="button" onClick={onClose} className="cancel-button" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReservationForm;