import { ConfessionFather } from "./ConfessionFather.js";
import { GENDER, ROLE } from "../types/entity.js";
export declare class Student {
    id: number;
    firstName: string;
    fatherName: string;
    grandFatherName: string;
    christianName: string;
    email: string;
    password: string;
    gender: GENDER;
    phoneNumber: string;
    idCardImagePath: string;
    barcode: string;
    role: ROLE;
    isVerified: boolean;
    createdAt: Date;
    confession_father: ConfessionFather;
}
//# sourceMappingURL=Student.d.ts.map