import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { student } from "./Student.js";

@Entity()
export class service_group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() service_name!: string;
  @Column("text") description!: string;

  @ManyToOne(() => student)
  president!: student;

  @ManyToOne(() => student)
  vice_president!: student;

  @ManyToOne(() => student)
  secretary!: student;
}
