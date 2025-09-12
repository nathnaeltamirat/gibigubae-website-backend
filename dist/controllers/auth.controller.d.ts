import type { Request, Response, NextFunction } from "express";
export interface MulterRequest extends Request {
    file?: Express.Multer.File | undefined;
}
export declare const signUp: (req: MulterRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const signIn: (req: MulterRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map