import { Gender, ROLE } from "../types/entity.js";
import { ConfessionFather } from "./ConfessionFather.js";
export declare class Student {
    id: number;
    first_name: string;
    last_name: string;
    christian_name: string;
    gender: Gender;
    phone_number: string;
    id_card_image_path: string;
    barcode: string;
    is_verified: boolean;
    role: ROLE;
    confession_father: ConfessionFather;
}
//# sourceMappingURL=Student.d.ts.map