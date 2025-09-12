import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique:true})
  departmentName!: string;
}
