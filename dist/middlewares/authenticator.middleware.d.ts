import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export interface JwtUserPayload extends jwt.JwtPayload {
    user_id: string;
    email: string;
    role: string;
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authenticator.middleware.d.ts.map