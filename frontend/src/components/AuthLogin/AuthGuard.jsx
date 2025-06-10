import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isTokenExpired } from '../../assets/data/ExipredToken.js'; 

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isTokenExpired()) {
            localStorage.removeItem("user");
            toast.error("Session expired. Please log in again.");
            navigate("/login");
        }
    }, []);

    return children;
};

export default AuthGuard;
