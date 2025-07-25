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
    },
    getAllReservations: async () => {
        try {
            const response = await API.get('/reservations/all-reservations');
            return response.data;
        } catch (error) {
            console.error('Error fetching all reservations:', error);
            throw error;
        }
    },
    deleteReservation: async (reservationId) => {
        try {
            const response = await API.delete(`/reservations/delete/${reservationId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting reservation:', error);
            throw error;
        }
    },
    updateReservation: async (reservationId, { reservations_start_date, reservations_end_date, status }) => {
        try {
            const response = await API.put(`/reservations/edit/${reservationId}`, {
                reservations_start_date,
                reservations_end_date,
                status
            });
            return response.data;
        } catch (error) {
            console.error('Error updating reservation:', error);
            throw error;
        }
    },
    countReservationsByStudentId: async (studentId) => {
        try {
            const response = await API.get(`/reservations/count/${studentId}`);
            return response.data;
        } catch (error) {
            console.error('Error counting reservations by student ID:', error);
            throw error;
        }
    },
    getReservationsByStudentId: async (studentId) => {
        try {
            const response = await API.get(`/reservations/by-student/${studentId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reservations by student ID:', error);
            throw error;
        }
    }

};

export default reservationApi;  