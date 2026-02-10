import { AppError } from './appError';


export const handleMongoError = (err: any): AppError | null => {
  // Duplicate key
  if (err.code === 11000) {
    return new AppError('Duplicate field value entered', 400);
  }

  // Invalid ObjectId
  if (err.name === 'CastError') {
    return new AppError('Invalid ID format', 400);
  }

  return null;
};
