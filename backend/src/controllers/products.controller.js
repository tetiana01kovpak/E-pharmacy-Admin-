import { Product, PRODUCT_CATEGORIES } from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';
import { catchAsync } from '../utils/catchAsync.js';

function buildSort(sort) {
  if (!sort) return { createdAt: -1 };
  const direction = sort.startsWith('-') ? -1 : 1;
  const field = sort.replace(/^-/, '');
  const allowed = ['name', 'category', 'stock', 'price', 'createdAt'];
  if (!allowed.includes(field)) return { createdAt: -1 };
  return { [field]: direction };
}

export const getProducts = catchAsync(async (req, res) => {
  const { name, sort } = req.query;
  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  const products = await Product.find(filter).sort(buildSort(sort));

  res.status(200).json({ products, categories: PRODUCT_CATEGORIES });
});

export const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export const updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw ApiError.notFound('Product not found');
  res.status(200).json(product);
});

export const deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);
  if (!product) throw ApiError.notFound('Product not found');
  res.status(200).json({ message: 'Product deleted', id: req.params.productId });
});
