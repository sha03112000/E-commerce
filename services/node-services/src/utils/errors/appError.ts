// Custom application error class for handling operational errors
export class AppError extends Error {

    public readonly statusCode: number;
    public readonly status: string;

    // Flag to identify trusted, operational errors
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number) {
        // Call the parent Error constructor with the message
        super(message);

        this.statusCode = statusCode;

        // Determine error type based on status code
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Mark error as operational (expected error, not a bug)
        this.isOperational = true;

        // Capture stack trace excluding constructor call
        Error.captureStackTrace(this, this.constructor);
    }
}
