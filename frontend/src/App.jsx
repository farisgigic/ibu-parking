import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navigator from '@navigator/Navigator';
import Footer from './components/Footer/Footer';
import AuthGuard from './components/AuthLogin/AuthGuard';
import SessionWatcher from './components/SessionWatcher/SessionWatcher';

// Pages
import HomePage from '@pages/HomePage/HomePage';
import LoginPage from '@pages/LoginPage/LoginPage';
import ParkingSlots from './pages/ParkingSlots/ParkingSlots';
import UniversityProfile from './pages/ProfilePage/ProfilePage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';


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
            path = "/admin"
            element= {
              <AuthGuard>
                <AdminDashboard />
              </AuthGuard>
            }
          />
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