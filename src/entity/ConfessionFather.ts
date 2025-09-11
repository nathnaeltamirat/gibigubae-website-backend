import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Student } from "./Student.js";

@Entity()
export class ConfessionFather {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() fullName!: string;
  @Column() phoneNumber!: string;

  @OneToMany(() => Student, (student: Student) => student.confession_father)
  students!: Student[];
}
