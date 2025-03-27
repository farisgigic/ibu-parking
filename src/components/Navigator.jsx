import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@images/logo.png'; // Ensure the path is correct
import '@styles/Header.css';

const Navigator = () => {
    const [user, setUser] = React.useState(null);

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
                <NavLink to="/projects" className="button">Projects</NavLink>
                <NavLink to="/login" className="button">
                    <span className="icon_user" /> {user ? 'Log out' : 'Log in'}
                </NavLink>
            </nav>
        </header>
    );
};

export default Navigator;
