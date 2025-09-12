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
import { Student } from "./Student.js";
let ConfessionFather = class ConfessionFather {
    id;
    fullName;
    phoneNumber;
    students;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ConfessionFather.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ConfessionFather.prototype, "fullName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ConfessionFather.prototype, "phoneNumber", void 0);
__decorate([
    OneToMany(() => Student, (student) => student.confession_father),
    __metadata("design:type", Array)
], ConfessionFather.prototype, "students", void 0);
ConfessionFather = __decorate([
    Entity()
], ConfessionFather);
export { ConfessionFather };
//# sourceMappingURL=ConfessionFather.js.map