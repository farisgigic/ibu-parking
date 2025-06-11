import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const StudentDropdown = ({ handleLogout, className = "" }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const student = JSON.parse(localStorage.getItem("user"));
    const studentName = student?.first_name || "User";
    const studentEmail = student?.email || "";

    const getInitials = (name) =>
        name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

    const closeDropdown = useCallback(() => setOpen(false), []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [closeDropdown]);

    const handleItemClick = (callback) => {
        closeDropdown();
        if (typeof callback === "function") callback();
    };

    return (
        <div className={`student-dropdown ${className}`} ref={dropdownRef}>
            <button
                className={`dropdown-trigger ${open ? "active" : ""}`}
                onClick={() => setOpen(prev => !prev)}
                aria-expanded={open}
                aria-haspopup="true"
            >
                <div className="user-avatar">{getInitials(studentName)}</div>
                <div className="user-info">
                    <span className="user-name">{studentName}</span>
                    <span className="user-email">{studentEmail}</span>
                </div>
                <svg
                    className={`dropdown-arrow ${open ? "rotated" : ""}`}
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

            {open && (
                <div className="dropdown-menu open">
                    <div className="dropdown-header">
                        <div className="header-avatar">{getInitials(studentName)}</div>
                        <div className="header-info">
                            <div className="header-name">{studentName}</div>
                            <div className="header-email">{studentEmail}</div>
                        </div>
                    </div>

                    <div className="dropdown-divider" />

                    <Link
                        to="/profile"
                        className="dropdown-item"
                        onClick={() => handleItemClick()}
                    >
                        <span className="item-icon">👤</span>
                        <span>View Profile</span>
                    </Link>

                    <Link
                        to="/settings"
                        className="dropdown-item"
                        onClick={() => handleItemClick()}
                    >
                        <span className="item-icon">⚙️</span>
                        <span>Settings</span>
                    </Link>

                    <div className="dropdown-divider" />

                    <button
                        className="dropdown-item logout-item"
                        onClick={() => handleItemClick(handleLogout)}
                    >
                        <span className="item-icon">🚪</span>
                        <span>Sign Out</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentDropdown;
