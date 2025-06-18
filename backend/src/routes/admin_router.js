import express from 'express';
import adminCtrl from '/src/controllers/AdminController.js';

const router = express.Router();

router.get(
    '/all',
    adminCtrl.getAllAdministrators
);

router.get(
    '/:email',
    adminCtrl.getAdminbyEmail
);

export default router;