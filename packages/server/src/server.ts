import dotenv from 'dotenv';
import cors from "cors";
import express from "express";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
    res.send(new Date().getSeconds().toString());
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}...`);
});