import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Student } from "./Student.js";
import { Department } from "./Department.js";

@Entity()
export class AcademicInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Student)
  @JoinColumn()
  user!: Student;

  @ManyToOne(() => Department)
  department!: Department;

  @Column() year!: string;
  @Column() dormBlock!: string;
  @Column() roomNumber!: string;
}
