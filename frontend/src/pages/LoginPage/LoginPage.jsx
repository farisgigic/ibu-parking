import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { loginWithGoogle } from '../../api/AuthApi';
import { adminApi } from '../../api/AdminApi';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            setError(null);

            try {
                const googleUserInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                const response = await loginWithGoogle(googleUserInfo.data);

                let isAdmin = false;
                const admin = await adminApi.getAdminByEmail(response.student.email);
                if (admin.role !== "student") {
                    isAdmin = true;
                }

                const sessionData = {
                    ...googleUserInfo.data,
                    access_token: tokenResponse.access_token, // store token
                    expireAt: Date.now() + 60 * 60 * 1000, // 1 hour
                    role: isAdmin ? "admin" : "student",
                };

                localStorage.setItem("user", JSON.stringify(sessionData));
                window.dispatchEvent(new Event("storage"));
                navigate("/home");

            } catch (err) {
                const errorMessage = err.response?.data?.message || "Došlo je do greške prilikom prijave. Pokušajte ponovo.";
                console.error("Greška pri prijavi:", errorMessage);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },

        onError: () => {
            console.error("Google login failed");
            setError("Google login failed. Please try again.");
        },
        scope: "profile email",
    });


    return (
        <div className="login-page">
            <div className="login_box">
                <img src="/images/logo.png" alt="IBU Logo" className="logo" />
                <div className="google-login-container">
                    {isLoading ? (
                        <p>Checking data</p>
                    ) : (
                        <button onClick={() => handleGoogleLogin()} className="google-login-button">
                            <img
                                src="images/google.png"
                                alt="Google logo"
                                className="google-logo"
                            />
                            Log in using Google Account
                        </button>
                    )}
                </div>

                {error && <p className="error-message" style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
