import express from 'express';
import upload from '../middlewares/uploadPhoto.js';
import reportCtrl from '/src/controllers/ReportController.js';

const router = express.Router();

router.get(
    '/all-reports', 
    reportCtrl.getAllReports
);

router.post(
    '/create-report', 
    upload.single('image'),
    reportCtrl.createReport
);

export default router;