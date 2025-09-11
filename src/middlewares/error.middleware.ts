import type { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

const errorMiddleware = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let error: CustomError = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message) as CustomError;
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = "Duplicate key found";
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      const messages = err.errors
        ? Object.values(err.errors).map((val) => val.message)
        : ["Validation error"];
      error = new Error(messages.join(", ")) as CustomError;
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server error",
    });

    console.error(err);
  } catch (innerErr) {
    console.error(innerErr);
    next(innerErr);
  }
};

export default errorMiddleware;
