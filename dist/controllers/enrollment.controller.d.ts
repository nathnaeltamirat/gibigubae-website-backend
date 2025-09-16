import type { Request, Response, NextFunction } from "express";
export declare const enrollSelf: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const enrollByAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const removeEnrollment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getEnrollments: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=enrollment.controller.d.ts.map