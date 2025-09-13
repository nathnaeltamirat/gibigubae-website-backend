import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique:true})
  department_name!: string;
}
