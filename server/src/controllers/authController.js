import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email đã được đăng ký' });
        }

        const user = await User.create({
            fullName,
            email,
            passwordHash: password,
        });

        const token = generateToken(user);

        res.status(201).json({
            user: {
                id: user._id,
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
        if (!user) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

        const token = generateToken(user);

        res.json({
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        next(err);
    }
};
