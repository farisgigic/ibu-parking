import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSuccess = (response) => {
        const decoded = jwtDecode(response.credential);
        const expireAt = Date.now() + 60 * 1000; //for 1 minute 
        console.log(decoded);

        const user = {
            ...decoded,
            expireAt,
        };
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));
        navigate("/home");
    };

    return (
        <div className="login-page">
            <div className="login_box">
                <img src="/images/logo.png" alt="IBU Logo" className="logo" />
                <h3>Log in using your account on:</h3>
                <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
            </div>
        </div>
    );
};

export default LoginPage;
