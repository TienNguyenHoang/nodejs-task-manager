import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ code: 'TOKEN_MISSING', message: 'Không có token' });
    }

    const accessToken = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ code: 'TOKEN_INVALID', message: 'Token không hợp lệ' });
    }
};

export default authMiddleware;
