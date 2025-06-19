import express from 'express';
import reservationCtrl from '/src/controllers/ReservationController.js';

const router = express.Router();

router.get('/slots-with-reservations', reservationCtrl.getSlotsWithMonthlyReservations);

export default router;