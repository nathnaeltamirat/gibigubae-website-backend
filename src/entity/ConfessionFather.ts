import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student.js";

@Entity()
export class ConfessionFather {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
  })
  full_name!: string;


  @Column({
    length: 15,
  })
  phone_number!: string;

  @OneToMany(()=> Student, student => student.confession_father)
  students!: Student[];

}
