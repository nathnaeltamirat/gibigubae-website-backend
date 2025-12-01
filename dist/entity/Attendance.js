var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { student } from "./Student.js";
import { AttendanceSession } from "./AttendanceSession.js";
let attendance = class attendance {
    id;
    student;
    session;
    status;
};
__decorate([
    PrimaryGeneratedColumn({ name: "attendance_id" }),
    __metadata("design:type", Number)
], attendance.prototype, "id", void 0);
__decorate([
    ManyToOne(() => student, (s) => s.attendances, { eager: true }),
    __metadata("design:type", student)
], attendance.prototype, "student", void 0);
__decorate([
    ManyToOne(() => AttendanceSession, (session) => session.attendances, { eager: true }),
    __metadata("design:type", AttendanceSession)
], attendance.prototype, "session", void 0);
__decorate([
    Column({ type: "enum", enum: ["present", "late", "absent"], default: "absent" }),
    __metadata("design:type", String)
], attendance.prototype, "status", void 0);
attendance = __decorate([
    Entity({ name: "attendance" })
], attendance);
export { attendance };
//# sourceMappingURL=Attendance.js.map