import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { student } from "./Student.js";
import { AttendanceSession } from "./AttendanceSession.js";

export type AttendanceStatus = "present" | "late" | "absent";

@Entity({ name: "attendance" })
export class attendance {
  @PrimaryGeneratedColumn({ name: "attendance_id" })
  id!: number;

  @ManyToOne(() => student, (s) => s.attendances, { eager: true })
  student!: student;

  @ManyToOne(() => AttendanceSession, (session) => session.attendances, { eager: true })
  session!: AttendanceSession;

  @Column({ type: "enum", enum: ["present", "late", "absent"], default: "absent" })
  status!: AttendanceStatus;
}
