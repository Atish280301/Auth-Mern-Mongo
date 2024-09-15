// backend/middleware/authMiddleware.js
import jwt  from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).json({msg: 'No Token, Authorization Denied'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
}
