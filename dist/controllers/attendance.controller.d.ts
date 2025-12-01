import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../types/express.js";
export declare const createAttendance: (req: Request, res: Response) => Promise<void>;
export declare const markAttendanceQR: (req: Request, res: Response) => Promise<void>;
export declare const markAttendanceCode: (req: Request, res: Response) => Promise<void>;
export declare const updateAttendanceManual: (req: Request, res: Response) => Promise<void>;
export declare const getSessionAttendance: (req: Request, res: Response) => Promise<void>;
export declare const getStudentAttendanceInCourse: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCourseAttendanceWithSessions: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=attendance.controller.d.ts.map