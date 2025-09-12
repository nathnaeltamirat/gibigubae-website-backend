var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ConfessionFather } from "./ConfessionFather.js";
import { GENDER, ROLE } from "../types/entity.js";
let Student = class Student {
    id;
    firstName;
    fatherName;
    grandFatherName;
    christianName;
    email;
    password;
    gender;
    phoneNumber;
    idCardImagePath;
    barcode;
    role;
    isVerified;
    createdAt;
    confession_father;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "fatherName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "grandFatherName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "christianName", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    Column({ type: "enum", enum: GENDER }),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    Column({ length: 15, name: "phoneNumber" }),
    __metadata("design:type", String)
], Student.prototype, "phoneNumber", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "idCardImagePath", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "barcode", void 0);
__decorate([
    Column({ type: "enum", enum: ROLE, default: "student" }),
    __metadata("design:type", String)
], Student.prototype, "role", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "isVerified", void 0);
__decorate([
    Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Student.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => ConfessionFather, (father) => father.students, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", ConfessionFather)
], Student.prototype, "confession_father", void 0);
Student = __decorate([
    Entity()
], Student);
export { Student };
//# sourceMappingURL=Student.js.map