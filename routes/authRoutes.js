// backend/routes/authRoutes.js
import express from 'express';
import {signup, signin} from '../controllers/index.js';
const router = express.Router();

router
    .post('/signup',signup)
    .post('/signin',signin)

export const Authentication = router;