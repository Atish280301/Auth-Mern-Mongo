// backend/routes/publicRoutes.js
import express from 'express';
import {authMiddleware} from '../middleware/authMiddleware.js';
import {roleMiddleware} from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/public',authMiddleware, roleMiddleware('public'),(req, res)=>{
    res.json({msg: 'Welcome To The Public Page'});
})

export const publicRouter = router;