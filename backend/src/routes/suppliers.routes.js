import { Router } from 'express';
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
} from '../controllers/suppliers.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { supplierSchema, supplierUpdateSchema } from '../validation/supplier.schema.js';

const router = Router();

router.use(authenticate);
router.get('/', getSuppliers);
router.post('/', validateBody(supplierSchema), createSupplier);
router.put('/:supplierId', validateBody(supplierUpdateSchema), updateSupplier);

export default router;
