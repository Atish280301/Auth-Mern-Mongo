// backend/routes/adminRoutes.js
import express from 'express';
import {authMiddleware} from '../middleware/authMiddleware.js';
import {roleMiddleware} from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/admin',authMiddleware, roleMiddleware('admin'),(req, res)=>{
    res.json({msg: 'Welcome To The Admin Page!'});
})

export const adminRouter = router;