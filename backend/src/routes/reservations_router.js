import express from 'express';
import reservationCtrl from '/src/controllers/ReservationController.js';

const router = express.Router();

router.get('/slots-with-reservations', reservationCtrl.getSlotsWithMonthlyReservations);
router.get('/all-reservations', reservationCtrl.getAllReservations);

router.post('/reserve-slot', reservationCtrl.reserveSlot);

router.delete('/delete/:reservationId', reservationCtrl.deleteReservation);

router.put('/edit/:reservationId', reservationCtrl.updateReservation);

export default router;