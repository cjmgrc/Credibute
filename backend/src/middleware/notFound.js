import { AppError } from "../utils/AppError.js";

export const notFound = (req, _res, next) => {
  next(AppError.notFound(`No route for ${req.method} ${req.path}`));
};
