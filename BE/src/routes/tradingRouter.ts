import { Router } from 'express';
import { TradingController, UserController } from '../controllers';
const router = Router();

router.get('/getUserInfo', TradingController.getMyUpbitAccountInfo); // 계좌, 보유 코인 조회
router.put('/updateTradingStrategy', UserController.updateTradingStrategy); // 매매 전략 바꾸기
router.post('/updateStatusAutoTraiding', UserController.updateStatusAutoTraiding); // 자동매매 시작,중지

export default router;
