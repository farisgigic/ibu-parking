
import { ParkingSlot, Reservation } from '../models/index.js';

const { Op } = require('sequelize');


const reservationService = {
  async getSlotsWithMonthlyReservations(month, year) {
    const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
    const endOfMonth = new Date(Date.UTC(year, month, 1));

    const slots = await ParkingSlot.findAll({
      include: [
        {
          model: Reservation,
          as: 'reservations',
          where: {
            reservations_start_date: { [Op.lt]: endOfMonth },
            reservations_end_date: { [Op.gt]: startOfMonth }
          },
          required: false
        }
      ]
    });

    const processedSlots = slots.map(slot => {
      const plain = slot.toJSON();
      const hasReservation = plain.reservations && plain.reservations.length > 0;

      // Ako postoji rezervacija, postavi polja
      if (hasReservation) {
        plain.is_available = false;
        plain.reserved_by = plain.reservations[0].student_id;
        plain.reserved_at = plain.reservations[0].reservation_start_date;
        plain.reservation_start_date = plain.reservations[0].reservation_start_date;
        plain.reservation_end_date = plain.reservations[0].reservation_end_date;
      } else {
        plain.is_available = !plain.is_locked;
        plain.reserved_by = null;
        plain.reserved_at = null;
        plain.reservation_start_date = null;
        plain.reservation_end_date = null;
      }

      delete plain.reservations;
      return plain;
    });

    return processedSlots;
  }
};

export default reservationService;
