import { Router } from 'express';
import { UserController } from '../controllers';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/signup',
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  body('secretKey', 'secret key is required').not().isEmpty(),
  body('accessKey', 'access key is required').not().isEmpty(),
  UserController.signUp
);
router.use('/login', UserController.logIn);
router.use('/verify', UserController.verifyToken);

export default router;
