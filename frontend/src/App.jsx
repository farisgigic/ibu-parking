import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navigator from '@navigator/Navigator';
import Footer from './components/Footer/Footer';
import AuthGuard from './components/AuthLogin/AuthGuard';
import SessionWatcher from './components/SessionWatcher/SessionWatcher';
import RoleGuard from './components/AuthLogin/RoleGuard';
// Admin Components
import StudentsTable from './components/AdminDashboard/Workspace/students/all-students/StudentsWorkspace';
import ReservationsTable from './components/AdminDashboard/Workspace/reservations/ReservationsWorkspace';
import ParkingSlotsTable from './components/AdminDashboard/Workspace/parking-slots/ParkingSlotsWorkspace';
import ReportsTable from './components/AdminDashboard/Workspace/reports/all-reports/ReportsWorkspace';
import AddStudent from './components/AdminDashboard/Workspace/students/add-student/AddStudent';
import AdminDashboardNew from './components/AdminDashboard/Workspace/Dashboard/AdminDashboard';
import StudentReports from './components/AdminDashboard/Workspace/reports/student-reports/StudentReports';
// Pages
import HomePage from '@pages/HomePage/HomePage';
import LoginPage from '@pages/LoginPage/LoginPage';
import ParkingSlots from './pages/ParkingSlots/ParkingSlots';
import UniversityProfile from './pages/ProfilePage/ProfilePage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Settings from './pages/Settings/SettingsPage';


// Main Application
function AppContent() {
  const location = useLocation();
  const hideLayoutOnRoutes = ['/login', '/'];

  // Check if the current route should hide the layout
  const showLayout = !hideLayoutOnRoutes.includes(location.pathname);

  return (
    // sticky footer"
    <div className="app-container">
      {showLayout && <Navigator />}

      <main className="main-content">
        <SessionWatcher />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <AuthGuard>
                <HomePage />
              </AuthGuard>
            }
          />
          <Route
            path="/slots"
            element={
              <AuthGuard>
                <ParkingSlots />
              </AuthGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <UniversityProfile />
              </AuthGuard>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthGuard>
                <Settings />
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <RoleGuard allowedRoles={['admin']}>
                  <AdminDashboard />
                </RoleGuard>
              </AuthGuard>
            }
          >
            {/* Redirect /admin => /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="students/all" element={<StudentsTable />} />
            <Route path="reservations" element={<ReservationsTable />} />
            <Route path="parking-slots" element={<ParkingSlotsTable />} />
            <Route path="reports/students" element={<ReportsTable />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="dashboard" element={<AdminDashboardNew />} />
            <Route path="reports/parking" element={<StudentReports />} />
          </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      {showLayout && <Footer />}
    </div>
  );
}

// Main App component
function App() {
  return (
    <GoogleOAuthProvider clientId="119759847656-munl4duj90dnheqmmukhnnr78s0hf7tt.apps.googleusercontent.com">
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <AppContent />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;