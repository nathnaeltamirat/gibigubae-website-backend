import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany
} from "typeorm";
import { ConfessionFather } from "./ConfessionFather.js";
import { GENDER, ROLE } from "../types/entity.js";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() firstName!: string;
  @Column() fatherName!: string;
  @Column() grandFatherName!: string;
  @Column() christianName!: string;
  @Column({unique:true}) email!:string;
  @Column() password!:string;
  @Column({ type: "enum", enum: GENDER }) gender!: GENDER;
  @Column({length:15}) phone_number!: string;
  @Column() idCardImagePath!: string;
  @Column({nullable:true}) barcode!: string;
  @Column({ type: "enum", enum: ROLE }) role!: ROLE;
  @Column({ default: false }) is_verified!: boolean;
  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }) created_at!: Date;

  @ManyToOne(() => ConfessionFather, (father: ConfessionFather) => father.students, {nullable:true, onDelete: 'SET NULL' })
  confession_father!: ConfessionFather;
}
