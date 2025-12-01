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
import { course } from "./Course.js";
import { attendance } from "./Attendance.js";
let AttendanceSession = class AttendanceSession {
    id;
    course;
    date;
    code;
    attendances;
};
__decorate([
    PrimaryGeneratedColumn({ name: "session_id" }),
    __metadata("design:type", Number)
], AttendanceSession.prototype, "id", void 0);
__decorate([
    ManyToOne(() => course, (c) => c.sessions, { eager: true }),
    __metadata("design:type", course)
], AttendanceSession.prototype, "course", void 0);
__decorate([
    Column({ type: "timestamptz" }),
    __metadata("design:type", Date)
], AttendanceSession.prototype, "date", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], AttendanceSession.prototype, "code", void 0);
__decorate([
    OneToMany(() => attendance, (a) => a.session, { cascade: true }),
    __metadata("design:type", Array)
], AttendanceSession.prototype, "attendances", void 0);
AttendanceSession = __decorate([
    Entity({ name: "attendance_sessions" })
], AttendanceSession);
export { AttendanceSession };
//# sourceMappingURL=AttendanceSession.js.map