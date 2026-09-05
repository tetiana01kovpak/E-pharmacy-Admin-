import { Router } from 'express';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import productsRoutes from './products.routes.js';
import suppliersRoutes from './suppliers.routes.js';
import customersRoutes from './customers.routes.js';
import ordersRoutes from './orders.routes.js';

const router = Router();

router.use('/user', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/products', productsRoutes);
router.use('/suppliers', suppliersRoutes);
router.use('/customers', customersRoutes);
router.use('/orders', ordersRoutes);

export default router;
