import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Gender, ROLE } from "../types/entity.js";
import { ConfessionFather } from "./ConfessionFather.js";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  first_name!: string;

  @Column({
    length: 100,
  })
  last_name!: string;

  @Column({
    length: 100,
  })
  christian_name!: string;

  @Column({
    type:'enum',
    enum:Gender,

  })
  gender!: Gender;

  @Column({
    length: 15,
  })
  phone_number!: string;

  @Column()
  id_card_image_path!:string;

  @Column()
  barcode!:string;

  @Column()
  is_verified!:boolean;

  @Column({
    type:'enum',
    enum:ROLE
  })
  role!:ROLE
  
  @ManyToOne(() => ConfessionFather, confessionfather => confessionfather.students, { onDelete: "SET NULL" })
  confession_father!: ConfessionFather;
}
