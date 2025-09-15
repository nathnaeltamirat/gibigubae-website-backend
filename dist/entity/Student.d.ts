import { confession_father } from "./ConfessionFather.js";
import { GENDER, ROLE } from "../types/entity.js";
import { enrollment } from "./Enrollment.js";
import { attendance } from "./Attendance.js";
export declare class student {
    id: number;
    first_name: string;
    father_name: string;
    grand_father_name: string;
    christian_name: string;
    id_number: string;
    email: string;
    password: string;
    gender: GENDER;
    phone_number: string;
    id_card_image_path: string;
    barcode: string;
    role: ROLE;
    is_verified: boolean;
    created_at: Date;
    confession_father: confession_father;
    enrollments: enrollment[];
    attendances: attendance[];
}
//# sourceMappingURL=Student.d.ts.map