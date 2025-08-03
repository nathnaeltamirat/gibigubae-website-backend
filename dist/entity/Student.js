var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Gender, ROLE } from "../types/entity.js";
import { ConfessionFather } from "./ConfessionFather.js";
let Student = class Student {
    id;
    first_name;
    last_name;
    christian_name;
    gender;
    phone_number;
    id_card_image_path;
    barcode;
    is_verified;
    role;
    confession_father;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    Column({
        length: 100,
    }),
    __metadata("design:type", String)
], Student.prototype, "first_name", void 0);
__decorate([
    Column({
        length: 100,
    }),
    __metadata("design:type", String)
], Student.prototype, "last_name", void 0);
__decorate([
    Column({
        length: 100,
    }),
    __metadata("design:type", String)
], Student.prototype, "christian_name", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: Gender,
    }),
    __metadata("design:type", String)
], Student.prototype, "gender", void 0);
__decorate([
    Column({
        length: 15,
    }),
    __metadata("design:type", String)
], Student.prototype, "phone_number", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "id_card_image_path", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Student.prototype, "barcode", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], Student.prototype, "is_verified", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ROLE
    }),
    __metadata("design:type", String)
], Student.prototype, "role", void 0);
__decorate([
    ManyToOne(() => ConfessionFather, confessionfather => confessionfather.students, { onDelete: "SET NULL" }),
    __metadata("design:type", ConfessionFather)
], Student.prototype, "confession_father", void 0);
Student = __decorate([
    Entity()
], Student);
export { Student };
//# sourceMappingURL=Student.js.map