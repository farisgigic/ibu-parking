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
router.get(
    '/all', 
    studentCtrl.getAllStudents
);
router.get(
    '/email/:email', 
    studentCtrl.getStudentByEmail
);
router.route('/student/:id')
    .put(studentCtrl.updateStudent)
    .delete(studentCtrl.deleteStudent);

router.get('/student/:google_id', studentCtrl.getStudentById);

export default router;