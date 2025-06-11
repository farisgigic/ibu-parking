import { useState, useEffect } from 'react';
import { notificationApi } from '../../api/NotificationApi';
import { studentApi } from '../../api/StudentApi';

// A default avatar to use when the student's picture is missing
const DEFAULT_AVATAR_URL = 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

const UniversityProfile = () => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
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

  // useEffect for loading student data (runs once)
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const studentDataString = localStorage.getItem("studentData");
        const parsedData = JSON.parse(studentDataString);
        const studentID = parsedData?.student_id;

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
            picture_url: null, // Simulating a missing picture
            role: 'student',
            created_at: '2025-06-11 22:21:22.84+02', // Using your new format
            updated_at: null, // Simulating a missing date
          });
        }
      } catch (err) {
        console.error("Failed to load student data:", err);
      }
    };

    loadStudentData();
  }, []);

  // useEffect for loading notifications (runs when page or student data changes)
  useEffect(() => {
    // We only load notifications once we have student data
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

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', reportForm);
    alert('Report submitted successfully.');
    setReportForm({ category: '', title: '', description: '', priority: 'medium' });
    setShowReportForm(false);
  };

  // FIX: Simplified and more robust date formatting function
  const formatDate = (dateString) => {
    // 1. Handle null, undefined, or empty string inputs
    if (!dateString) {
      return 'N/A';
    }
    // 2. The new Date() constructor can parse "2025-06-11 22:21:22.84+02" directly.
    const date = new Date(dateString);

    // 3. Check if the date is valid after parsing
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    // 4. Format it to the user's local, which is usually what you want.
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // FIX: A better loading state check to prevent errors
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
          {/* Profile Card */}
          <div className="profile-card">
            {/* We already checked for studentData above, so this check is redundant but safe */}
            {studentData && (
              <>
                <div className="profile-header">
                  <div className="profile-avatar-container">
                    <div className="profile-avatar-wrapper">
                      <img
                        // FIX: Use the student's picture OR the default avatar
                        src={studentData.picture_url || DEFAULT_AVATAR_URL}
                        alt={`${studentData.first_name} ${studentData.last_name}`}
                        className="profile-avatar"
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

          {/* ... The rest of your component remains the same ... */}
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

            {/* Report Section */}
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
                          Report technical issues, facility problems, or submit feedback to help us improve your university experience.
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
                          Category
                        </label>
                        <select
                          value={reportForm.category}
                          onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                          className="form-select"
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
                        Issue Title
                      </label>
                      <input
                        type="text"
                        placeholder="Brief description of the issue"
                        value={reportForm.title}
                        onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Please provide detailed information about the problem..."
                        value={reportForm.description}
                        onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                        className="form-textarea"
                      />
                    </div>

                    <div className="form-buttons">
                      <button
                        type="submit"
                        className="btn btn-success"
                      >
                        📤 Submit Report
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReportForm(false)}
                        className="btn btn-secondary"
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