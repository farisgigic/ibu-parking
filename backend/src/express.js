import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import studentRoutes from './routes/student_router.js';
import parkingslotRoutes from './routes/parkingSlot_router.js';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors());

app.use('/students', studentRoutes);
app.use('/parking_slots', parkingslotRoutes);

export default app;