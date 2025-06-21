import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from '../LogoutConfirmModal/LogoutModal';



const Avatar = ({ picture, name, className }) => {

    const getInitials = (name) =>
        name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

    if (picture) {
        return (
            <img
                src={picture}
                alt={`${name}'s avatar`}
                className={`${className} user-image`}
                referrerPolicy="no-referrer"
                onError={(e) => { e.target.style.display = 'none'; }}
            />
        );
    }

    // Otherwise, fall back to rendering the initials inside a div.
    return (
        <div className={className}>
            {getInitials(name)}
        </div>
    );
};

const StudentDropdown = ({ handleLogout, className = "" }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Add modal state
    const dropdownRef = useRef(null);

    // Safely parse user data and extract properties, providing defaults
    const student = JSON.parse(localStorage.getItem("user"));
    const studentName = student?.name || "User";
    const studentEmail = student?.email || "";
    const studentPicture = student?.picture; // Get the picture URL

    const closeDropdown = useCallback(() => setOpen(false), []);

    useEffect(() => {
        // Close dropdown if clicked outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };
        // Close dropdown on 'Escape' key press
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

    // A handler to close the menu before navigating or performing an action
    const handleItemClick = (callback) => {
        closeDropdown();
        if (typeof callback === "function") callback();
    };
    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    // Handle modal confirmation - actually logout
    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        if (handleLogout) {
            handleLogout();
        }
    };
    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    }

    return (
        <>
            <div className={`student-dropdown ${className}`} ref={dropdownRef}>
                <button
                    className={`dropdown-trigger ${open ? "active" : ""}`}
                    onClick={() => setOpen(prev => !prev)}
                    aria-expanded={open}
                    aria-haspopup="true"
                >
                    <Avatar picture={studentPicture} name={studentName} className="user-avatar" />

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
                            <Avatar picture={studentPicture} name={studentName} className="header-avatar" />

                            <div className="header-info">
                                <div className="header-name">{studentName}</div>
                                <div className="header-email">{studentEmail}</div>
                            </div>
                        </div>

                        <div className="dropdown-divider" />

                        <button
                            className="dropdown-item"
                            onClick={() => handleItemClick(() => navigate('/profile'))}
                        >
                            <span className="item-icon">👤</span>
                            <span>View Profile</span>
                        </button>

                        <button
                            className="dropdown-item"
                            onClick={() => handleItemClick(() => navigate('/settings'))}
                        >
                            <span className="item-icon">⚙️</span>
                            <span>Settings</span>
                        </button>

                        <div className="dropdown-divider" />

                        <button
                            className="dropdown-item logout-item"
                            onClick={() => handleItemClick(handleLogoutClick)}
                        >
                            <span className="item-icon">🚪</span>
                            <span>Sign Out</span>
                        </button>
                    </div>
                )}
            </div>

            <LogoutModal
                isOpen={showLogoutModal}
                onConfirm={handleConfirmLogout}
                onCancel={handleCancelLogout}
                title="Confirm Sign Out"
                message="Are you sure you want to sign out? You'll need to log in again to access your account."
            />
        </>
    );
};

export default StudentDropdown;