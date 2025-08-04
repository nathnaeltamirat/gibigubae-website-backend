import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Student } from "./Student.js";

@Entity()
export class SubAdminPermission {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Student)
  @JoinColumn()
  user!: Student;

  @Column("json")
  permissions!: object;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}
