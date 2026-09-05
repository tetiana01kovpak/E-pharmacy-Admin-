import Joi from 'joi';
import { SUPPLIER_STATUSES } from '../models/Supplier.js';

export const supplierSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  address: Joi.string().trim().min(1).required(),
  company: Joi.string().trim().min(1).required(),
  deliveryDate: Joi.date().required(),
  amount: Joi.number().min(0).required(),
  status: Joi.string().valid(...SUPPLIER_STATUSES).default('Pending'),
});

export const supplierUpdateSchema = supplierSchema.fork(
  ['name', 'address', 'company', 'deliveryDate', 'amount', 'status'],
  (field) => field.optional()
);
