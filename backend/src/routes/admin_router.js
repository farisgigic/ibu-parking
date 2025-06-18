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

router.get(
    '/ifAdministrator/:email',
    adminCtrl.ifAdministrator
);

export default router;