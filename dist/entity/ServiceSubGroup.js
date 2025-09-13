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
import { service_group } from "./ServiceGroup.js";
import { student } from "./Student.js";
let service_sub_group = class service_sub_group {
    id;
    service;
    name;
    description;
    president;
    vice_president;
    secretary;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], service_sub_group.prototype, "id", void 0);
__decorate([
    ManyToOne(() => service_group),
    __metadata("design:type", service_group)
], service_sub_group.prototype, "service", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], service_sub_group.prototype, "name", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], service_sub_group.prototype, "description", void 0);
__decorate([
    ManyToOne(() => student),
    __metadata("design:type", student)
], service_sub_group.prototype, "president", void 0);
__decorate([
    ManyToOne(() => student),
    __metadata("design:type", student)
], service_sub_group.prototype, "vice_president", void 0);
__decorate([
    ManyToOne(() => student),
    __metadata("design:type", student)
], service_sub_group.prototype, "secretary", void 0);
service_sub_group = __decorate([
    Entity()
], service_sub_group);
export { service_sub_group };
//# sourceMappingURL=ServiceSubGroup.js.map