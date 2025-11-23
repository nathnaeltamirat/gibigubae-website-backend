import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/express.js";
export declare const createCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCourses: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCourseById: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getStudentCourses: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=course.controller.d.ts.map