import { API } from './Api';

export const reservationApi = {
    getAllReservations: async (page = 1, limit = 5) => {
        try {
            const response = await API.get(`/reservations/all?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reservations:', error);
            throw error;
        }
    }
    ,
    getSlotsWithMonthlyReservations: async (month, year) => {
        try {
            const response = await API.get(`/reservations/slots-with-reservations?month=${month}&year=${year}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching slots with monthly reservations:', error);
            throw error;
        }
    }
};

export default reservationApi;  