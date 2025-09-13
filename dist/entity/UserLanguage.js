var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { student } from "./Student.js";
import { language } from "./Language.js";
let user_language = class user_language {
    user_id;
    language_id;
    student;
    language;
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], user_language.prototype, "user_id", void 0);
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], user_language.prototype, "language_id", void 0);
__decorate([
    ManyToOne(() => student),
    __metadata("design:type", student)
], user_language.prototype, "student", void 0);
__decorate([
    ManyToOne(() => language),
    __metadata("design:type", language)
], user_language.prototype, "language", void 0);
user_language = __decorate([
    Entity()
], user_language);
export { user_language };
//# sourceMappingURL=UserLanguage.js.map