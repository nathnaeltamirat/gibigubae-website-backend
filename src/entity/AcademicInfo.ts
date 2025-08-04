import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Student } from "./Student.js";
import { Department } from "./Department.js";

@Entity()
export class AcademicInfo {
  @PrimaryGeneratedColumn()
  id_no!: number;

  @OneToOne(() => Student)
  @JoinColumn()
  user!: Student;

  @ManyToOne(() => Department)
  department!: Department;

  @Column() year!: string;
  @Column() dorm_block!: string;
  @Column() room_number!: string;
}
