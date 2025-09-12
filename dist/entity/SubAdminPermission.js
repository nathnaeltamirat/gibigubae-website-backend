var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Student } from "./Student.js";
let SubAdminPermission = class SubAdminPermission {
    id;
    user;
    permissions;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SubAdminPermission.prototype, "id", void 0);
__decorate([
    OneToOne(() => Student),
    JoinColumn(),
    __metadata("design:type", Student)
], SubAdminPermission.prototype, "user", void 0);
__decorate([
    Column("json"),
    __metadata("design:type", Object)
], SubAdminPermission.prototype, "permissions", void 0);
__decorate([
    Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], SubAdminPermission.prototype, "updated_at", void 0);
SubAdminPermission = __decorate([
    Entity()
], SubAdminPermission);
export { SubAdminPermission };
//# sourceMappingURL=SubAdminPermission.js.map