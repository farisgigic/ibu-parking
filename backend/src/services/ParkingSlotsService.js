import ParkingSlot from '../models/parkingSlot_model.js';

const bookParkingSlot = async (id, reservedBy) => {
    const parkingSlot = await ParkingSlot.findByPk(id);

    if (!parkingSlot) {
        throw new Error('Parking slot not found');
    }

    if (!parkingSlot.is_available) {
        throw new Error('Parking slot is already booked');
    }

    parkingSlot.is_available = false;
    parkingSlot.reserved_by = reservedBy;
    parkingSlot.reservation_start_date = new Date();
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    parkingSlot.reservation_end_date = endDate;

    parkingSlot.status = 'pending';

    await parkingSlot.save();

    return parkingSlot;
};

export default {
    bookParkingSlot,
};
