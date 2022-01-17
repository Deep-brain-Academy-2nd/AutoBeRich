import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

router.post('/signup', UserController.signUp);
router.post('/login', UserController.logIn);

export default router;
