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
  @Column({length:15,name:"phoneNumber"}) phoneNumber!: string;
  @Column() idCardImagePath!: string;
  @Column({nullable:true}) barcode!: string;
  
  @Column({ type: "enum", enum: ROLE,default:"student" }) role!: ROLE;
  @Column({ default: false }) isVerified!: boolean;
  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }) createdAt!: Date;

  @ManyToOne(() => ConfessionFather, (father: ConfessionFather) => father.students, {nullable:true, onDelete: 'SET NULL' })
  confession_father!: ConfessionFather;
}
