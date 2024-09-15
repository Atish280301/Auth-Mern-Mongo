// backend/index.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Authentication } from './routes/authRoutes.js';
import { publicRouter } from './routes/publicRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const database = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Database Connected!");
    } catch (error) {
        console.log("Database Connection Error : ",error);
    }
}
database();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use('/api/auth',Authentication);
app.use('/api',publicRouter);
app.use('/api',adminRouter);

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server Started On Port ${process.env.PORT}`);
})