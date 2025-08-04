import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany
} from "typeorm";
import { ConfessionFather } from "./ConfessionFather.js";
import { GENDER, ROLE } from "../types/entity.js";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column() first_name!: string;
  @Column() last_name!: string;
  @Column() christian_name!: string;
  @Column({ type: "enum", enum: GENDER }) gender!: GENDER;
  @Column() phone_number!: string;
  @Column() id_card_image_path!: string;
  @Column() barcode!: string;
  @Column({ type: "enum", enum: ROLE }) role!: ROLE;
  @Column({ default: false }) is_verified!: boolean;
  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" }) created_at!: Date;

  @ManyToOne(() => ConfessionFather, (father: ConfessionFather) => father.students, { onDelete: 'SET NULL' })
  confession_father!: ConfessionFather;
}
