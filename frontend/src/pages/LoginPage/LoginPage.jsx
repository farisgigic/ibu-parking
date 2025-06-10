import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginWithGoogle } from '../../api/AuthApi'; 

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSuccess = async (credentialResponse) => {
        setIsLoading(true);
        setError(null);

        try {
            const googlePayload = jwtDecode(credentialResponse.credential);
            console.log("Payload od Google-a:", googlePayload);

            const response = await loginWithGoogle(googlePayload);
            
            const { student, message } = response;
            console.log(message);
            console.log("Podaci o studentu sa servera:", student);
            const sessionData = {
                ...student, // Kopiramo sve podatke o studentu (ime, email, student_id...)
                // 2. Ručno dodajemo vreme isteka sesije (npr. 1 sat od sada)
                expireAt: Date.now() + 60 * 60 * 1000 // 60 minuta * 60 sekundi * 1000 milisekundi
            };

            // 3. Čuvamo ovaj novi, kompletni objekat u localStorage
            localStorage.setItem("user", JSON.stringify(sessionData));
            
            // ==========================================================
            
            window.dispatchEvent(new Event("storage"));
            navigate("/home");

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Došlo je do greške prilikom prijave. Pokušajte ponovo.";
            console.error("Greška pri prijavi:", errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = () => {
        console.log("Google prijava nije uspela.");
        setError("Prijava putem Google-a nije uspela. Proverite vaš nalog i pokušajte ponovo.");
    };

    return (
        <div className="login-page">
            <div className="login_box">
                <img src="/images/logo.png" alt="IBU Logo" className="logo" />
                <h3>Log in using your account on:</h3>
                
                <div className="google-login-container">
                    {isLoading ? (
                        <p>Proveravam podatke...</p>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    )}
                </div>

                {error && <p className="error-message" style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;