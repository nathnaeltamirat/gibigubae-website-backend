import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import {  student } from "./Student.js";
import { department } from "./Department.js";

@Entity()
export class academic_info {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => student)
  @JoinColumn()
  user!: student;

  @ManyToOne(() => department)
  department!: department;

  @Column({nullable:true}) year!: string;
  @Column({nullable:true}) dorm_block!: string;
  @Column({nullable:true}) room_number!: string;
}
