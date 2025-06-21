import express from 'express';
import notificationCtrl from '/src/controllers/NotificationController.js';

const router = express.Router();

router.get(
    '/all',
    notificationCtrl.getAllNotifications
);

router.post(
    '/create',
    notificationCtrl.createNotification
);

export default router;