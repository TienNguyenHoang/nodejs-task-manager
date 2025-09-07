import { Router } from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import taskRoutes from './task.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

export default router;
