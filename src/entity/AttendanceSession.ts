import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { course } from "./Course.js";
import { attendance } from "./Attendance.js";

@Entity({ name: "attendance_sessions" })
export class AttendanceSession {
  @PrimaryGeneratedColumn({ name: "session_id" })
  id!: number;

  @ManyToOne(() => course, (c) => c.sessions, { eager: true })
  course!: course;

  @Column({ type: "timestamptz" })
  date!: Date;

  @Column()
  code!: string;

  @OneToMany(() => attendance, (a) => a.session, { cascade: true })
  attendances!: attendance[];
}
