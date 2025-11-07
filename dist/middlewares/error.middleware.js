const errorMiddleware = (err, req, res, next) => {
    // Log the full error stack for debugging
    console.error(err);
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    // Handle common mongoose errors
    if (err.name === "CastError") {
        statusCode = 404;
        message = "Resource not found";
    }
    if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate key found";
    }
    if (err.name === "ValidationError") {
        const messages = err.errors
            ? Object.values(err.errors).map((val) => val.message)
            : ["Validation error"];
        statusCode = 400;
        message = messages.join(", ");
    }
    res.status(statusCode).json({
        success: false,
        error: message,
    });
};
export default errorMiddleware;
//# sourceMappingURL=error.middleware.js.map