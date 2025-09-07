import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateMiddleware from '../middlewares/validateMiddleware.js';
import { taskSchema } from '../validations/task.js';

const router = Router();

router.get('/', authMiddleware, taskController.getAllTasks);
router.post('/', authMiddleware, validateMiddleware(taskSchema), taskController.createTask);
router.put('/:id', authMiddleware, validateMiddleware(taskSchema), taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;
