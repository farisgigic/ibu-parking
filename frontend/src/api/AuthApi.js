import axios from 'axios';
import { API } from './Api';

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