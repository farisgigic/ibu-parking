import axios from 'axios';

// Konfiguracija Axios instance
const API = axios.create({
    baseURL: 'http://localhost:8787', // <-- NAJČEŠĆE REŠENJE: Postavite prefiks ovde
});

export const loginWithGoogle = async (googlePayload) => {
    try {
        // Sada će URL biti ispravan: http://localhost:8787/api/auth/google/callback
        const response = await API.post('/auth/google/callback', googlePayload);
        return response.data;
    } catch (error) {
        console.error("Greška pri komunikaciji sa backendom:", error.response?.data || error.message);
        throw error;
    }
};