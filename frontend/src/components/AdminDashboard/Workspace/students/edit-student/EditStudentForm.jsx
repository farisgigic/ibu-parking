import { useState, useEffect } from 'react';
import { studentApi } from '../../../../../api/StudentApi';
import Toast from './../../../../../components/ParkingSlots/Toast';
const EditStudentForm = ({ student, onClose, onUpdate }) => {
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    picture_url: '',
    google_id: '',
    role: '',
    login_count: 0,
  });
  const toastMessage = <>🎉 You have selected slot <strong></strong>. Visit Student Affairs Office to complete payment.</>;
  useEffect(() => {
    if (student) {
      console.log(student.picture_url);
      setFormData({
        first_name: student.first_name || '',
        last_name: student.last_name || '',
        email: student.email || '',
        picture_url: student.picture_url || '',
        google_id: student.google_id || '',
        role: student.role || '',
        login_count: student.login_count || 0,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentApi.editStudent(student.student_id, formData);
      onUpdate();
      onClose();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  };

  return (
    <div className="edit-form-container">
      <div className="edit-form-header">
        <h2 className="edit-form-title">Edit Student</h2>
        <button type="button" onClick={onClose} className="close-button">
          <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="image-section">
          <img 
            src={formData.picture_url || '/default-avatar.png'} 
            alt="Profile" 
            className="profile-img"
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
            referrerpolicy="no-referrer"
          />
        </div>
        
        <div className="form-grid">
          <input 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleChange} 
            placeholder="First Name"
            className="form-input"
            required
          />
          <input 
            name="last_name" 
            value={formData.last_name} 
            onChange={handleChange} 
            placeholder="Last Name"
            className="form-input"
            required
          />
          <input 
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email"
            className="form-input"
            required
          />
          <input 
            name="google_id" 
            value={formData.google_id} 
            onChange={handleChange} 
            placeholder="Google ID"
            className="form-input"
          />
          <input 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            placeholder="Role"
            className="form-input"
          />
          <input 
            name="login_count" 
            type="number" 
            value={formData.login_count} 
            onChange={handleChange} 
            placeholder="Login Count"
            className="form-input"
            min="0"
          />
        </div>
        
        <div className="button-group">
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
       <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default EditStudentForm;