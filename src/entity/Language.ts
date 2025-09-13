import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class language {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  language_name!: string;
}
