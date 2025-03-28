import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import logo from '@images/logo.png';
import '@styles/Header.css';
import API_BASE_URL from '@data/API_BASE_URL.js'; 

const Navigator = () => {
    const [user, setUser] = React.useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem('user');
        navigate("/");
    };
    const url = API_BASE_URL;
    console.log(url);
    // console.log(window.location.href);
    const currentUrl = window.location.href;
    if (currentUrl === url + "/login") {
        return (
            <header className="sticky_log">
            <div className="left-section">
            </div>
        </header>
        );
    }else {
        return (

            <header className="sticky">
                <div className="left-section">
                    <span className="logo">
                        <img src={logo} alt="logo" />
                    </span>
                    <NavLink to="/" className="button">
                        <span className="icon_home" /> Home
                    </NavLink>
                </div>
                <nav>
                    {user ? (
                        <button onClick={handleLogout} className="button">Log out</button>
                    ) : (
                        <NavLink to="/login" className="button">Log in</NavLink>
                    )}
                </nav>
            </header>
        );
    }
};

export default Navigator;
