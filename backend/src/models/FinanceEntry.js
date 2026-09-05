import mongoose from 'mongoose';

const financeEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export const FinanceEntry = mongoose.model('FinanceEntry', financeEntrySchema, 'financeentries');
