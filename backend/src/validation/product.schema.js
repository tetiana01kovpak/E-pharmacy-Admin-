import Joi from 'joi';
import { PRODUCT_CATEGORIES } from '../models/Product.js';

export const productSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  category: Joi.string().valid(...PRODUCT_CATEGORIES).required(),
  stock: Joi.number().min(0).required(),
  suppliers: Joi.array().items(Joi.string()).default([]),
  price: Joi.number().min(0).required(),
});

export const productUpdateSchema = productSchema.fork(
  ['name', 'category', 'stock', 'suppliers', 'price'],
  (field) => field.optional()
);
