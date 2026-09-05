import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
  app.use(express.json());
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
  app.use('/api', apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
