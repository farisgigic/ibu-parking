import { useState, useEffect, useRef } from 'react';
import { notificationApi } from '../../api/NotificationApi';
import { studentApi } from '../../api/StudentApi';
import { reportsApi } from '../../api/ReportsApi'; 

const DEFAULT_AVATAR_URL = 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

const UniversityProfile = () => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState();
  const [notifications, setNotifications] = useState([]);
  const [notificationsError, setNotificationsError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalItems: 0,
  });
  const NOTIFICATIONS_PER_PAGE = 3;

  const [reportForm, setReportForm] = useState({
    category: '',
    title: '',
    description: '',
    priority: 'medium'
  });
  const [showReportForm, setShowReportForm] = useState(false);
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const studentDataString = localStorage.getItem("user");
        const parsedData = JSON.parse(studentDataString);
        const studentID = parsedData?.sub;

        if (studentID) {
          const studentResponse = await studentApi.getStudentById(studentID);
          setStudentData(studentResponse);
        } else {
          // Fallback data for development
          setStudentData({
            first_name: 'Sarah',
            last_name: 'Johnson',
            email: 'sarah.johnson@university.edu',
            google_id: '1234567890',
            picture_url: null,
            role: 'student',
            created_at: '2025-06-11 22:21:22.84+02',
            updated_at: null,
          });
        }
      } catch (err) {
        console.error("Failed to load student data:", err);
      }
    };

    loadStudentData();
  }, []);

  useEffect(() => {
    if (!studentData) return;

    const loadProfileData = async () => {
      setLoading(true);
      try {
        const notificationsData = await notificationApi.getAllNotifications(currentPage, NOTIFICATIONS_PER_PAGE);

        setNotifications(notificationsData.notifications);
        setPaginationInfo({
          totalPages: notificationsData.totalPages,
          totalItems: notificationsData.totalItems,
        });
        setNotificationsError(null);

      } catch (error) {
        setNotificationsError('Failed to load university notifications. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [currentPage, studentData]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= paginationInfo.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 3) {
      alert('You can upload maximum 3 images');
      return;
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      alert('Only JPEG, PNG and GIF files are allowed');
      return;
    }
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('Each file must be smaller than 5MB');
      return;
    }

    setSelectedImages(files);
    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    setImagePreview(previews);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
  
    URL.revokeObjectURL(imagePreview[index].url);
    
    setSelectedImages(newImages);
    setImagePreview(newPreviews);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validacija
      if (!reportForm.category || !reportForm.title || !reportForm.description) {
        alert('Please fill in all required fields');
        return;
      }

      const formData = new FormData();
      formData.append('category', reportForm.category);
      formData.append('title', reportForm.title);
      formData.append('description', reportForm.description);
      formData.append('priority', reportForm.priority);
      
      const studentDataString = localStorage.getItem("user");
      const parsedData = JSON.parse(studentDataString);
      // console.log('Parsed student data:', parsedData);
      const student_id = await studentApi.getStudentByEmail(parsedData?.email);
      console.log(student_id.student_id);
      formData.append('studentId', student_id.student_id || 99);

      selectedImages.forEach((image, index) => {
        formData.append('image', image);
      });

      const response = await reportsApi.createReport(formData);
      
      if (response.success) {
        alert('Report submitted successfully!');

        setReportForm({ 
          category: '', 
          title: '', 
          description: '', 
          priority: 'medium' 
        });
        setSelectedImages([]);
        setImagePreview([]);
        setShowReportForm(false);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'N/A';
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!studentData) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="university-profile">
      <div className="container">
        <div className="main-grid">
          <div className="profile-card">
            {studentData && (
              <>
                <div className="profile-header">
                  <div className="profile-avatar-container">
                    <div className="profile-avatar-wrapper">
                      <img
                        src={studentData.picture_url || DEFAULT_AVATAR_URL}
                        alt={`${studentData.first_name} ${studentData.last_name}`}
                        className="profile-avatar"
                        referrerpolicy="no-referrer" 
                      />
                      <div className="profile-status"></div>
                    </div>
                    <h2 className="profile-name">{studentData.first_name} {studentData.last_name}</h2>
                    <span className="profile-role-badge">
                      🎓 {studentData.role.charAt(0).toUpperCase() + studentData.role.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="profile-info">
                  <h4 className="profile-info-title">
                    👤 Personal Information
                  </h4>
                  <div className="profile-info-list">
                    <div className="profile-info-item">
                      <span className="profile-info-label">Email:</span>
                      <span className="profile-info-value">{studentData.email}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">Role:</span>
                      <span className="profile-info-value">{studentData.role}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">Member Since:</span>
                      <span className="profile-info-value">{formatDate(studentData.createdAt)}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="profile-info-label">Last Updated:</span>
                      <span className="profile-info-value">{formatDate(studentData.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Main Content Area */}
          <div className="content-area">
            {/* Notifications Section */}
            <div className="section-card">
              <div className="section-header">
                <div className="section-header-content">
                  <h3 className="section-title">
                    🔔 University Notifications
                  </h3>
                  {!notificationsError && (
                    <span className="section-badge">
                      {paginationInfo.totalItems} total
                    </span>
                  )}
                </div>
              </div>

              <div className="section-content">
                {loading ? (
                  <div className="notifications-loading">
                    <div className="loading-spinner"></div>
                  </div>
                ) : notificationsError ? (
                  <div className="notifications-error">
                    {notificationsError}
                  </div>
                ) : notifications.length > 0 ? (
                  <div className="notifications-list">
                    {notifications.map(notification => (
                      <div key={notification.id} className="notification-item">
                        <div className="notification-icon">
                          <span>ℹ️</span>
                        </div>
                        <div className="notification-content">
                          <div className="notification-header">
                            <h5 className="notification-title">{notification.title}</h5>
                            <span className={`priority-badge priority-${notification.priority}`}>
                              {notification.priority}
                            </span>
                          </div>
                          <p className="notification-message">{notification.message}</p>
                          <div className="notification-meta">
                            <span className="notification-meta-item">
                              🏷️ {notification.type}
                            </span>
                            <span className="notification-meta-item">
                              📅 {formatDate(notification.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="notifications-empty">No new notifications at the moment.</p>
                )}
              </div>

              {paginationInfo.totalItems > 0 && !loading && !notificationsError && (
                <div className="pagination">
                  <span className="pagination-info">
                    Page {currentPage} of {paginationInfo.totalPages}
                  </span>
                  <div className="pagination-buttons">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === paginationInfo.totalPages}
                      className="pagination-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Report Section  */}
            <div className="section-card">
              <div className="section-header">
                <div className="section-header-content">
                  <h3 className="section-title">
                    ⚠️ Report a Problem
                  </h3>
                  <button
                    onClick={() => setShowReportForm(!showReportForm)}
                    className="btn btn-primary"
                  >
                    {showReportForm ? 'Cancel' : 'New Report'}
                  </button>
                </div>
              </div>

              <div className="section-content">
                {!showReportForm && (
                  <div className="report-info">
                    <div className="report-info-content">
                      <div className="report-info-icon">
                        <span>ℹ️</span>
                      </div>
                      <div>
                        <h5 className="report-info-title">Need Help?</h5>
                        <p className="report-info-text">
                          Report technical issues, facility problems, or submit feedback. You can also attach images to help us understand the problem better.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {showReportForm && (
                  <form onSubmit={handleReportSubmit} className="report-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">
                          Category *
                        </label>
                        <select
                          value={reportForm.category}
                          onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                          className="form-select"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="parking">Parking Issues</option>
                          <option value="facilities">Facility Problems</option>
                          <option value="technical">Technical Issues</option>
                          <option value="safety">Safety Concerns</option>
                          <option value="billing">Billing/Payment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Priority
                        </label>
                        <select
                          value={reportForm.priority}
                          onChange={(e) => setReportForm({ ...reportForm, priority: e.target.value })}
                          className="form-select"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Issue Title *
                      </label>
                      <input
                        type="text"
                        placeholder="Brief description of the issue"
                        value={reportForm.title}
                        onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Description *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Please provide detailed information about the problem..."
                        value={reportForm.description}
                        onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                        className="form-textarea"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        📷 Attach Image (Optional)
                      </label>
                      <div className="image-upload-section">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept="image/jpeg,image/png,image/gif"
                          multiple
                          className="form-input-file"
                          style={{ display: 'none' }}
                        />
                        
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="btn btn-outline-primary"
                          disabled={isSubmitting}
                        >
                          📁 Choose Image
                        </button>
                        
                        <p className="form-help-text">
                          Supported formats: JPEG, PNG, GIF (Max 5MB)
                        </p>

                        {imagePreview.length > 0 && (
                          <div className="image-preview-container">
                            <h6>Selected Images:</h6>
                            <div className="image-preview-grid">
                              {imagePreview.map((preview, index) => (
                                <div key={index} className="image-preview-item">
                                  <img
                                    src={preview.url}
                                    alt={`Preview ${index + 1}`}
                                    className="image-preview-thumb"
                                  />
                                  <div className="image-preview-info">
                                    <span className="image-preview-name">
                                      {preview.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => removeImage(index)}
                                      className="btn btn-danger btn-sm"
                                      disabled={isSubmitting}
                                    >
                                      ❌ Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-buttons">
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="loading-spinner-sm"></span>
                            Submitting...
                          </>
                        ) : (
                          '📤 Submit Report'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReportForm(false)}
                        className="btn btn-secondary"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityProfile;