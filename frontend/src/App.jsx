import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navigator from '@navigator/Navigator';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';

function AppContent() {
  const location = useLocation();
  const hideHeaderOnRoutes = ['/login'];

  const shouldShowHeader = !hideHeaderOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Navigator />}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="784001994898-5tj46e0f6k79olbenn835mk6drnqc3rk.apps.googleusercontent.com">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
