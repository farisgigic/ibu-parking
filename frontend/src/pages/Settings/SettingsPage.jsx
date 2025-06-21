import { useState } from 'react';
import { 
  Settings, 
  Car, 
  Clock, 
  Shield, 
  AlertTriangle, 
  Bell, 
  Eye, 
  Moon, 
  Volume2,
  Smartphone,
  Mail,
  Save,
  Info,
  MapPin,
  CreditCard,
  Users
} from 'lucide-react';

const RulesSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('rules');
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEnabled: true,
    emailAlerts: true,
    pushNotifications: true,
    autoRenewal: false,
    locationServices: true
  });

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const parkingRules = [
    {
      id: 1,
      icon: <Clock style={{ width: '20px', height: '20px' }} />,
      title: "Parking Hours",
      description: "Student parking is available 24/7 in designated areas. Visitor parking is restricted to 8 AM - 10 PM.",
      type: "time"
    },
    {
      id: 2,
      icon: <Car style={{ width: '20px', height: '20px' }} />,
      title: "Permit Requirements",
      description: "All vehicles must display valid university parking permits. Permits must be visible from outside the vehicle.",
      type: "permit"
    },
    {
      id: 3,
      icon: <MapPin style={{ width: '20px', height: '20px' }} />,
      title: "Designated Zones",
      description: "Students may only park in blue zones. Red zones are for faculty/staff. Green zones are for visitors.",
      type: "zone"
    },
    {
      id: 4,
      icon: <AlertTriangle style={{ width: '20px', height: '20px' }} />,
      title: "Violations & Fines",
      description: "Parking violations result in fines: $25 for expired permits, $50 for unauthorized zones, $100 for handicap violations.",
      type: "violation"
    },
    {
      id: 5,
      icon: <Users style={{ width: '20px', height: '20px' }} />,
      title: "Handicap Accessibility",
      description: "Handicap spaces require proper state-issued permits. Violations are strictly enforced with maximum penalties.",
      type: "accessibility"
    },
    {
      id: 6,
      icon: <Shield style={{ width: '20px', height: '20px' }} />,
      title: "Security & Safety",
      description: "Report suspicious activities to campus security. Emergency phones are located throughout parking areas.",
      type: "security"
    },
    {
      id: 7,
      icon: <CreditCard style={{ width: '20px', height: '20px' }} />,
      title: "Payment & Renewal",
      description: "Permits expire at semester end. Early renewal discounts available. Payment plans accepted for annual permits.",
      type: "payment"
    },
    {
      id: 8,
      icon: <Car style={{ width: '20px', height: '20px' }} />,
      title: "Vehicle Registration",
      description: "Maximum 2 vehicles per student permit. License plates must be registered online within 48 hours of purchase.",
      type: "registration"
    }
  ];

  const getTypeClass = (type) => {
    const classes = {
      time: 'rule-card-time',
      permit: 'rule-card-permit',
      zone: 'rule-card-zone',
      violation: 'rule-card-violation',
      accessibility: 'rule-card-accessibility',
      security: 'rule-card-security',
      payment: 'rule-card-payment',
      registration: 'rule-card-registration'
    };
    return classes[type] || 'rule-card-default';
  };

  return (
    <div className="page-container">

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-icon">
            <Car style={{ width: '24px', height: '24px', color: 'white' }} />
          </div>
          <div className="header-text">
            <h1>University Parking</h1>
            <p>Rules & Settings</p>
          </div>
        </div>
      </div>

      <div className="main-content-settings">
        {/* Tab Navigation */}
        <div className="tab-container">
          <nav className="tab-nav">
            <button
              onClick={() => setActiveTab('rules')}
              className={`tab-button ${activeTab === 'rules' ? 'active' : ''}`}
            >
              <Info style={{ width: '16px', height: '16px' }} />
              <span>Parking Rules</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <Settings style={{ width: '16px', height: '16px' }} />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="content-section">
            <div className="notice-banner">
              <h2>Important Notice</h2>
              <p>
                Please review all parking rules carefully. Violations may result in fines, towing, or permit suspension. 
                For questions, contact Parking Services at (555) 123-4567.
              </p>
            </div>

            <div className="rules-grid">
              {parkingRules.map((rule) => (
                <div key={rule.id} className={`rule-card ${getTypeClass(rule.type)}`}>
                  <div className="rule-icon">
                    {rule.icon}
                  </div>
                  <div className="rule-content">
                    <h3>{rule.title}</h3>
                    <p>{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-card">
              <h3>Contact Information</h3>
              <div className="contact-grid">
                <div className="contact-item">
                  <p className="title">Parking Services Office</p>
                  <p className="detail">Student Center, Room 150</p>
                  <p className="detail">Monday - Friday: 8:00 AM - 5:00 PM</p>
                </div>
                <div className="contact-item">
                  <p className="title">Emergency Contact</p>
                  <p className="detail">Campus Security: (555) 123-9999</p>
                  <p className="detail">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="content-section">
            <div className="settings-card">
              <div className="settings-header">
                <h3>Notification Preferences</h3>
                <p>Manage how you receive parking alerts and updates</p>
              </div>
              <div className="settings-content">
                <div className="setting-item">
                  <div className="setting-left">
                    <div className="setting-icon">
                      <Bell style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className="setting-text">
                      <p className="title">Push Notifications</p>
                      <p className="description">Receive alerts about permit expiration and violations</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('pushNotifications')}
                    className={`toggle-switch ${settings.pushNotifications ? 'active' : ''}`}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-left">
                    <div className="setting-icon">
                      <Mail style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className="setting-text">
                      <p className="title">Email Alerts</p>
                      <p className="description">Get email notifications for important updates</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('emailAlerts')}
                    className={`toggle-switch ${settings.emailAlerts ? 'active' : ''}`}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-left">
                    <div className="setting-icon">
                      <Volume2 style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className="setting-text">
                      <p className="title">Sound Notifications</p>
                      <p className="description">Play sounds for alerts and confirmations</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('soundEnabled')}
                    className={`toggle-switch ${settings.soundEnabled ? 'active' : ''}`}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-header">
                <h3>Account Settings</h3>
                <p>Manage your parking account preferences</p>
              </div>
              <div className="settings-content">
                <div className="setting-item">
                  <div className="setting-left">
                    <div className="setting-icon">
                      <CreditCard style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className="setting-text">
                      <p className="title">Auto-Renewal</p>
                      <p className="description">Automatically renew parking permits before expiration</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('autoRenewal')}
                    className={`toggle-switch ${settings.autoRenewal ? 'active' : ''}`}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-left">
                    <div className="setting-icon">
                      <MapPin style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className="setting-text">
                      <p className="title">Location Services</p>
                      <p className="description">Help find nearby parking spots and navigate campus</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('locationServices')}
                    className={`toggle-switch ${settings.locationServices ? 'active' : ''}`}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-header">
                <h3>App Preferences</h3>
                <p>Customize your app experience</p>
              </div>
              <div className="settings-content">
                <div className="setting-item">
                  <div className="setting-left">
                    <div className="setting-icon">
                      <Moon style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className="setting-text">
                      <p className="title">Dark Mode</p>
                      <p className="description">Switch to dark theme for better viewing in low light</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('darkMode')}
                    className={`toggle-switch ${settings.darkMode ? 'active' : ''}`}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              </div>
            </div>

            <button className="save-button">
              <Save style={{ width: '16px', height: '16px' }} />
              <span>Save Settings</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulesSettingsPage;