import express from 'express';
import userRouter from './user-router';

const router = express.Router();

router.use('/users', userRouter); //회원가입, 로그인

export default router;
