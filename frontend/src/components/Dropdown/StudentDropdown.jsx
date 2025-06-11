import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./StudentDropdown.module.css"; 

const StudentDropdown = ({ handleLogout, className = "" }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const student = JSON.parse(localStorage.getItem("user"));
    const studentName = student?.first_name || "User";
    const studentEmail = student?.email || "";
    
    // Get initials for avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    const handleItemClick = (callback) => {
        setOpen(false);
        if (callback) callback();
    };

    return (
        <div className={`student-dropdown ${className}`} ref={dropdownRef}>
            <button 
                className={`dropdown-trigger ${open ? 'active' : ''}`}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-haspopup="true"
            >
                <div className="user-avatar">
                    {getInitials(studentName)}
                </div>
                <div className="user-info">
                    <span className="user-name">{studentName}</span>
                    <span className="user-email">{studentEmail}</span>
                </div>
                <svg 
                    className={`dropdown-arrow ${open ? 'rotated' : ''}`} 
                    viewBox="0 0 24 24" 
                    fill="none"
                >
                    <path 
                        d="M6 9l6 6 6-6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            
            <div className={`dropdown-menu ${open ? 'open' : ''}`}>
                <div className="dropdown-header">
                    <div className="header-avatar">
                        {getInitials(studentName)}
                    </div>
                    <div className="header-info">
                        <div className="header-name">{studentName}</div>
                        <div className="header-email">{studentEmail}</div>
                    </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => handleItemClick()}
                >
                    <svg className="item-icon" viewBox="0 0 24 24" fill="none">
                        <path 
                            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                        <circle 
                            cx="12" 
                            cy="7" 
                            r="4" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>View Profile</span>
                </Link>
                
                <Link 
                    to="/settings" 
                    className="dropdown-item"
                    onClick={() => handleItemClick()}
                >
                    <svg className="item-icon" viewBox="0 0 24 24" fill="none">
                        <circle 
                            cx="12" 
                            cy="12" 
                            r="3" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                        <path 
                            d="M12 1v6m0 6v6m11-7h-6m-6 0H1" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Settings</span>
                </Link>
                
                <div className="dropdown-divider"></div>
                
                <button 
                    className="dropdown-item logout-item"
                    onClick={() => handleItemClick(handleLogout)}
                >
                    <svg className="item-icon" viewBox="0 0 24 24" fill="none">
                        <path 
                            d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                        <polyline 
                            points="16,17 21,12 16,7" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                        <line 
                            x1="21" 
                            y1="12" 
                            x2="9" 
                            y2="12" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default StudentDropdown;