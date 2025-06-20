import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import studentRoutes from './routes/student_router.js';
import parkingslotRoutes from './routes/parkingSlot_router.js';
import authRoutes from './routes/auth_router.js';
import ratingRoutes from './routes/ratings_router.js';
import notificationRoutes from './routes/notifications_router.js'
import adminRoutes from './routes/admin_router.js';
import reservationRoutes from './routes/reservations_router.js';
import reports_router from './routes/reports_router.js';

const app = express();

// Use CORS early
app.use(cors({
  origin: 'http://localhost:9999',
  credentials: true,
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route handlers
app.use('/students', studentRoutes);
app.use('/parking_slots', parkingslotRoutes);
app.use('/auth', authRoutes);
app.use('/ratings', ratingRoutes);
app.use('/notifications', notificationRoutes);
app.use('/administrators', adminRoutes);
app.use('/reservations', reservationRoutes);
app.use('/reports', reports_router);
export default app;
