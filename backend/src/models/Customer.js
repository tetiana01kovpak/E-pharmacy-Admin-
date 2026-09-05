import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    password: { type: String, select: false },
  },
  { timestamps: true }
);

export const Customer = mongoose.model('Customer', customerSchema, 'users');
