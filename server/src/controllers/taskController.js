import Task from '../models/Task.js';
import { toTaskDTO } from '../dtos/taskDto.js';

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
        const transform = tasks.map((task) => toTaskDTO(task));

        res.json({ tasks: transform });
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req, res, next) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const task = await Task.create({
            userId: req.user.id,
            title,
            description,
            status,
            priority,
            dueDate,
        });

        res.status(201).json({
            message: 'Tạo task thành công',
            task: toTaskDTO(task),
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndUpdate({ _id: id, userId: req.user.id }, req.body, {
            new: true,
            runValidators: true,
        });

        if (!task) {
            return next({ statusCode: 404, message: 'Không tìm thấy task' });
        }

        res.json({
            message: 'Cập nhật task thành công',
            task: toTaskDTO(task),
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!task) {
            return next({ statusCode: 404, message: 'Không tìm thấy task' });
        }

        res.json({ message: 'Xóa task thành công' });
    } catch (error) {
        next(error);
    }
};
