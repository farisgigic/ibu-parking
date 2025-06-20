import { useState, useEffect } from 'react';
import { slotsApi } from '../../../../../api/ParkingSlotsApi';

const EditSlotForm = ({ slot, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        slot_code: '',
        location: '',
        section: '',
        type: '',
        is_locked: false,
        status: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (slot?.slot_code) {
            setFormData({
                slot_code: slot.slot_code || '',
                location: slot.location || '',
                section: slot.section || '',
                type: slot.type || '',
                is_locked: slot.is_locked ?? false,
                status: slot.status || ''
            });
        }
    }, [slot?.slot_code]); // ili dodaj `slot.id` ako postoji


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await slotsApi.updateSlot(slot.id, {
                section: formData.section,
                type: formData.type,
                is_locked: formData.is_locked,
                status: formData.status
            });

            onUpdate();
            onClose();
        } catch (error) {
            console.error('Failed to update parking slot:', error);
            setError('Failed to update parking slot. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!slot) return null;

    return (
        <div className="edit-form-container">
            <div className="edit-form-header">
                <h2 className="edit-form-title">Edit Parking Slot</h2>
                <button type="button" onClick={onClose} className="close-button">
                    <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
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
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            className="form-input"
                            disabled
                            style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Section</label>
                        <input
                            type="text"
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="student">Student</option>
                            <option value="professor">Professor</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="available">Available</option>
                            <option value="reserved">Reserved</option>
                            <option value="occupied">Occupied</option>
                            <option value="locked">Locked</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="is_locked" className="form-label">Is Locked</label>
                        <select
                            name="is_locked"
                            id="is_locked"
                            value={formData.is_locked ? "yes" : "no"}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    is_locked: e.target.value === "yes"
                                }))
                            }
                            className="form-select"
                            required
                        >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
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

export default EditSlotForm;
