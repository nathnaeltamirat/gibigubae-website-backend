var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, } from "typeorm";
import { confession_father } from "./ConfessionFather.js";
import { GENDER, ROLE } from "../types/entity.js";
import { enrollment } from "./Enrollment.js";
import { attendance } from "./Attendance.js";
let student = class student {
    id;
    first_name;
    father_name;
    grand_father_name;
    christian_name;
    id_number;
    email;
    password;
    gender;
    phone_number;
    id_card_image_path;
    barcode;
    role;
    is_verified;
    created_at;
    confession_father;
    enrollments;
    attendances;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], student.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], student.prototype, "first_name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], student.prototype, "father_name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], student.prototype, "grand_father_name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], student.prototype, "christian_name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], student.prototype, "id_number", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], student.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], student.prototype, "password", void 0);
__decorate([
    Column({ type: "enum", enum: GENDER }),
    __metadata("design:type", String)
], student.prototype, "gender", void 0);
__decorate([
    Column({ length: 15, name: "phone_number" }),
    __metadata("design:type", String)
], student.prototype, "phone_number", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], student.prototype, "id_card_image_path", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], student.prototype, "barcode", void 0);
__decorate([
    Column({ type: "enum", enum: ROLE, default: "student" }),
    __metadata("design:type", String)
], student.prototype, "role", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], student.prototype, "is_verified", void 0);
__decorate([
    Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], student.prototype, "created_at", void 0);
__decorate([
    ManyToOne(() => confession_father, (father) => father.students, { nullable: true, onDelete: "SET NULL" }),
    __metadata("design:type", confession_father)
], student.prototype, "confession_father", void 0);
__decorate([
    OneToMany(() => enrollment, (enroll) => enroll.student),
    __metadata("design:type", Array)
], student.prototype, "enrollments", void 0);
__decorate([
    OneToMany(() => attendance, (att) => att.student),
    __metadata("design:type", Array)
], student.prototype, "attendances", void 0);
student = __decorate([
    Entity()
], student);
export { student };
//# sourceMappingURL=Student.js.map