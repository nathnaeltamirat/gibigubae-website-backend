import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student.js";

@Entity()
export class ServiceGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() service_name!: string;
  @Column("text") description!: string;

  @ManyToOne(() => Student)
  president!: Student;

  @ManyToOne(() => Student)
  vice_president!: Student;

  @ManyToOne(() => Student)
  secretary!: Student;
}
