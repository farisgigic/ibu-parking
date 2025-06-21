import { useState } from 'react';
import { studentApi } from '@api/StudentApi.js';
// import { getRandomInt } from '@data/getRandomInt.js';

const AddStudentForm = ({ onClose, onAdd }) => {
    // const randomInt = getRandomInt(1, 100); 
    // console.log('Generated Google ID:', randomInt);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        google_id: 1,
        role: 'student',
        login_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            updated_at: new Date().toISOString()
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const createdStudent = await studentApi.createStudent(formData);
            console.log('✅ Student created:', createdStudent);
            onAdd?.(createdStudent);
            onClose();
        } catch (error) {
            console.error('Error adding student:', error);
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to add student. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }

    }

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="add-student-overlay">
            <div className="add-student-modal">
                <div className="add-student-header">
                    <h2>Add New Student</h2>
                    <button
                        className="close-button"
                        onClick={handleCancel}
                        type="button"
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="add-student-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name *</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className={`form-input ${errors.first_name ? 'error' : ''}`}
                                placeholder="Enter first name"
                            />
                            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Last Name *</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className={`form-input ${errors.last_name ? 'error' : ''}`}
                                placeholder="Enter last name"
                            />
                            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="Enter email address"
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role *</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="login_count">Login Count</label>
                            <input
                                type="number"
                                id="login_count"
                                name="login_count"
                                value={formData.login_count}
                                onChange={handleInputChange}
                                className="form-input"
                                min="0"
                                readOnly
                            />
                            <small className="form-note">Default value: 0</small>
                        </div>
                    </div>

                    {errors.submit && (
                        <div className="submit-error">
                            {errors.submit}
                        </div>
                    )}

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentForm;