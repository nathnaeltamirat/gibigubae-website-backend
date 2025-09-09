import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student.js";

@Entity()
export class ServiceGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() serviceName!: string;
  @Column("text") description!: string;

  @ManyToOne(() => Student)
  president!: Student;

  @ManyToOne(() => Student)
  vicePresident!: Student;

  @ManyToOne(() => Student)
  secretary!: Student;
}
