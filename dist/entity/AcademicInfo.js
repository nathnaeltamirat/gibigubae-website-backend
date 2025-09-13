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
import { student } from "./Student.js";
import { department } from "./Department.js";
let academic_info = class academic_info {
    id;
    user;
    department;
    year;
    dorm_block;
    room_number;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], academic_info.prototype, "id", void 0);
__decorate([
    OneToOne(() => student),
    JoinColumn(),
    __metadata("design:type", student)
], academic_info.prototype, "user", void 0);
__decorate([
    ManyToOne(() => department),
    __metadata("design:type", department)
], academic_info.prototype, "department", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], academic_info.prototype, "year", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], academic_info.prototype, "dorm_block", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], academic_info.prototype, "room_number", void 0);
academic_info = __decorate([
    Entity()
], academic_info);
export { academic_info };
//# sourceMappingURL=AcademicInfo.js.map