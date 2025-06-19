import reservationService from '../services/ReservationService.js';  

const reservationController = {
  async getSlotsWithMonthlyReservations(req, res) {
    try {
      const { month, year } = req.query;

      if (!month || !year) {
        return res.status(400).json({ message: 'Month and year are required' });
      }

      const slots = await reservationService.getSlotsWithMonthlyReservations(parseInt(month), parseInt(year));
      res.status(200).json(slots);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

export default reservationController;
