import { where } from 'sequelize';
import ParkingSlot from '/src/models/parkingSlot_model.js';
import Student from '/src/models/student_model.js';

const createParkingSlot = async (req, res) => {
    try {
        const parkingSlot = await ParkingSlot.create(req.body);
        res.status(201).json(parkingSlot);
    } catch (error) {
        res.status(500).json({ message: 'Error creating parking slot', error });
    }
}

const getAllParkingSlots = async (_, res) => {
    try {
        console.log("GET /parkingSlots called");
        const parkingSlots = await ParkingSlot.findAll();
        res.status(200).json(parkingSlots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking slots', error });
    }
}
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

export default { getAllParkingSlots, getParkingSlotByStudentId, createParkingSlot, getParkingSlotById, updateParkingSlot, deleteParkingSlot, getAvailableParkingSlots, getParkingSlotsBySection, getParkingSlotsByType, getParkingSlotsByLocation, getParkingSlotsByAvailability, getParkingSlotsByReservedBy, getParkingSlotsByReservedAt, getParkingSlotsBySlotCode };