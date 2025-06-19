
import { ParkingSlot, Reservation } from '../models/index.js';
import Student from '../models/student_model.js';
const { Op } = require('sequelize');
import Sequelize from 'sequelize';

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
  },

  async reserveSlot(slotId, studentId, startDate, endDate) {
    const slot = await ParkingSlot.findByPk(slotId);

    if (!slot) {
      throw new Error('Parking slot not found');
    }

    if (!slot.is_available) {
      throw new Error('Parking slot is not available for reservation');
    }

    const reservation = await Reservation.create({
      parking_slot_id: slotId,
      student_id: studentId,
      reservations_start_date: startDate,
      reservations_end_date: endDate
    });

    // Update the parking slot to mark it as reserved
    slot.is_available = false;
    slot.reserved_by = studentId;
    slot.reserved_at = new Date();
    await slot.save();

    return reservation;
  },

  getAllReservations: async () => {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: ParkingSlot,
          as: 'slot',
          attributes: ['slot_code']
        },
        {
          model: Student,
          as: 'student',
          attributes: [
            [Sequelize.literal(`CONCAT(student.first_name, ' ', student.last_name)`), 'full_name'],
            'email']
        }
      ]
    });

    return reservations.map(reservation => reservation.toJSON());
  },
  deleteReservation: async (reservationId) => {
    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    // Update the parking slot to mark it as available
    const slot = await ParkingSlot.findByPk(reservation.parking_slot_id);
    if (slot) {
      slot.is_available = true;
      slot.reserved_by = null;
      slot.reserved_at = null;
      await slot.save();
    }

    await reservation.destroy();
    return { message: 'Reservation deleted successfully' };
  }
};

export default reservationService;
