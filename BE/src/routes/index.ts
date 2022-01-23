import express from 'express';
import userRouter from './user-router';
import tradingRouter from './tradingRouter';

const router = express.Router();

router.use('/users', userRouter); //회원가입, 로그인
router.use('/trading', tradingRouter); // trading

export default router;
