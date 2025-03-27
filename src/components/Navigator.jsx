import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import logo from '@images/logo.png'; // Ensure the path is correct
import '@styles/Header.css';

const Navigator = () => {
    const [user, setUser] = React.useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();

    const handleSuccess = (response) => {
        const decoded = jwtDecode(response.credential);
        setUser(decoded);
        localStorage.setItem('user', JSON.stringify(decoded));
        navigate("/home");
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem('user');
        navigate("/");
    };

    return (
        <header className="sticky">
            <div className="left-section">
                <span className="logo">
                    <img src={logo} alt="logo" />
                </span>
                <NavLink to="/home" className="button">
                    <span className="icon_home" /> Home
                </NavLink>
            </div>
            <nav>
                {user ? (
                    <div className="user-section">
                        {/* <img src={user.picture} alt="Profile" width="40" className="user-avatar" /> */}
                        <button onClick={handleLogout} className="button">Log out</button>
                    </div>
                ) : (
                    <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
                )}
            </nav>
        </header>
    );
};

export default Navigator;
