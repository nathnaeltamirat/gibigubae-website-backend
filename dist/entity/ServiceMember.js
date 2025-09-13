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
import { student } from "./Student.js";
import { service_group } from "./ServiceGroup.js";
import { service_sub_group } from "./ServiceSubGroup.js";
let service_member = class service_member {
    user_id;
    serviceGroup;
    student;
    group;
    sub_group;
    service_role;
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], service_member.prototype, "user_id", void 0);
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], service_member.prototype, "serviceGroup", void 0);
__decorate([
    ManyToOne(() => student),
    __metadata("design:type", student)
], service_member.prototype, "student", void 0);
__decorate([
    ManyToOne(() => service_group),
    __metadata("design:type", service_group)
], service_member.prototype, "group", void 0);
__decorate([
    ManyToOne(() => service_sub_group),
    __metadata("design:type", service_sub_group)
], service_member.prototype, "sub_group", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], service_member.prototype, "service_role", void 0);
service_member = __decorate([
    Entity()
], service_member);
export { service_member };
//# sourceMappingURL=ServiceMember.js.map