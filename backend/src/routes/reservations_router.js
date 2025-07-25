import express from 'express';
import reservationCtrl from '/src/controllers/ReservationController.js';

const router = express.Router();

router.get('/slots-with-reservations', reservationCtrl.getSlotsWithMonthlyReservations);
router.get('/all-reservations', reservationCtrl.getAllReservations);
router.get('/count/:studentId', reservationCtrl.countReservationsByStudentId);
router.get('/by-student/:studentId', reservationCtrl.getReservationsByStudentId);

router.post('/reserve-slot', reservationCtrl.reserveSlot);

router.delete('/delete/:reservationId', reservationCtrl.deleteReservation);

router.put('/edit/:reservationId', reservationCtrl.updateReservation);

export default router;