import { API } from './Api';


export const notificationApi = {
    getAllNotifications: async () => {
        try {
            const response = await API.get('/notifications/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }
};
export default notificationApi;