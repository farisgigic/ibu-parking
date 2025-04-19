import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentDropdown = ({ handleLogout }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown_button" onClick={() => setOpen(!open)}>
                Account ▼
            </button>
            {open && (
                <div className="dropdown-menu show">
                    <Link to="/home" className="dropdown-item" onClick={() => setOpen(false)}>
                        Profile
                    </Link>
                    <button className="dropdown-item" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentDropdown;
