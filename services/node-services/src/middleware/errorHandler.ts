import { Request, Response, NextFunction } from 'express';
import { AppError, handleMongoError, handlePostgresError } from '../utils/errors';



// Sends error response in development environment
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};



// Sends error response in production environment
const sendErrorProd = (err: any, res: Response) => {
    // A) Operational, trusted error: send message to client 
    // Operational error = “User / environment did something wrong”
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // B) Programming or unknown errors: log and send generic message
    console.error('ERROR 💥', err);


    // Send generic message for unknown errors
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });

};


// Global error-handling middleware
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {


    // Log error in development for debugging
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
        return sendErrorDev(err, res);   
    }


    let error = err;

    // MongoDB error mapping
    const mongoError = handleMongoError(error);
    if (mongoError) error = mongoError;

    // PostgreSQL error mapping
    const pgError = handlePostgresError(error);
    if (pgError) error = pgError;

    // Default fallback
    if (!error.statusCode) {
        error = new AppError('Internal server error', 500);
    }

    sendErrorProd(error, res);
};