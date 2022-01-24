import express from 'express';
import tradingRouter from './tradingRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use('/users', userRouter); //회원가입, 로그인
router.use('/trading', tradingRouter); // trading

export default router;
