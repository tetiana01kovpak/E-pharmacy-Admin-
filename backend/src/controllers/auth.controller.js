import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { ApiError } from '../utils/ApiError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { generateToken } from '../utils/generateToken.js';

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const token = generateToken(user._id);

  res.status(200).json({
    token,
    user: { name: user.name, email: user.email },
  });
});

export const logout = catchAsync(async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

export const getUserInfo = catchAsync(async (req, res) => {
  res.status(200).json({ name: req.user.name, email: req.user.email });
});
