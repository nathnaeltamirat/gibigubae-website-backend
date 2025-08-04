import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ServiceGroup } from "./ServiceGroup.js";
import { Student } from "./Student.js";

@Entity()
export class ServiceSubGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ServiceGroup)
  service!: ServiceGroup;

  @Column() name!: string;
  @Column("text") description!: string;

  @ManyToOne(() => Student)
  president!: Student;

  @ManyToOne(() => Student)
  vice_president!: Student;

  @ManyToOne(() => Student)
  secretary!: Student;
}
