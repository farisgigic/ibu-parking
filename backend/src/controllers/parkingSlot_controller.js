
import ParkingSlot from '/src/models/parkingSlot_model.js';

const createParkingSlot = async (req, res) => {
    try {
        const parkingSlot = await ParkingSlot.create(req.body);
        res.status(201).json(parkingSlot);
    } catch (error) {
        res.status(500).json({ message: 'Error creating parking slot', error });
    }
}
const getAll = async (req, res) => {
    try {
        const parkingSlots = await ParkingSlot.findAll({
            order: [['section', 'ASC'], ['slot_code', 'ASC']],
        });
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots', error });
    }
};


const getAllParkingSlots = async (req, res) => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: 'Month and year are requiredddddd' });
        }

        const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
        const endOfMonth = new Date(Date.UTC(year, month, 1)); // Start of next month

        // Find all slots that are NOT reserved within the given month.
        // A slot is considered available for the month if its reservation period
        // does not overlap with the month.
        // For simplicity, let's first get all slots and process their availability.

        const allSlots = await ParkingSlot.findAll();

        const slotsWithAvailability = allSlots.map(slot => {
            let isAvailable = true;
            if (slot.reservation_start_date && slot.reservation_end_date) {
                const reservationStart = new Date(slot.reservation_start_date);
                const reservationEnd = new Date(slot.reservation_end_date);

                // Check for overlap: (StartA <= EndB) and (EndA >= StartB)
                if (reservationStart < endOfMonth && reservationEnd > startOfMonth) {
                    isAvailable = false;
                }
            }
            // Return a new object to avoid mutating the original Sequelize instance
            return {
                ...slot.toJSON(),
                is_available: isAvailable
            };
        });

        res.status(200).json(slotsWithAvailability);

    } catch (error) {
        console.error('Error in getAllParkingSlots:', error);
        res.status(500).json({ message: 'Error fetching parking slots', error: error.message });
    }
};
const getParkingSlotById = async (req, res) => {
    try {
        const { id } = req.params;
        const parkingSlot = await ParkingSlot.findByPk(id);
        if (!parkingSlot) {
            return res.status(404).json({ message: 'Parking slot not found' });
        }
        res.status(200).json(parkingSlot);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slot', error });
    }
}
const getParkingSlotByStudentId = async (req, res) => {
    try {
        const studentId = req.params.reserved_by;
        const parkingSlots = await ParkingSlot.findAll({
            where: { reserved_by: studentId },
        });

        if (parkingSlots.length === 0) {
            return res.status(404).json({ message: 'No parking slots reserved by this student' });
        }

        res.status(200).json(parkingSlots);
    } catch (error) {
        console.error("Error fetching parking slots for student:", error);
        res.status(500).json({ message: 'Error fetching parking slots for the student', error });
    }
};


const updateParkingSlot = async (req, res) => {
    try {
        const { id } = req.params;
        const parkingSlot = await ParkingSlot.findByPk(id);
        if (!parkingSlot) {
            return res.status(404).json({ message: 'Parking slot not found' });
        }
        await parkingSlot.update(req.body);
        res.status(200).json(parkingSlot);
    } catch (error) {
        res.status(500).json({ message: 'Error updating parking slot', error });
    }
}
const deleteParkingSlot = async (req, res) => {
    try {
        const { id } = req.params;
        const parkingSlot = await ParkingSlot.findByPk(id);
        if (!parkingSlot) {
            return res.status(404).json({ message: 'Parking slot not found' });
        }
        await parkingSlot.destroy();
        res.status(200).json({ message: 'Parking slot deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting parking slot', error });
    }
};
const getAvailableParkingSlots = async (req, res) => {
    try {
        const availableSlots = await ParkingSlot.findAll({
            where: { is_available: true }
        });
        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching available parking slots', error });
    }
}
const getParkingSlotsBySection = async (req, res) => {
    try {
        const { section } = req.params;
        const parkingSlots = await ParkingSlot.findAll({
            where: { section }
        });
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots by section', error });
    }
}
const getParkingSlotsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const parkingSlots = await ParkingSlot.findAll({
            where: { type }
        });
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots by type', error });
    }
}
const getParkingSlotsByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const parkingSlots = await ParkingSlot.findAll({
            where: { location }
        });
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots by location', error });
    }
}
const getParkingSlotsByAvailability = async (req, res) => {
    try {
        const { is_available } = req.params;
        const parkingSlots = await ParkingSlot.findAll({
            where: { is_available }
        });
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots by availability', error });
    }
}
const getParkingSlotsByReservedBy = async (req, res) => {
    try {
        const { reserved_by } = req.params;
        const parkingSlots = await ParkingSlot.findAll({
            where: { reserved_by }
        });
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots by reserved by', error });
    }
}
const getParkingSlotsByReservedAt = async (req, res) => {
    try {
        const { reserved_at } = req.params;
        const parkingSlots = await ParkingSlot.findAll({
            where: { reserved_at }
        });
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots by reserved at', error });
    }
}
const getParkingSlotsBySlotCode = async (req, res) => {
    try {
        const { slot_code } = req.params;
        const parkingSlots = await ParkingSlot.findAll({
            where: { slot_code }
        });
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots by slot code', error });
    }
}

const bookParkingSlot = async (req, res) => {
    const { id } = req.params;
    const { reserved_by } = req.body;

    try {
        const result = await bookingService.bookParkingSlot(id, reserved_by);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getIdBySlotCode = async (req, res) => {
    const { slot_code } = req.params;
    try {
        const parkingSlot = await ParkingSlot.findOne({
            where: { slot_code }
        });

        if (!parkingSlot) {
            return res.status(404).json({ message: 'Parking slot not found' });
        }

        res.status(200).json({ id: parkingSlot.id });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slot by slot code', error });
    }
}
const countParkingSlots = async (req, res) => {
    try {
        const count = await ParkingSlot.count();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error counting parking slots', error });
    }
};
const countParkingSlotsById = async (req, res) => {
    try {
        const { id } = req.params;
        const count = await ParkingSlot.count({
            where: { id }
        });
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error counting parking slots by ID', error });
    }
}


export default { getAllParkingSlots, getParkingSlotByStudentId, createParkingSlot, getParkingSlotById, updateParkingSlot, deleteParkingSlot, getAvailableParkingSlots, getParkingSlotsBySection, getParkingSlotsByType, getParkingSlotsByLocation, getParkingSlotsByAvailability, getParkingSlotsByReservedBy, getParkingSlotsByReservedAt, getParkingSlotsBySlotCode, bookParkingSlot, getIdBySlotCode, getAll, countParkingSlots, countParkingSlotsById};