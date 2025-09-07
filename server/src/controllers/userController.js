import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const editProfile = async (req, res, next) => {
    try {
        const { fullName, email } = req.body;

        const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
        if (existingUser) {
            return next({ statusCode: 400, message: 'Email đã được sử dụng bởi tài khoản khác' });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { fullName, email },
            { new: true, runValidators: true },
        ).select('-passwordHash');

        if (!user) {
            return next({ statusCode: 404, message: 'Không tìm thấy người dùng' });
        }

        res.json({
            message: 'Cập nhật thông tin thành công',
            user: {
                userId: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return next({ statusCode: 404, message: 'Không tìm thấy người dùng' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isMatch) {
            return next({ statusCode: 400, message: 'Mật khẩu hiện tại không đúng' });
        }

        user.passwordHash = newPassword;
        await user.save();

        res.json({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        next(error);
    }
};
