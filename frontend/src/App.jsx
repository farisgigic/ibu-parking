import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navigator from '@navigator/Navigator';
import HomePage from '@pages/HomePage/HomePage';
import LoginPage from '@pages/LoginPage/LoginPage';
import AuthGuard from './components/AuthLogin/AuthGuard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionWatcher from './components/SessionWatcher/SessionWatcher';


function AppContent() {
  const location = useLocation();
  const hideHeaderOnRoutes = ['/login'];

  const shouldShowHeader = !hideHeaderOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Navigator />}
      <SessionWatcher />
      <Routes>
        <Route
          path="/home"
          element={
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="119759847656-munl4duj90dnheqmmukhnnr78s0hf7tt.apps.googleusercontent.com">
      <BrowserRouter>
        <ToastContainer position="top-right" />
        <AppContent />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
