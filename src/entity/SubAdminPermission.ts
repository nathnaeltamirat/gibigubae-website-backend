import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { student } from "./Student.js";

@Entity()
export class sub_admin_permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => student)
  @JoinColumn()
  user!: student;

  @Column("json")
  permissions!: object;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}
