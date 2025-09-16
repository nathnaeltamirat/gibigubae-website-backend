import { attendance } from "./Attendance.js";
import { enrollment } from "./Enrollment.js";
export declare class course {
    id: number;
    course_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    enrollment_start_date: Date;
    enrollment_deadline: Date;
    attendances: attendance[];
    enrollments: enrollment[];
}
//# sourceMappingURL=Course.d.ts.map