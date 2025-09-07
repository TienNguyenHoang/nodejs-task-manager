import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, taskController.getAllTasks);
router.post('/', authMiddleware, taskController.createTask);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;
