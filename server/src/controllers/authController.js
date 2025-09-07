import bcrypt from 'bcrypt';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return next({ statusCode: 400, message: 'Email đã tồn tại' });
        }

        const user = await User.create({
            fullName,
            email,
            passwordHash: password,
        });

        const token = generateToken(user);

        res.status(201).json({
            user: {
                userId: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return next({ statusCode: 400, message: 'Sai email hoặc mật khẩu' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return next({ statusCode: 400, message: 'Sai email hoặc mật khẩu' });

        const token = generateToken(user);

        res.json({
            user: {
                userId: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        next(err);
    }
};
