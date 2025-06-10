import express from 'express';
import { authCtrl } from '../controllers/AuthController.js';

const router = express.Router();

// Definišemo POST rutu za prijem podataka nakon Google prijave
router.post('/google/callback', authCtrl.googleLoginCallback);

export default router;