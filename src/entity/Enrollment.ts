import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity({ name: "enrollments" })
export class enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  // Use string for relation target to avoid circular dependency
  @ManyToOne("student", "enrollments", { onDelete: "CASCADE", eager: true })
  student!: any; // TypeScript type can be 'any' or use a type cast

  @ManyToOne("course", "enrollments", { onDelete: "CASCADE", eager: true })
  course!: any;
}
