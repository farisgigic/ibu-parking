import reservationService from '../services/ReservationService.js';  

const reservationController = {
  async getSlotsWithMonthlyReservations(req, res) {
    try {
      const { month, year } = req.query;

      if (!month || !year) {
        return res.status(400).json({ message: 'Month and year are required!!' });
      }

      const slots = await reservationService.getSlotsWithMonthlyReservations(parseInt(month), parseInt(year));
      res.status(200).json(slots);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  async reserveSlot(req, res) {
    try {
      const { slotId, studentId, startDate, endDate } = req.body;

      if (!slotId || !studentId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Slot ID, student ID, start date and end date are required!' });
      }

      const reservation = await reservationService.reserveSlot(slotId, studentId, new Date(startDate), new Date(endDate));
      res.status(201).json(reservation);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
  async getAllReservations(req, res) {
    try {
      const reservations = await reservationService.getAllReservations();
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  async deleteReservation(req, res) {
    try {
      const { reservationId } = req.params;

      if (!reservationId) {
        return res.status(400).json({ message: 'Reservation ID is required!' });
      }

      const deletedReservation = await reservationService.deleteReservation(reservationId);
      if (!deletedReservation) {
        return res.status(404).json({ message: 'Reservation not found!' });
      }

      res.status(200).json({ message: 'Reservation deleted successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

export default reservationController;
