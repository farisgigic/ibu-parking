// components/SessionWatcher.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SessionWatcher = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.expireAt && Date.now() > user.expireAt) {
                localStorage.removeItem("user");
                toast.info("Session expired. Please log in again.");
                navigate("/login");
            }
        }, 5000); 

        return () => clearInterval(interval);
    }, [navigate]);

    return null; 
};

export default SessionWatcher;
