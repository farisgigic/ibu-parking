
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
            reservations_end_date: { [Op.gt]: startOfMonth },
            status: { [Op.notIn]: ['rejected', 'cancelled'] }
          },
          required: false 
        }
      ],
      order: [['slot_code', 'ASC']] 
    });

    const processedSlots = slots.map(slot => {
      const plain = slot.toJSON();
      const activeReservation = plain.reservations && plain.reservations.length > 0 ? plain.reservations[0] : null;

      if (activeReservation) {
    
        plain.status = activeReservation.status; 

        
        if (activeReservation.status.toLowerCase() === 'accepted/paid') {
          plain.is_available = false;
        } else {
          plain.is_available = true;
        }

        plain.reserved_by = activeReservation.student_id;
        plain.reservation_start_date = activeReservation.reservations_start_date;
        plain.reservation_end_date = activeReservation.reservations_end_date;

      } else {
        plain.is_available = !plain.is_locked;
        plain.status = null;
        plain.reserved_by = null;
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
      reservations_end_date: endDate,
      status: 'pending' 
    });

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
            'email', 'picture_url']
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
  },


  async updateReservation(id, startDate, endDate, status) {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    await reservation.update({
      reservations_start_date: startDate,
      reservations_end_date: endDate,
      status,
    });

    const slot = await ParkingSlot.findByPk(reservation.parking_slot_id);
    if (slot) {
      if (status.toLowerCase() === 'accepted/paid') {
        await slot.update({ is_available: false });
      } else if (['rejected', 'cancelled'].includes(status.toLowerCase())) {
        await slot.update({ is_available: true, reserved_by: null, reserved_at: null });
      }
    }

    // Vrati ažuriranu rezervaciju kao potvrdu
    return reservation.toJSON();
  },


  async countReservationsByStudentId(studentId) {
    const count = await Reservation.count({
      where: {
        student_id: studentId,
        status: { [Op.notIn]: ['rejected', 'cancelled'] } 
      }
    });
    return count;
  }

};

export default reservationService;
