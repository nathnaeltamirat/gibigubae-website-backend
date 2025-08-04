import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { Student } from "./Student.js";
import { Language } from "./Language.js";

@Entity()
export class UserLanguage {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  language_id!: number;

  @ManyToOne(() => Student)
  student!: Student;

  @ManyToOne(() => Language)
  language!: Language;
}
