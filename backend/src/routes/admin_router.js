import express from 'express';
import adminCtrl from '/src/controllers/AdminController.js';

const router = express.Router();

router.get(
    '/all',
    adminCtrl.getAllAdministrators
);

export default router;