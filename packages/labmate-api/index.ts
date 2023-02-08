import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/api', (req: Request, res: Response) => {
    res.send(new Date().getSeconds().toString());
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});