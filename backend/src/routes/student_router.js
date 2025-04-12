import express from 'express';
import studentCtrl from '/src/controllers/student_controller.js';

const router = express.Router();

router.route('/api/students')
    .get(studentCtrl.getAllStudents)
    .post(studentCtrl.createStudent);


router.route('/api/students/:id')
    .get(studentCtrl.getStudentById)
    .put(studentCtrl.updateStudent)
    .delete(studentCtrl.deleteStudent);

export default router;