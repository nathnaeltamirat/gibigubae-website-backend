import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source.js";
import { attendance } from "../entity/Attendance.js";
import { student } from "../entity/Student.js";
import { course } from "../entity/Course.js";
import { enrollment } from "../entity/Enrollment.js";

const attendanceRepo = AppDataSource.getRepository(attendance);
const studentRepo = AppDataSource.getRepository(student);
const courseRepo = AppDataSource.getRepository(course);
const enrollmentRepo = AppDataSource.getRepository(enrollment);

// ------------------------------
// Create attendance for a course (Admin/SuperAdmin)
// ------------------------------
export const createAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (!["admin", "super_admin"].includes(user.role)) {
      throw { statusCode: 403, message: "Forbidden: Admins only" };
    }

    const { course_id, code, start_in_minutes } = req.body;
    if (!start_in_minutes) throw { statusCode: 400, message: "start_in_minutes required" };

    const courseEntity = await courseRepo.findOneBy({ id: Number(course_id) });
    if (!courseEntity) throw { statusCode: 404, message: "Course not found" };

    const enrollments = await enrollmentRepo.find({
      where: { course: { id: Number(course_id) } },
      relations: ["student"],
    });

    if (!enrollments.length) throw { statusCode: 400, message: "No students enrolled" };

    const now = new Date();
    const classStartTime = new Date(now.getTime() + Number(start_in_minutes) * 60000);

    const records = enrollments.map((enroll) =>
      attendanceRepo.create({
        student: enroll.student,
        course: courseEntity,
        date: classStartTime,
        status: "absent",
        code,
      })
    );

    await attendanceRepo.save(records);
    res.status(201).json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Mark attendance via QR
// ------------------------------
export const markAttendanceQR = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { student_id, course_id } = req.query;

    const record = await attendanceRepo.findOne({
      where: { student: { id: Number(student_id) }, course: { id: Number(course_id) } },
    });

    if (!record) throw { statusCode: 404, message: "Attendance not found" };

    const now = new Date();
    const lateWindow = new Date(record.date);
    lateWindow.setMinutes(record.date.getMinutes() + 30);

    record.status = now <= record.date ? "present" : now <= lateWindow ? "late" : "absent";
    await attendanceRepo.save(record);

    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Mark attendance via code
// ------------------------------
export const markAttendanceCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { student_id, course_id, code } = req.body;

    const record = await attendanceRepo.findOne({
      where: { student: { id: Number(student_id) }, course: { id: Number(course_id) }, code },
    });

    if (!record) throw { statusCode: 404, message: "Invalid code or record not found" };

    const now = new Date();
    const lateWindow = new Date(record.date);
    lateWindow.setMinutes(record.date.getMinutes() + 30);

    record.status = now <= record.date ? "present" : now <= lateWindow ? "late" : "absent";
    await attendanceRepo.save(record);

    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Manual attendance update (Admin)
// ------------------------------
export const updateAttendanceManual = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { role: string };
    if (!["admin", "super_admin"].includes(user.role)) {
      throw { statusCode: 403, message: "Forbidden: Admins only" };
    }

    const { attendance_id, status } = req.body;
    if (!["present", "late", "absent"].includes(status)) {
      throw { statusCode: 400, message: "Invalid status value" };
    }

    const record = await attendanceRepo.findOneBy({ id: Number(attendance_id) });
    if (!record) throw { statusCode: 404, message: "Attendance not found" };

    record.status = status;
    await attendanceRepo.save(record);

    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Get all attendance for a course
// ------------------------------
export const getCourseAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;

    const records = await attendanceRepo.find({
      where: { course: { id: Number(courseId) } },
      relations: ["student", "course"],
    });

    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

// ------------------------------
// Get one student's attendance in a course
// ------------------------------
export const getStudentAttendanceInCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId, studentId } = req.params;

    const records = await attendanceRepo.find({
      where: { course: { id: Number(courseId) }, student: { id: Number(studentId) } },
      relations: ["student", "course"],
    });

    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};
