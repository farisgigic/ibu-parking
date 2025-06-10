import React, { useState, useEffect } from 'react';


const UniversityProfile = () => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [reportForm, setReportForm] = useState({
    category: '',
    title: '',
    description: '',
    priority: 'medium'
  });
  const [showReportForm, setShowReportForm] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setStudentData({
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.johnson@university.edu',
        google_id: '1234567890',
        picture_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        role: 'student',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-06-01T14:22:00Z'
      });

      setNotifications([
        {
          id: 1,
          type: 'parking',
          title: 'New Parking Rates Effective July 1st',
          message: 'Monthly parking permits will increase to $45/month. Daily rates remain $8.',
          date: '2025-06-08',
          priority: 'high',
          icon: 'bi-car-front'
        },
        {
          id: 2,
          type: 'alert',
          title: 'Campus Construction Notice',
          message: 'East parking lot will be closed June 15-20 for maintenance. Use West lot as alternative.',
          date: '2025-06-07',
          priority: 'medium',
          icon: 'bi-cone-striped'
        },
        {
          id: 3,
          type: 'pricing',
          title: 'Student ID Replacement Fee Update',
          message: 'Lost student ID replacement fee reduced from $25 to $15 effective immediately.',
          date: '2025-06-05',
          priority: 'low',
          icon: 'bi-credit-card'
        },
        {
          id: 4,
          type: 'parking',
          title: 'Reserved Parking Spots Available',
          message: '10 new reserved spots available in North lot. Apply through student portal.',
          date: '2025-06-03',
          priority: 'medium',
          icon: 'bi-p-square'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Report submitted:', reportForm);
    alert('Thank you! Your report has been submitted successfully.');
    setReportForm({ category: '', title: '', description: '', priority: 'medium' });
    setShowReportForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'uni-badge-danger',
      medium: 'uni-badge-warning',
      low: 'uni-badge-info'
    };
    return badges[priority] || 'uni-badge-secondary';
  };

  if (loading) {
    return (
      <div className="uni-loading-container">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.0/font/bootstrap-icons.min.css" rel="stylesheet" />
        <div className="uni-loading-content">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="uni-profile-wrapper">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.0/font/bootstrap-icons.min.css" rel="stylesheet" />
      
      <div className="container-fluid">
        <div className="row">
          {/* Profile Information Section */}
          <div className="col-lg-4 col-md-12">
            <div className="uni-profile-card">
              <div className="uni-profile-header">
                <div className="uni-avatar-container">
                  <img 
                    src={studentData.picture_url} 
                    alt="Student Profile" 
                    className="uni-avatar-image"
                  />
                  <div className="uni-status-dot"></div>
                </div>
                <h2 className="uni-student-name">
                  {studentData.first_name} {studentData.last_name}
                </h2>
                <span className="uni-role-badge">
                  <i className="bi bi-mortarboard"></i>
                  {studentData.role.charAt(0).toUpperCase() + studentData.role.slice(1)}
                </span>
              </div>

              <div className="uni-info-section">
                <h4 className="uni-section-title">
                  <i className="bi bi-person-circle"></i>
                  Personal Information
                </h4>
                <div className="uni-info-list">
                  <div className="uni-info-item">
                    <span className="uni-info-label">Email:</span>
                    <span className="uni-info-value">{studentData.email}</span>
                  </div>
                  <div className="uni-info-item">
                    <span className="uni-info-label">Role:</span>
                    <span className="uni-info-value">{studentData.role}</span>
                  </div>
                  <div className="uni-info-item">
                    <span className="uni-info-label">Member Since:</span>
                    <span className="uni-info-value">{formatDate(studentData.created_at)}</span>
                  </div>
                  <div className="uni-info-item">
                    <span className="uni-info-label">Last Updated:</span>
                    <span className="uni-info-value">{formatDate(studentData.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-lg-8 col-md-12">
            {/* University Notifications Section */}
            <div className="uni-notifications-section">
              <div className="uni-section-header">
                <h3 className="uni-section-title">
                  <i className="bi bi-bell"></i>
                  University Notifications
                </h3>
                <span className="uni-notification-count">
                  {notifications.length} active
                </span>
              </div>
              
              <div className="uni-notifications-list">
                {notifications.map(notification => (
                  <div key={notification.id} className="uni-notification-item">
                    <div className="uni-notification-icon">
                      <i className={`bi ${notification.icon}`}></i>
                    </div>
                    <div className="uni-notification-content">
                      <div className="uni-notification-header">
                        <h5 className="uni-notification-title">{notification.title}</h5>
                        <span className={`uni-badge ${getPriorityBadge(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      </div>
                      <p className="uni-notification-message">{notification.message}</p>
                      <div className="uni-notification-meta">
                        <span className="uni-notification-type">
                          <i className="bi bi-tag"></i>
                          {notification.type}
                        </span>
                        <span className="uni-notification-date">
                          <i className="bi bi-calendar3"></i>
                          {formatDate(notification.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report a Problem Section */}
            <div className="uni-report-section">
              <div className="uni-section-header">
                <h3 className="uni-section-title">
                  <i className="bi bi-exclamation-triangle"></i>
                  Report a Problem
                </h3>
                <button 
                  className="btn btn-primary uni-report-toggle"
                  onClick={() => setShowReportForm(!showReportForm)}
                >
                  {showReportForm ? 'Cancel' : 'New Report'}
                </button>
              </div>

              {!showReportForm && (
                <div className="uni-report-info">
                  <div className="uni-info-card">
                    <i className="bi bi-info-circle"></i>
                    <div>
                      <h5>Need Help?</h5>
                      <p>Report technical issues, facility problems, or submit feedback to help us improve your university experience.</p>
                    </div>
                  </div>
                </div>
              )}

              {showReportForm && (
                <div className="uni-report-form-container">
                  <form onSubmit={handleReportSubmit} className="uni-report-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="uni-form-group">
                          <label htmlFor="category" className="uni-form-label">Category</label>
                          <select 
                            id="category"
                            className="form-control uni-form-input"
                            value={reportForm.category}
                            onChange={(e) => setReportForm({...reportForm, category: e.target.value})}
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
                      </div>
                      <div className="col-md-6">
                        <div className="uni-form-group">
                          <label htmlFor="priority" className="uni-form-label">Priority</label>
                          <select 
                            id="priority"
                            className="form-control uni-form-input"
                            value={reportForm.priority}
                            onChange={(e) => setReportForm({...reportForm, priority: e.target.value})}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="uni-form-group">
                      <label htmlFor="title" className="uni-form-label">Issue Title</label>
                      <input 
                        type="text"
                        id="title"
                        className="form-control uni-form-input"
                        placeholder="Brief description of the issue"
                        value={reportForm.title}
                        onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="uni-form-group">
                      <label htmlFor="description" className="uni-form-label">Description</label>
                      <textarea 
                        id="description"
                        className="form-control uni-form-input"
                        rows="4"
                        placeholder="Please provide detailed information about the problem..."
                        value={reportForm.description}
                        onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="uni-form-actions">
                      <button type="submit" className="btn btn-success uni-submit-btn">
                        <i className="bi bi-send"></i>
                        Submit Report
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary uni-cancel-btn"
                        onClick={() => setShowReportForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityProfile;