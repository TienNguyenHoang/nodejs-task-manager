import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import validateMiddleware from '../middlewares/validateMiddleware.js';
import { loginSchema, registerSchema } from '../validations/auth.js';

const router = Router();

router.post('/register', validateMiddleware(registerSchema), authController.register);
router.post('/login', validateMiddleware(loginSchema), authController.login);

router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;
