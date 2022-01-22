import { Router } from 'express';
import getMyAccountInfos from '../controllers/tradingController';

const router = Router();

router.get('/getUserInfo', getMyAccountInfos);

export default router;
