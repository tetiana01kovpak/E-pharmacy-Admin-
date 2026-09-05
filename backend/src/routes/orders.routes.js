import { Router } from 'express';
import { getOrders } from '../controllers/orders.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, getOrders);

export default router;
