import { Router } from 'express';
import getMyUpbitAccountInfo from '../controllers/tradingController';

const router = Router();

router.get('/getUserInfo', getMyUpbitAccountInfo);

export default router;
