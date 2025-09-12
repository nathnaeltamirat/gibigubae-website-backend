var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Student } from "./Student.js";
import { Department } from "./Department.js";
let AcademicInfo = class AcademicInfo {
    id;
    user;
    department;
    year;
    dormBlock;
    roomNumber;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AcademicInfo.prototype, "id", void 0);
__decorate([
    OneToOne(() => Student),
    JoinColumn(),
    __metadata("design:type", Student)
], AcademicInfo.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Department),
    __metadata("design:type", Department)
], AcademicInfo.prototype, "department", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AcademicInfo.prototype, "year", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AcademicInfo.prototype, "dormBlock", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], AcademicInfo.prototype, "roomNumber", void 0);
AcademicInfo = __decorate([
    Entity()
], AcademicInfo);
export { AcademicInfo };
//# sourceMappingURL=AcademicInfo.js.map