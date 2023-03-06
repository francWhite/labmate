import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import process from 'process';
import { servicesRouter } from './service.routes';

process.on('SIGINT', () => {
  console.info('cancel request, stopping server...');
  process.exit(0);
});

dotenv.config();
const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(cors());
app.use('/api/services', servicesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}...`);
});
