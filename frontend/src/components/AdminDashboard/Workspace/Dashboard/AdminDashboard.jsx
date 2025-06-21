import { useState, useEffect } from 'react';
import { Download, Users, Car, Calendar, FileText, TrendingUp, Activity, AlertCircle, CheckCircle } from 'lucide-react';

import { studentApi } from '@api/StudentApi';
import { slotsApi } from '@api/ParkingSlotsApi';
import { reservationApi } from '@api/ReservationApi';
import { reportsApi } from '@api/ReportsApi';


const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => 
        typeof row[header] === 'string' && row[header].includes(',') 
          ? `"${row[header]}"` 
          : row[header] || ''
      ).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const AdminDashboard = () => {
  const [loadingStates, setLoadingStates] = useState({});
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalParkingSlots: 0,
    activeReservations: 0,
    completedReports: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [students, parkingSlots, reservations, reports] = await Promise.all([
          studentApi.getAllStudents(),
          slotsApi.getAll(),
          reservationApi.getAllReservations(),
          reportsApi.getAllReports()
        ]);

        setStats({
          totalStudents: students.length,
          totalParkingSlots: parkingSlots.length,
          activeReservations: reservations.filter(r => r.status === 'active').length,
          completedReports: reports.filter(r => r.status === 'completed').length
        });
      } catch (error) {
        console.error('Greška pri učitavanju statistika:', error);
      }
    };

    loadStats();

  }, []);

  const handleExport = async (type, apiCall, filename) => {
    setLoadingStates(prev => ({ ...prev, [type]: true }));
    
    try {
      const data = await apiCall();
      exportToCSV(data, filename);
    } catch (error) {
      console.error(`Greška pri eksportovanju ${type}:`, error);
      alert(`Greška pri eksportovanju ${type}. Molimo pokušajte ponovo.`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Welcome to the admin panel. Here you can manage all aspects of the system.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid-fare">
          <div className="stat-card stat-card-blue">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-label">Total Students</p>
                <p className="stat-card-value">{stats.totalStudents}</p>
                <div className="stat-card-trend">
                  <TrendingUp className="stat-card-trend-icon" />
                  <span className="stat-card-trend-text">+12% this month</span>
                </div>
              </div>
              <div className="stat-card-icon-wrapper">
                <Users className="stat-card-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-card-green">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-label">Parking Slots</p>
                <p className="stat-card-value">{stats.totalParkingSlots}</p>
                <div className="stat-card-trend">
                  <TrendingUp className="stat-card-trend-icon" />
                  <span className="stat-card-trend-text">+5 new slots</span>
                </div>
              </div>
              <div className="stat-card-icon-wrapper">
                <Car className="stat-card-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-card-orange">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-label">Active Reservations</p>
                <p className="stat-card-value">{stats.activeReservations}</p>
                <div className="stat-card-trend">
                  <TrendingUp className="stat-card-trend-icon" />
                  <span className="stat-card-trend-text">+8% today</span>
                </div>
              </div>
              <div className="stat-card-icon-wrapper">
                <Calendar className="stat-card-icon" />
              </div>
            </div>
          </div>

          <div className="stat-card stat-card-purple">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-label">Completed Reports</p>
                <p className="stat-card-value">{stats.completedReports}</p>
                <div className="stat-card-trend">
                  <TrendingUp className="stat-card-trend-icon" />
                  <span className="stat-card-trend-text">3 new today</span>
                </div>
              </div>
              <div className="stat-card-icon-wrapper">
                <FileText className="stat-card-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="quick-actions-title">
            <Activity className="quick-actions-title-icon" />
            Actions Possible
          </h2>
          <div className="quick-actions-grid">
            <button className="quick-action-btn quick-action-btn-blue">
              <Users className="quick-action-btn-icon" />
              <span>Add a Student</span>
            </button>
            <button className="quick-action-btn quick-action-btn-green">
              <Car className="quick-action-btn-icon" />
              <span>New Parking Slot</span>
            </button>
            <button className="quick-action-btn quick-action-btn-orange">
              <Calendar className="quick-action-btn-icon" />
              <span>New Reservation</span>
            </button>
            <button className="quick-action-btn quick-action-btn-purple">
              <FileText className="quick-action-btn-icon" />
              <span>Make a Report</span>
            </button>
          </div>
        </div>

        <div className="export-section">
          <h2 className="export-title">
            <Download className="export-title-icon" />
            Exporting of data
          </h2>
          <div className="export-grid">
            <div className="export-card export-card-blue">
              <div className="export-card-header">
                <div className="export-card-icon-wrapper">
                  <Users className="export-card-icon" />
                </div>
              </div>
              <h3 className="export-card-title">Students</h3>
              <p className="export-card-description">Download a list of students enrolled in parking system.</p>
              <button
                onClick={() => handleExport('students', studentApi.getAllStudents, 'students')}
                disabled={loadingStates.students}
                className="export-btn"
              >
                <Download className="export-btn-icon" />
                <span>{loadingStates.students ? 'Exporitng...' : 'Download a CSV'}</span>
              </button>
            </div>

            <div className="export-card export-card-purple">
              <div className="export-card-header">
                <div className="export-card-icon-wrapper">
                  <FileText className="export-card-icon" />
                </div>
              </div>
              <h3 className="export-card-title">Reports</h3>
              <p className="export-card-description">Download all reports and see their status</p>
              <button
                onClick={() => handleExport('reports', reportsApi.getAllReports, 'reports')}
                disabled={loadingStates.reports}
                className="export-btn"
              >
                <Download className="export-btn-icon" />
                <span>{loadingStates.reports ? 'Exporting...' : 'Download a CSV'}</span>
              </button>
            </div>

            <div className="export-card export-card-green">
              <div className="export-card-header">
                <div className="export-card-icon-wrapper">
                  <Car className="export-card-icon" />
                </div>
              </div>
              <h3 className="export-card-title">Parking Slots</h3>
              <p className="export-card-description">A list of all parking slots at International Burch University</p>
              <button
                onClick={() => handleExport('parking', slotsApi.getAll, 'parking-slots')}
                disabled={loadingStates.parking}
                className="export-btn"
              >
                <Download className="export-btn-icon" />
                <span>{loadingStates.parking ? 'Exporting...' : 'Download a CSV'}</span>
              </button>
            </div>

            <div className="export-card export-card-orange">
              <div className="export-card-header">
                <div className="export-card-icon-wrapper">
                  <Calendar className="export-card-icon" />
                </div>
              </div>
              <h3 className="export-card-title">Reservations</h3>
              <p className="export-card-description">Download a list of all reservations with student names</p>
              <button
                onClick={() => handleExport('reservations', reservationApi.getAllReservations, 'reservations')}
                disabled={loadingStates.reservations}
                className="export-btn"
              >
                <Download className="export-btn-icon" />
                <span>{loadingStates.reservations ? 'Exporting...' : 'Download a CSV'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="system-status">
          <h2 className="system-status-title">
            <AlertCircle className="system-status-title-icon" />
            Status of the System
          </h2>
          <div className="system-status-grid">
            <div className="status-item">
              <CheckCircle className="status-item-icon" />
              <div className="status-item-info">
                <p className="status-item-title">Database</p>
                <p className="status-item-status">Active</p>
              </div>
            </div>
            <div className="status-item">
              <CheckCircle className="status-item-icon" />
              <div className="status-item-info">
                <p className="status-item-title">API Service</p>
                <p className="status-item-status">Up to Date</p>
              </div>
            </div>
            <div className="status-item">
              <CheckCircle className="status-item-icon" />
              <div className="status-item-info">
                <p className="status-item-title">Backup</p>
                <p className="status-item-status">Up to Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;