import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { student } from "./Student.js";
import { language } from "./Language.js";

@Entity()
export class user_language {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  language_id!: number;

  @ManyToOne(() => student)
  student!: student;

  @ManyToOne(() => language)
  language!: language;
}
