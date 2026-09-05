import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDb } from '../db/connect.js';
import { Admin } from '../models/Admin.js';
import { Product } from '../models/Product.js';
import { Supplier } from '../models/Supplier.js';
import { Order, ORDER_STATUSES } from '../models/Order.js';

// This script never deletes or overwrites the real imported data (products, suppliers,
// orders, users). It only fills in the extra fields the admin panel needs that weren't
// part of the original import, and ensures a demo admin account exists to log in with.

const ADMIN_NAME = 'Clayton Santos';
const ADMIN_EMAIL = 'vendor@gmail.com';
const ADMIN_PASSWORD = 'vendor12345';

async function ensureAdmin() {
  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`Admin account already exists (${ADMIN_EMAIL})`);
    return;
  }
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Admin.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: hashedPassword });
  console.log(`Created admin account -> email: ${ADMIN_EMAIL}  password: ${ADMIN_PASSWORD}`);
}

async function backfillProducts() {
  // .lean() reads the raw stored document, so a genuinely missing field stays
  // undefined here (a hydrated Mongoose doc would already show the schema default).
  const products = await Product.find(
    { $or: [{ stock: { $exists: false } }, { suppliers: { $exists: false } }] },
    null,
    { lean: true }
  );

  let updated = 0;
  for (const product of products) {
    const set = {};
    if (product.stock === undefined) {
      set.stock = 10 + Math.floor(Math.random() * 290);
    }
    if (!product.suppliers) {
      set.suppliers = product.brand ? [product.brand] : [];
    }
    if (Object.keys(set).length > 0) {
      await Product.collection.updateOne({ _id: product._id }, { $set: set });
      updated++;
    }
  }
  console.log(`Products backfilled (stock/suppliers): ${updated}`);
}

async function normalizeSupplierStatuses() {
  const result = await Supplier.collection.updateMany(
    { status: 'Active' },
    { $set: { status: 'Paid' } }
  );
  const result2 = await Supplier.collection.updateMany(
    { status: 'Deactive' },
    { $set: { status: 'Cancelled' } }
  );
  console.log(`Supplier statuses normalized: ${result.modifiedCount + result2.modifiedCount}`);
}

async function backfillOrderStatuses() {
  const orders = await Order.find({ status: { $exists: false } }).sort({ createdAt: 1 });
  let i = 0;
  for (const order of orders) {
    order.status = ORDER_STATUSES[i % ORDER_STATUSES.length];
    await order.save();
    i++;
  }
  console.log(`Orders backfilled (status): ${orders.length}`);
}

async function run() {
  await connectDb(process.env.MONGO_URI);

  await ensureAdmin();
  await backfillProducts();
  await normalizeSupplierStatuses();
  await backfillOrderStatuses();

  console.log('Migration complete. No existing documents were deleted.');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
