import { ApiError } from '../utils/ApiError.js';

export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      throw ApiError.badRequest(error.details.map((d) => d.message).join('; '));
    }
    req.body = value;
    next();
  };
}
