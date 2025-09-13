import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { service_group } from "./ServiceGroup.js";
import { student } from "./Student.js";

@Entity()
export class service_sub_group {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => service_group)
  service!: service_group;

  @Column() name!: string;
  @Column("text") description!: string;

  @ManyToOne(() => student)
  president!: student;

  @ManyToOne(() => student)
  vice_president!: student;

  @ManyToOne(() => student)
  secretary!: student;
}
