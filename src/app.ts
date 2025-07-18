import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { errorHandler } from './middlewares/errorHandler';
import phoneRoutes from './routes/phoneRoutes';
import rechargeRoutes from './routes/rechargeRoutes';
import summaryRoutes from './routes/summaryRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/phones', phoneRoutes);
app.use('/recharges', rechargeRoutes);
app.use('/summary', summaryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running!' });
});

// Error handling middleware (deve ser o último)
app.use(errorHandler);

export default app; 