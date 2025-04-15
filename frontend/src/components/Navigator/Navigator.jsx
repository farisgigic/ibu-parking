import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import logo from '@images/logo.png';
import API_BASE_URL from '@data/API_BASE_URL.js'; 
// import StudentNavigator from './StudentNavigator';
// import UserNavigator from './UserNavigator';
// import LoginNavigator from './LoginNavigator';

const Navigator = () => {
    
    const student = JSON.parse(localStorage.getItem('user'))
    console.log(student?.email); 

    const studentEmail = student?.email || '';

    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || null;
    });

    const navigate = useNavigate();

    // Effect to update state when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setUser(storedUser);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem('user');
        navigate("/");
    };

    const currentUrl = window.location.href;
    if (currentUrl === API_BASE_URL + "/login") {
        return (
            <header className="sticky_log">
                <div className="left-section"></div>
            </header>
        );
    } else {
        if(studentEmail.endsWith("@stu.ibu.edu.ba") || studentEmail.endsWith("@ibu.edu.ba")){
            return (
                    <header className="sticky">
                        <div className="left-section">
                            <span className="logo">
                                <img src={logo} alt="logo" />
                            </span>
                            <NavLink to="/home" className="button">
                                <span className="icon_home" /> Home
                            </NavLink>
                            <NavLink to="/students" className="button">
                                <span className="icon_students" /> Students
                            </NavLink>
                        </div>
                        <nav>
                            
                            {user ? (
                                <NavLink to="/" onClick= {handleLogout} className="button">Log out</NavLink>
                            ) : (
                                <NavLink to="/login" className="button">Log in</NavLink>
                            )}
                        </nav>
                    </header>
                );
        }else{
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
        
    }
};

export default Navigator;
