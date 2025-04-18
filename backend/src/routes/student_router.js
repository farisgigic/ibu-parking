import express from 'express';
import studentCtrl from '/src/controllers/student_controller.js';

const router = express.Router();

router.get(
    '/',
    studentCtrl.getAllStudents
);
router.post(
    '/',
    studentCtrl.createStudent
);

router.route('/student/:id')
    .get(studentCtrl.getStudentById)
    .put(studentCtrl.updateStudent)
    .delete(studentCtrl.deleteStudent);

export default router;