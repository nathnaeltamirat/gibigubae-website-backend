import { student } from "./Student.js";
import { AttendanceSession } from "./AttendanceSession.js";
export type AttendanceStatus = "present" | "late" | "absent";
export declare class attendance {
    id: number;
    student: student;
    session: AttendanceSession;
    status: AttendanceStatus;
}
//# sourceMappingURL=Attendance.d.ts.map