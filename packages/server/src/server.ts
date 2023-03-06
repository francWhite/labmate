import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import process from 'process';
import { servicesRouter } from './service.routes';
import { connectToDatabase } from './database';

process.on('SIGINT', () => {
  console.info('cancel request, stopping server...');
  process.exit(0);
});

dotenv.config();
const PORT = process.env.PORT ?? 3000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error('MONGO_URL environment variable is not set');
  process.exit(1);
}

connectToDatabase(MONGO_URL)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use('/api/services', servicesRouter);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}...`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
