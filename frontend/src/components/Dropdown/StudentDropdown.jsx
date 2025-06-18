import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

/**
 * A helper component to render the avatar.
 * It displays the user's image if available, otherwise it shows their initials.
 */
const Avatar = ({ picture, name, className }) => {
    // A function to generate initials from a name
    const getInitials = (name) =>
        name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

    // If a picture URL is provided, render an <img> tag.
    if (picture) {
        return (
            <img
                src={picture}
                alt={`${name}'s avatar`}
                className={`${className} user-image`} // Add a specific class for image styling
                // Add a simple error handler to fall back if the image URL is broken
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
    const [open, setOpen] = useState(false);
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

    return (
        <div className={`student-dropdown ${className}`} ref={dropdownRef}>
            <button
                className={`dropdown-trigger ${open ? "active" : ""}`}
                onClick={() => setOpen(prev => !prev)}
                aria-expanded={open}
                aria-haspopup="true"
            >
                {/* Use the new Avatar component for the trigger */}
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
                        {/* Use the new Avatar component in the menu header as well */}
                        <Avatar picture={studentPicture} name={studentName} className="header-avatar" />

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