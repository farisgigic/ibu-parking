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
router.delete(
    '/student/:id', 
    studentCtrl.deleteStudent
);
router.put(
    '/student/:id', 
    studentCtrl.editStudent
);
router.get(
    '/student/:google_id', 
    studentCtrl.getStudentById
);

export default router;