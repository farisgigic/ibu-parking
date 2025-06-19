import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import logo from '@images/logo.png';
import API_BASE_URL from '@data/API_BASE_URL.js';
import StudentDropdown from '@components/Dropdown/StudentDropdown.jsx';

const Navigator = () => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => setUser(JSON.parse(localStorage.getItem('user')));
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem('user');
        navigate("/");
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const currentUrl = window.location.href;
    if (currentUrl === API_BASE_URL + "/login") {
        return (
            <header className="login-header">
                <div className="header-container">
                    <div className="logo-section">
                        <img src={logo} alt="logo" className="logo-img" referrerpolicy="no-referrer" />
                    </div>
                </div>
            </header>
        );
    }
    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem("user");
        if (userFromLocalStorage) {
            try {
                const parsed = JSON.parse(userFromLocalStorage);
                if (parsed.role?.toLowerCase() === "admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (err) {
                console.error("Error parsing user from localStorage:", err);
                setIsAdmin(false);
            }
        }
    }, []);


    return (
        <header className="main-header">
            <div className="header-container">
                <div className="left-section">
                    <div className="logo-section">
                        <img src={logo} alt="logo" className="logo-img" />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav">
                        <NavLink
                            to="/home"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Home
                        </NavLink>

                        <NavLink
                            to="/slots"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Students
                        </NavLink>
                        {isAdmin && (
                            <NavLink
                                to="/admin"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Admin Panel
                            </NavLink>
                        )}
                    </nav>
                </div>

                <div className="right-section">
                    <div className="user-section">
                        {user ? (
                            <StudentDropdown handleLogout={handleLogout} />
                        ) : (
                            <NavLink to="/login" className="login-btn">
                                <svg className="login-icon" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Login
                            </NavLink>
                        )}
                    </div>

                    <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? (
                            <svg viewBox="0 0 24 24" fill="none">
                                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none">
                                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <NavLink
                    to="/home"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Home
                </NavLink>

                <NavLink
                    to="/slots"
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Students
                </NavLink>

                <div className="mobile-user-section">
                    {user ? (
                        <div className="mobile-dropdown-wrapper">
                            <StudentDropdown className="mobile-user-dropdown" handleLogout={handleLogout} />
                        </div>
                    ) : (
                        <NavLink to="/login" className="mobile-login-btn" onClick={() => setIsMobileMenuOpen(false)}>
                            <svg className="login-icon" viewBox="0 0 24 24" fill="none">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Login
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navigator;
