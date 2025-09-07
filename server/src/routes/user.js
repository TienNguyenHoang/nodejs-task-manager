import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validateMiddleware from '../middlewares/validateMiddleware.js';
import { editProfileSchema, changePasswordSchema } from '../validations/user.js';

const router = Router();

router.put('/editProfile', authMiddleware, validateMiddleware(editProfileSchema), userController.editProfile);
router.put('/changePassword', authMiddleware, validateMiddleware(changePasswordSchema), userController.changePassword);

export default router;
