import mongoose from 'mongoose';

export const PRODUCT_CATEGORIES = [
  'Pain Relief',
  'First Aid',
  'Vitamins & Supplements',
  'Diabetes Care',
  'Skin Care',
  'Digestive Health',
  'Allergy & Sinus',
];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: PRODUCT_CATEGORIES },
    stock: { type: Number, required: true, min: 0, default: 0 },
    suppliers: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    brand: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    discountPercent: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema, 'products');
