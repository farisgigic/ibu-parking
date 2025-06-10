import express from 'express';
import ratingCtrl from '/src/controllers/RatingController.js';

const router = express.Router();

router.get(
    '/all',
    ratingCtrl.getAllRatings
);

export default router;