import type { Request, Response } from "express";
export interface MulterRequest extends Request {
    file?: Express.Multer.File | undefined;
}
export declare const signUp: (req: MulterRequest, res: Response) => Promise<void>;
export declare const signIn: (req: MulterRequest, res: Response) => Promise<void>;
export declare const logout: (req: Request, res: Response) => void;
export declare const refreshToken: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.controller.d.ts.map