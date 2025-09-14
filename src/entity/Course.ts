import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { attendance } from "./Attendance.js";
import { enrollment } from "./Enrollment.js";

@Entity({ name: "courses" })
export class course {
  @PrimaryGeneratedColumn({ name: "course_id" })
  id!: number;

  @Column({ name: "course_name" })
  course_name!: string;

  @Column("text")
  description!: string;

  @OneToMany(() => attendance, (att) => att.course)
  attendances!: attendance[];

  @OneToMany(() => enrollment, (enroll) => enroll.course)
  enrollments!: enrollment[];
}
