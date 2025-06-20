import { API } from './Api';
export const slotsApi = {
  // Get all parking slots with optional month and year filtering
  getAllSlots: async (month, year) => {
    try {
      const response = await API.get('/parking_slots/all', {
        params: { month, year }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching parking slots:', error);
      throw error;
    }
  },
  getAll: async () => {
    try {
      const response = await API.get('/parking_slots/all-slots');
      return response.data;
    } catch (error) {
      console.error('Error fetching all parking slots:', error);
      throw error;
    }
  },
  getAllParkingSlots: async () => {
    try {
      const response = await API.get('/parking_slots/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all parking slots:', error);
      throw error;
    }
  },
  // Get slots by section
  getSlotsBySection: async (section) => {
    try {
      const response = await API.get(`/parking_slots/section/${section}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching slots for section ${section}:`, error);
      throw error;
    }
  },

  // Get slots by type
  getSlotsByType: async (type) => {
    try {
      const response = await API.get(`/parking_slots/type/${type}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching slots for type ${type}:`, error);
      throw error;
    }
  },

  // Get available slots
  getAvailableSlots: async () => {
    try {
      const response = await API.get('/parking_slots/available');
      return response.data;
    } catch (error) {
      console.error('Error fetching available slots:', error);
      throw error;
    }
  },

  // Book a parking slot
  bookSlot: async (slotId, bookingData) => {
    try {
      const response = await API.post(`/parking_slots/${slotId}/book`, bookingData);
      return response.data;
    } catch (error) {
      console.error(`Error booking slot ${slotId}:`, error);
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (slotId) => {
    try {
      const response = await API.delete(`/parking_slots/${slotId}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling booking for slot ${slotId}:`, error);
      throw error;
    }
  },

  // Get user's bookings
  getUserBookings: async (userId) => {
    try {
      const response = await API.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bookings for user ${userId}:`, error);
      throw error;
    }
  },

  // Get bookings by date
  getBookingsByDate: async (date) => {
    try {
      const response = await API.get(`/bookings/date/${date}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching bookings for date ${date}:`, error);
      throw error;
    }
  },

  // Get booking statistics
  getBookingStats: async () => {
    try {
      const response = await API.get('/bookings/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching booking statistics:', error);
      throw error;
    }
  },

  // Update slot status
  updateSlotStatus: async (slotId, status) => {
    try {
      const response = await API.patch(`/parking_slots/${slotId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating slot ${slotId} status:`, error);
      throw error;
    }
  },

  getBySlotCode: async (slotCode) => {
    try {
      const response = await API.get(`/parking_slots/by_slot_code/${slotCode}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching slot by code ${slotCode}:`, error);
      throw error;
    }
  },

  updateSlot: async (slotId, slotData) => {
    try {
      const response = await API.put(`/parking_slots/update/${slotId}`, slotData);
      return response.data;
    } catch (error) {
      console.error(`Error updating slot ${slotId}:`, error);
      throw error;
    }
  },
};

export default slotsApi;