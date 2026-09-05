import { ApiError } from '../utils/ApiError.js';

export function notFound(req, res, next) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

export function errorHandler(err, req, res, next) {
  const status = err instanceof ApiError ? err.status : err.status || 500;
  const message = status === 500 && process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message || 'Internal server error';

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({ status, message });
}
