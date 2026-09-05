import { Product } from '../models/Product.js';
import { Supplier } from '../models/Supplier.js';
import { Customer } from '../models/Customer.js';
import { Order } from '../models/Order.js';
import { FinanceEntry } from '../models/FinanceEntry.js';
import { catchAsync } from '../utils/catchAsync.js';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const RECENT_CUSTOMERS_LIMIT = 5;
const INCOME_EXPENSES_LIMIT = 10;

function toFinanceEntryDto(entry) {
  return {
    _id: entry._id,
    title: entry.name,
    email: '',
    amount: entry.amount,
    type: entry.amount >= 0 ? 'income' : 'expense',
  };
}

export const getDashboard = catchAsync(async (req, res) => {
  const since = new Date(Date.now() - THIRTY_DAYS_MS);

  const [allProducts, allSuppliers, allCustomers, recentCustomers, incomeExpenses, salesLast30Days, customersLast30Days] =
    await Promise.all([
      Product.countDocuments(),
      Supplier.countDocuments(),
      Customer.countDocuments(),
      Customer.find().sort({ createdAt: -1 }).limit(RECENT_CUSTOMERS_LIMIT),
      FinanceEntry.find().limit(INCOME_EXPENSES_LIMIT),
      Order.countDocuments({ createdAt: { $gte: since } }),
      Customer.countDocuments({ createdAt: { $gte: since } }),
    ]);

  const orders = await Order.find({ user: { $in: recentCustomers.map((c) => c._id) } });
  const spentByUser = new Map();
  for (const order of orders) {
    const key = String(order.user);
    spentByUser.set(key, (spentByUser.get(key) || 0) + order.totalPrice);
  }

  const revenueLast30Days = (
    await Order.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ])
  )[0]?.total || 0;

  res.status(200).json({
    stats: {
      allProducts,
      allSuppliers,
      allCustomers,
      revenueLast30Days,
      salesLast30Days,
      customersLast30Days,
    },
    recentCustomers: recentCustomers.map((c) => ({
      _id: c._id,
      name: c.name,
      email: c.email,
      totalSpent: spentByUser.get(String(c._id)) || 0,
    })),
    incomeExpenses: incomeExpenses.map(toFinanceEntryDto),
  });
});
