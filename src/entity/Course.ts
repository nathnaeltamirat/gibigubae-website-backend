import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AttendanceSession } from "./AttendanceSession.js";
import { enrollment } from "./Enrollment.js";

@Entity({ name: "courses" })
export class course {
  @PrimaryGeneratedColumn({ name: "course_id" })
  id!: number;

  @Column({ name: "course_name" })
  course_name!: string;

  @Column("text")
  description!: string;

  @Column({ type: "timestamptz", name: "start_date" })
  start_date!: Date;

  @Column({ type: "timestamptz", name: "end_date" })
  end_date!: Date;

  @Column({ type: "timestamptz", name: "enrollment_start_date" })
  enrollment_start_date!: Date;

  @Column({ type: "timestamptz", name: "enrollment_deadline" })
  enrollment_deadline!: Date;

  @OneToMany(() => AttendanceSession, (session) => session.course, { cascade: true })
  sessions!: AttendanceSession[];

  @OneToMany(() => enrollment, (enroll) => enroll.course, { cascade: true })
  enrollments!: enrollment[];

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
