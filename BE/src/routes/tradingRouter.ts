import { Router } from 'express';
import getMyUpbitAccountInfo, { purchaseCoin } from '../controllers/tradingController';

const router = Router();

router.get('/getUserInfo', getMyUpbitAccountInfo);
router.post('/purchaseCoin', purchaseCoin);

export default router;
