import type { Request, Response, NextFunction } from "express";
/**
 * GET all service members
 */
export declare const getMembers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMemberById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * CREATE service member (Admin only)
 */
export declare const createMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * DELETE service member (Super Admin only)
 */
export declare const deleteMember: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=service_member.controller.d.ts.map