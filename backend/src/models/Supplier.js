import mongoose from 'mongoose';

export const SUPPLIER_STATUSES = ['Pending', 'Paid', 'Cancelled'];

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    brand: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: SUPPLIER_STATUSES, default: 'Pending' },
  },
  { timestamps: true }
);

export const Supplier = mongoose.model('Supplier', supplierSchema, 'suppliers');
