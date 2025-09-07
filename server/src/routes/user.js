import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.put('/editProfile', authMiddleware, userController.editProfile);
router.put('/changePassword', authMiddleware, userController.changePassword);

export default router;
