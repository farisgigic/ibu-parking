import Administrator from "../models/admininstrator_model";
import Student from "../models/student_model";
import logger from '../services/loggerService.js';

const getAllAdministrators = async (_, res) => {
    try {
        logger.info("GET /administrators called");
        const administrators = await Administrator.findAll();
        res.status(200).json(administrators);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching administrators', error });
    }
}

const getAdminbyEmail = async (req, res) => {
    const { email } = req.params;
    try {
        logger.info(`GET /administrators/${email} called`);
        const administrator = await Administrator.findOne({ where: { email } });
        if (!administrator) {
            const student = await Student.findOne({ where: { email } });
            if (student) {
                return res.status(200).json(student);
            } else {
                return res.status(404).json({ message: 'Administrator or Student not found' });
            }
        } else {
            return res.status(200).json(administrator);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching administrator', error });
    }
}
const ifAdministrator = async (req, res) => {
    const { email } = req.params;   
    try {
            logger.info(`GET /administrators/ifAdministrator/${email} called`);
            const administrator = await Administrator.findOne({ where: { email } });
            if (administrator) {
                return res.status(200).json({ isAdmin: true });
            } else {
                return res.status(200).json({ isAdmin: false });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error checking administrator status', error });
        }
}

export default { getAllAdministrators, getAdminbyEmail, ifAdministrator };