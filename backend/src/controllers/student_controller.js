import Student from '/src/models/student_model.js';

const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
}
const getAllStudents = async (_, res) => {
    try {
        console.log("GET /students called");
        const student = await Student.findAll();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
}

const getStudentById = async (req, res) => {
    try {
        const { google_id } = req.params;
        const student = await Student.findOne({ where: { google_id } });
        // console.log("➡️ student.toJSON():", student?.toJSON()); 
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.update(req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
}
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await student.destroy();
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};

export default { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };