import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import process from 'process';

process.on('SIGINT', () => {
  console.info('cancel request, stopping server...');
  process.exit(0);
});

dotenv.config();
const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
  res.send(new Date().getSeconds().toString());
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}...`);
});
