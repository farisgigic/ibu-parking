import { API } from './Api';

export const notificationApi = {
    getAllNotifications: async (page = 1, limit = 5) => {
        try {
            const response = await API.get(`/notifications/all?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }
};

export default notificationApi;