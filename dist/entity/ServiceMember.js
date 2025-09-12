var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student.js";
import { ServiceGroup } from "./ServiceGroup.js";
import { ServiceSubGroup } from "./ServiceSubGroup.js";
let ServiceMember = class ServiceMember {
    user_id;
    serviceGroup;
    student;
    group;
    subGroup;
    serviceRole;
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], ServiceMember.prototype, "user_id", void 0);
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], ServiceMember.prototype, "serviceGroup", void 0);
__decorate([
    ManyToOne(() => Student),
    __metadata("design:type", Student)
], ServiceMember.prototype, "student", void 0);
__decorate([
    ManyToOne(() => ServiceGroup),
    __metadata("design:type", ServiceGroup)
], ServiceMember.prototype, "group", void 0);
__decorate([
    ManyToOne(() => ServiceSubGroup),
    __metadata("design:type", ServiceSubGroup)
], ServiceMember.prototype, "subGroup", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ServiceMember.prototype, "serviceRole", void 0);
ServiceMember = __decorate([
    Entity()
], ServiceMember);
export { ServiceMember };
//# sourceMappingURL=ServiceMember.js.map