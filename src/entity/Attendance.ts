import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

export type AttendanceStatus = "present" | "late" | "absent";

@Entity({ name: "attendance" })
export class attendance {
  @PrimaryGeneratedColumn({ name: "attendance_id" })
  id!: number;

  @ManyToOne("student", "attendances", { eager: true })
  student!: any; // runtime value handled by TypeORM

  @ManyToOne("course", "attendances", { eager: true })
  course!: any;

  @Column({ type: "timestamp" })
  date!: Date;

  @Column({ type: "enum", enum: ["present", "late", "absent"], default: "absent" })
  status!: AttendanceStatus;

  @Column({ nullable: true })
  code?: string;
}
