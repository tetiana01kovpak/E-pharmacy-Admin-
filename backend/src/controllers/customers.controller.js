import { Customer } from '../models/Customer.js';
import { Order } from '../models/Order.js';
import { ApiError } from '../utils/ApiError.js';
import { catchAsync } from '../utils/catchAsync.js';

function toCustomerDto(customer, orders) {
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const latestOrder = orders[0];

  return {
    _id: customer._id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    address: latestOrder?.shipping?.address || '',
    registerDate: customer.createdAt,
    totalSpent,
  };
}

export const getCustomers = catchAsync(async (req, res) => {
  const { name, page = 1, limit = 8 } = req.query;
  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.max(1, Number(limit) || 8);

  const [customers, total] = await Promise.all([
    Customer.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Customer.countDocuments(filter),
  ]);

  const orders = await Order.find({ user: { $in: customers.map((c) => c._id) } }).sort({ createdAt: -1 });
  const ordersByUser = new Map();
  for (const order of orders) {
    const key = String(order.user);
    if (!ordersByUser.has(key)) ordersByUser.set(key, []);
    ordersByUser.get(key).push(order);
  }

  res.status(200).json({
    customers: customers.map((c) => toCustomerDto(c, ordersByUser.get(String(c._id)) || [])),
    total,
    page: pageNum,
    pages: Math.max(1, Math.ceil(total / limitNum)),
  });
});

export const getCustomerById = catchAsync(async (req, res) => {
  const customer = await Customer.findById(req.params.customerId);
  if (!customer) throw ApiError.notFound('Customer not found');

  const orders = await Order.find({ user: customer._id }).sort({ createdAt: -1 });

  const history = orders.map((order) => ({
    _id: order._id,
    orderDate: order.createdAt,
    price: order.totalPrice,
    status: order.status,
  }));

  res.status(200).json({ customer: toCustomerDto(customer, orders), history });
});
