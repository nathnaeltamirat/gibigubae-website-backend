import type { Request, Response } from "express";
export declare const createAttendance: (req: Request, res: Response) => Promise<void>;
export declare const markAttendanceQR: (req: Request, res: Response) => Promise<void>;
export declare const markAttendanceCode: (req: Request, res: Response) => Promise<void>;
export declare const updateAttendanceManual: (req: Request, res: Response) => Promise<void>;
export declare const getCourseAttendance: (req: Request, res: Response) => Promise<void>;
export declare const getStudentAttendanceInCourse: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=attendance.controller.d.ts.map