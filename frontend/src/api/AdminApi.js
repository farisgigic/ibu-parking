import { API } from './Api';

export const adminApi = {
    getAllAdministrators: async () => {
        try {
            const response = await API.get('/administrators/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching administrators:', error);
            throw error;
        }
    },
    getAdminByEmail: async (email) => {
        try {
            const response = await API.get(`/administrators/${email}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching administrator with email ${email}:`, error);
            throw error;
        }
    }
};
export default adminApi;