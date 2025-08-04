import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Student } from "./Student.js";
import { ServiceGroup } from "./ServiceGroup.js";
import { ServiceSubGroup } from "./ServiceSubGroup.js";

@Entity()
export class ServiceMember {
  @PrimaryColumn()
  user_id!: number;

  @PrimaryColumn()
  service_group!: number;

  @ManyToOne(() => Student)
  student!: Student;

  @ManyToOne(() => ServiceGroup)
  group!: ServiceGroup;

  @ManyToOne(() => ServiceSubGroup)
  sub_group!: ServiceSubGroup;

  @Column()
  service_role!: string;
}
