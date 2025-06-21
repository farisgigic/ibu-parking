import { useState } from 'react';
import { notificationApi } from '@api/NotificationApi.js';

const AddReportForm = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        type: 'alert',
        title: '',
        message: '',
        date: new Date().toISOString().split('T')[0],
        priority: 'medium',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
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
            const createdNotification = await notificationApi.createNotification(formData);
            onAdd?.(createdNotification);
            onClose();
        } catch (error) {
            console.error('Error adding notification:', error);
            setErrors(prev => ({
                ...prev,
                submit: 'Failed to add notification. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="add-notification-overlay">
            <div className="add-notification-modal">
                <div className="add-notification-header">
                    <h2>Add New Notification</h2>
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

                <form onSubmit={handleSubmit} className="add-notification-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="type">Type *</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                <option value="alert">Alert</option>
                                <option value="parking">Parking</option>
                                <option value="pricing">Pricing</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority *</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title">Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`form-input ${errors.title ? 'error' : ''}`}
                                placeholder="Enter notification title"
                            />
                            {errors.title && <span className="error-message">{errors.title}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Date *</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className={`form-input ${errors.date ? 'error' : ''}`}
                            />
                            {errors.date && <span className="error-message">{errors.date}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className={`form-textarea ${errors.message ? 'error' : ''}`}
                                placeholder="Enter notification message"
                                rows="4"
                            />
                            {errors.message && <span className="error-message">{errors.message}</span>}
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
                            {isSubmitting ? 'Adding...' : 'Add Notification'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReportForm;