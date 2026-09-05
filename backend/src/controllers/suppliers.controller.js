import { Supplier } from '../models/Supplier.js';
import { ApiError } from '../utils/ApiError.js';
import { catchAsync } from '../utils/catchAsync.js';

function toSupplierDto(supplier) {
  return {
    _id: supplier._id,
    name: supplier.name,
    address: supplier.address,
    company: supplier.brand,
    deliveryDate: supplier.date,
    amount: supplier.amount,
    status: supplier.status,
  };
}

function toSupplierDoc(body) {
  const { company, deliveryDate, ...rest } = body;
  const doc = { ...rest };
  if (company !== undefined) doc.brand = company;
  if (deliveryDate !== undefined) doc.date = deliveryDate;
  return doc;
}

export const getSuppliers = catchAsync(async (req, res) => {
  const { name } = req.query;
  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  const suppliers = await Supplier.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ suppliers: suppliers.map(toSupplierDto) });
});

export const createSupplier = catchAsync(async (req, res) => {
  const supplier = await Supplier.create(toSupplierDoc(req.body));
  res.status(201).json(toSupplierDto(supplier));
});

export const updateSupplier = catchAsync(async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.supplierId, toSupplierDoc(req.body), {
    new: true,
    runValidators: true,
  });
  if (!supplier) throw ApiError.notFound('Supplier not found');
  res.status(200).json(toSupplierDto(supplier));
});
