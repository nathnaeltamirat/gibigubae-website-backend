import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { student } from "./Student.js";

@Entity()
export class confession_father {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() full_name!: string;
  @Column() phone_number!: string;

  @OneToMany(() => student, (student: student) => student.confession_father)
  students!: student[];
}
