import { Order } from '../models/Order.js';
import { catchAsync } from '../utils/catchAsync.js';

const SORT_FIELD_MAP = {
  customerName: 'shipping.name',
  orderDate: 'createdAt',
  price: 'totalPrice',
  status: 'status',
};

function buildSort(sort) {
  if (!sort) return { createdAt: -1 };
  const direction = sort.startsWith('-') ? -1 : 1;
  const field = sort.replace(/^-/, '');
  const mapped = SORT_FIELD_MAP[field];
  if (!mapped) return { createdAt: -1 };
  return { [mapped]: direction };
}

function toOrderDto(order) {
  return {
    _id: order._id,
    customerName: order.shipping.name,
    customerEmail: order.shipping.email,
    address: order.shipping.address,
    products: order.items.map((item) => ({ name: item.name, quantity: item.quantity })),
    orderDate: order.createdAt,
    price: order.totalPrice,
    status: order.status,
  };
}

export const getOrders = catchAsync(async (req, res) => {
  const { name, status, sort } = req.query;
  const filter = {};
  if (name) {
    filter['shipping.name'] = { $regex: name, $options: 'i' };
  }
  if (status) {
    filter.status = status;
  }

  const orders = await Order.find(filter).sort(buildSort(sort));
  res.status(200).json({ orders: orders.map(toOrderDto) });
});
