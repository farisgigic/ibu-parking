import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@styles/App.css';
import Navigator from '@components/Navigator';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';

function App() {
  return (
    <GoogleOAuthProvider clientId="784001994898-5tj46e0f6k79olbenn835mk6drnqc3rk.apps.googleusercontent.com">
      <BrowserRouter>
        <Navigator />
        <Routes>
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
