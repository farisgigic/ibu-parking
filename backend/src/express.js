import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import studentRoutes from './routes/student_router.js';
import parkingslotRoutes from './routes/parkingSlot_router.js';
import emailRoutes from './routes/email_router.js';

const app = express();

// Use CORS early
app.use(cors({
  origin: 'http://localhost:9999',
  credentials: true,
}));

// This line handles OPTIONS preflight for all routes


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// Route handlers
app.use('/students', studentRoutes);
app.use('/parking_slots', parkingslotRoutes);
app.use('/email', emailRoutes);

export default app;
