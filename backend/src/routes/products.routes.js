import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { productSchema, productUpdateSchema } from '../validation/product.schema.js';

const router = Router();

router.use(authenticate);
router.get('/', getProducts);
router.post('/', validateBody(productSchema), createProduct);
router.put('/:productId', validateBody(productUpdateSchema), updateProduct);
router.delete('/:productId', deleteProduct);

export default router;
