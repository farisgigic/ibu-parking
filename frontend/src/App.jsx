import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Komponente
import Navigator from '@navigator/Navigator';
import Footer from './components/Footer/Footer';
import AuthGuard from './components/AuthLogin/AuthGuard';
import SessionWatcher from './components/SessionWatcher/SessionWatcher';

// Stranice
import HomePage from '@pages/HomePage/HomePage';
import LoginPage from '@pages/LoginPage/LoginPage';
import ParkingSlots from './pages/ParkingSlots/ParkingSlots';
import UniversityProfile from './pages/ProfilePage/ProfilePage';

// Glavna komponenta za renderovanje sadržaja
function AppContent() {
  const location = useLocation();
  const hideLayoutOnRoutes = ['/login'];

  // Proveravamo da li treba prikazati Navigator i Footer
  const showLayout = !hideLayoutOnRoutes.includes(location.pathname);

  return (
    // Ovaj div je ključan za "sticky footer" layout
    <div className="app-container">
      {showLayout && <Navigator />}
      
      {/* Glavni sadržaj stranice */}
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
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>

      {showLayout && <Footer />}
    </div>
  );
}

// Glavna App komponenta
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