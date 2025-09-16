var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { attendance } from "./Attendance.js";
import { enrollment } from "./Enrollment.js";
let course = class course {
    id;
    course_name;
    description;
    start_date;
    end_date;
    enrollment_start_date;
    enrollment_deadline;
    attendances;
    enrollments;
};
__decorate([
    PrimaryGeneratedColumn({ name: "course_id" }),
    __metadata("design:type", Number)
], course.prototype, "id", void 0);
__decorate([
    Column({ name: "course_name" }),
    __metadata("design:type", String)
], course.prototype, "course_name", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], course.prototype, "description", void 0);
__decorate([
    Column({ type: "timestamptz", name: "start_date" }),
    __metadata("design:type", Date)
], course.prototype, "start_date", void 0);
__decorate([
    Column({ type: "timestamptz", name: "end_date" }),
    __metadata("design:type", Date)
], course.prototype, "end_date", void 0);
__decorate([
    Column({ type: "timestamptz", name: "enrollment_start_date" }),
    __metadata("design:type", Date)
], course.prototype, "enrollment_start_date", void 0);
__decorate([
    Column({ type: "timestamptz", name: "enrollment_deadline" }),
    __metadata("design:type", Date)
], course.prototype, "enrollment_deadline", void 0);
__decorate([
    OneToMany(() => attendance, (att) => att.course),
    __metadata("design:type", Array)
], course.prototype, "attendances", void 0);
__decorate([
    OneToMany(() => enrollment, (enroll) => enroll.course),
    __metadata("design:type", Array)
], course.prototype, "enrollments", void 0);
course = __decorate([
    Entity({ name: "courses" })
], course);
export { course };
//# sourceMappingURL=Course.js.map