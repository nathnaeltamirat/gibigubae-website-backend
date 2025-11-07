import type { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
    statusCode?: number;
    code?: number;
    errors?: Record<string, {
        message: string;
    }>;
}
declare const errorMiddleware: (err: CustomError, req: Request, res: Response, next: NextFunction) => void;
export default errorMiddleware;
//# sourceMappingURL=error.middleware.d.ts.map