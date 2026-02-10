import { AppError } from './appError';


export const handlePostgresError = (err: any): AppError | null => {
  switch (err.code) {
    case '23505': // unique violation
      return new AppError('Duplicate field value entered', 400);

    case '23503': // foreign key violation
      return new AppError('Invalid reference ID', 400);

    case '23502': // not null violation
      return new AppError(`Missing required field`, 400);

    case '22P02': // invalid input syntax
      return new AppError('Invalid input format', 400);

    default:
      return null;
  }
};