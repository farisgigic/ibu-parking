import express from 'express';
import parkingSlotCtrl from '../controllers/parkingSlot_controller.js';


const router = express.Router();    

router.route('/all')
    .get(parkingSlotCtrl.getAllParkingSlots)
    .post(parkingSlotCtrl.createParkingSlot);

router.route('/by_id/:reserved_by')
    .get(parkingSlotCtrl.getParkingSlotByStudentId)
    .delete(parkingSlotCtrl.deleteParkingSlot);

router.route('/book/:id').put(parkingSlotCtrl.bookParkingSlot);

router.get(
    '/by_slot_code/:slot_code',
    parkingSlotCtrl.getIdBySlotCode
)

router.put(
    '/update/:id',
    parkingSlotCtrl.updateParkingSlot
);

router.get(
    '/all-slots',
    parkingSlotCtrl.getAll
);

router.get(
    '/count',
    parkingSlotCtrl.countParkingSlots
);

router.get(
    '/count/:id',
    parkingSlotCtrl.countParkingSlotsById
);

export default router;