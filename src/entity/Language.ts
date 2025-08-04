import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  language_name!: string;
}
