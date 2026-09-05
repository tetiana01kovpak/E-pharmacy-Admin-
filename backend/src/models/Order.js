import mongoose from 'mongoose';

export const ORDER_STATUSES = ['Pending', 'Delivered', 'Cancelled'];

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const shippingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    items: { type: [orderItemSchema], default: [] },
    shipping: { type: shippingSchema, required: true },
    paymentMethod: { type: String, default: 'COD' },
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ORDER_STATUSES, default: 'Pending' },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

export const Order = mongoose.model('Order', orderSchema, 'orders');
