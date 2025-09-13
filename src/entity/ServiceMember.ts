import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import {  student } from "./Student.js";
import { service_group } from "./ServiceGroup.js";
import { service_sub_group } from "./ServiceSubGroup.js";

@Entity()
export class service_member {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  serviceGroup!: number;

  @ManyToOne(() => student)
  student!: student;

  @ManyToOne(() => service_group)
  group!: service_group;

  @ManyToOne(() => service_sub_group)
  sub_group!: service_sub_group;

  @Column()
  service_role!: string;
}
