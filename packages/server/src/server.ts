import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import process from 'process';
import { servicesRouter } from './service.routes';
import { connectToDatabase, collections } from './database';
import { updateStatusCheck } from './status-check';

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

    scheduleChecksForAllServices();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function scheduleChecksForAllServices() {
  console.log('Scheduling status checks for all services...');

  const query = { 'statusCheckConfiguration.enabled': true };
  collections.serviceInstances?.find(query, { projection: {} }).forEach(res => {
    console.log(`Update status check for ${res._id}`);
    updateStatusCheck(res._id.toHexString());
  });
}
