import { AttendanceSession } from "./AttendanceSession.js";
import { enrollment } from "./Enrollment.js";
export declare class course {
    id: number;
    course_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    enrollment_start_date: Date;
    enrollment_deadline: Date;
    sessions: AttendanceSession[];
    enrollments: enrollment[];
    created_at: Date;
    updated_at: Date;
}
//# sourceMappingURL=Course.d.ts.map