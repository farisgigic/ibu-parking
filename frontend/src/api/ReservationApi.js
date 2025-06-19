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
    },
    reserveSlot: async ({ slotId, studentId, startDate, endDate }) => {
        try {
            const response = await API.post('/reservations/reserve-slot', {
                slotId,
                studentId,
                startDate,
                endDate
            });
            return response.data;
        } catch (error) {
            console.error('Error reserving slot:', error);
            throw error;
        }
    }

};

export default reservationApi;  