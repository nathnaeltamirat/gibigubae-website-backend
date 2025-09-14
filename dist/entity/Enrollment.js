var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
let enrollment = class enrollment {
    id;
    // Use string for relation target to avoid circular dependency
    student; // TypeScript type can be 'any' or use a type cast
    course;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], enrollment.prototype, "id", void 0);
__decorate([
    ManyToOne("student", "enrollments", { onDelete: "CASCADE", eager: true }),
    __metadata("design:type", Object)
], enrollment.prototype, "student", void 0);
__decorate([
    ManyToOne("course", "enrollments", { onDelete: "CASCADE", eager: true }),
    __metadata("design:type", Object)
], enrollment.prototype, "course", void 0);
enrollment = __decorate([
    Entity({ name: "enrollments" })
], enrollment);
export { enrollment };
//# sourceMappingURL=Enrollment.js.map