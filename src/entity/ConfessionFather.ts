import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Student } from "./Student.js";

@Entity()
export class ConfessionFather {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() full_name!: string;
  @Column() phone_number!: string;

  @OneToMany(() => Student, (student: Student) => student.confession_father)
  students!: Student[];
}
