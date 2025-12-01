import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { attendance } from "../entity/Attendance.js";
import { student } from "../entity/Student.js";
import { course } from "../entity/Course.js";
import { enrollment } from "../entity/Enrollment.js";
import { AttendanceSession } from "../entity/AttendanceSession.js";
import type { AuthenticatedRequest } from "../types/express.js";

// ----------------------------
// 🧩 Inline error handler
// ----------------------------
interface CustomError {
  statusCode?: number;
  message?: string;
  errors?: Record<string, { message: string }>;
}

const handleError = (res: Response, err: unknown) => {
  const error = err as CustomError;
  const statusCode = error.statusCode || 500;
  const message =
    error.message ||
    (statusCode === 500
      ? "Internal Server Error"
      : "An unexpected error occurred");

  res.status(statusCode).json({
    success: false,
    message,
    errors: error.errors || null,
  });
};

// ----------------------------
// 🗂️ Repositories
// ----------------------------
const attendanceRepo = AppDataSource.getRepository(attendance);
const studentRepo = AppDataSource.getRepository(student);
const courseRepo = AppDataSource.getRepository(course);
const enrollmentRepo = AppDataSource.getRepository(enrollment);
const attendanceSessionRepo = AppDataSource.getRepository(AttendanceSession);

// ----------------------------
// 📅 Create attendance (single session)
// ----------------------------
export const createAttendance = async (req: Request, res: Response) => {
  try {
    const user = req.user as { role: string } | undefined;
    if (!user || !["admin", "super_admin"].includes(user.role)) {
      throw { statusCode: 403, message: "Forbidden: Admins only" };
    }

    const { course_id, code, start_in_minutes } = req.body;
    if (!course_id || !code || start_in_minutes == null) {
      throw {
        statusCode: 400,
        message: "course_id, code, start_in_minutes are required",
      };
    }

    const courseEntity = await courseRepo.findOneBy({ id: Number(course_id) });
    if (!courseEntity) throw { statusCode: 404, message: "Course not found" };

    const enrollments = await enrollmentRepo.find({
      where: { course: { id: Number(course_id) } },
      relations: ["student"],
    });
    if (!enrollments.length)
      throw { statusCode: 400, message: "No students enrolled" };

    const now = new Date();
    const classStartTime = new Date(
      now.getTime() + Number(start_in_minutes) * 60000
    );

    // 1️⃣ Create a single attendance session
    const session = attendanceSessionRepo.create({
      course: courseEntity,
      date: classStartTime,
      code,
    });
    await attendanceSessionRepo.save(session);

    // 2️⃣ Create attendance records for all students under this session
    const records = enrollments.map((enroll) =>
      attendanceRepo.create({
        student: enroll.student,
        session: session,
        status: "absent",
      })
    );
    await attendanceRepo.save(records);

    res.status(201).json({
      success: true,
      session_id: session.id,
      attendances: records.map((r) => ({
        attendance_id: r.id,
        student_id: r.student.id,
        status: r.status,
      })),
    });
  } catch (err) {
    handleError(res, err);
  }
};

// ----------------------------
// 🎯 Mark attendance via QR
// ----------------------------
export const markAttendanceQR = async (req: Request, res: Response) => {
  try {
    const { student_id, attendance_id } = req.query;

    if (!student_id || !attendance_id) {
      throw {
        statusCode: 400,
        message: "student_id and attendance_id are required",
      };
    }

    const record = await attendanceRepo.findOne({
      where: {
        student: { id: Number(student_id) },
        id: Number(attendance_id),
      },
      relations: ["session"],
    });

    if (!record) throw { statusCode: 404, message: "Attendance not found" };

    const recordDate = new Date(record.session.date);
    const now = new Date();
    const lateWindow = new Date(recordDate);
    lateWindow.setMinutes(recordDate.getMinutes() + 30);

    record.status =
      now <= recordDate
        ? "present"
        : now <= lateWindow
        ? "late"
        : "absent";

    await attendanceRepo.save(record);
    res.json({ success: true, data: record });
  } catch (err) {
    handleError(res, err);
  }
};

// ----------------------------
// 🔢 Mark attendance via code
// ----------------------------
export const markAttendanceCode = async (req: Request, res: Response) => {
  try {
    const { student_id, code, attendance_id } = req.body;

    if (!student_id || !code || !attendance_id) {
      throw {
        statusCode: 400,
        message: "student_id, attendance_id, and code are required",
      };
    }

    const record = await attendanceRepo.findOne({
      where: {
        student: { id: Number(student_id) },
        session: { id: Number(attendance_id), code },
      },
      relations: ["session"],
    });

    if (!record)
      throw { statusCode: 404, message: "Invalid code or record not found" };

    const recordDate = new Date(record.session.date);
    const now = new Date();
    const lateWindow = new Date(recordDate);
    lateWindow.setMinutes(recordDate.getMinutes() + 30);

    record.status =
      now <= recordDate ? "present" : now <= lateWindow ? "late" : "absent";

    await attendanceRepo.save(record);
    res.json({ success: true, data: record });
  } catch (err) {
    handleError(res, err);
  }
};

// ----------------------------
// 🧑‍🏫 Manual attendance update (Admin)
// ----------------------------
export const updateAttendanceManual = async (req: Request, res: Response) => {
  try {
    const user = req.user as { role: string } | undefined;
    if (!user || !["admin", "super_admin"].includes(user.role)) {
      throw { statusCode: 403, message: "Forbidden: Admins only" };
    }

    const { attendance_id, status } = req.body;
    if (!attendance_id || !["present", "late", "absent"].includes(status)) {
      throw {
        statusCode: 400,
        message: "attendance_id and valid status are required",
      };
    }

    const record = await attendanceRepo.findOneBy({
      id: Number(attendance_id),
    });
    if (!record) throw { statusCode: 404, message: "Attendance not found" };

    record.status = status;
    await attendanceRepo.save(record);

    res.json({ success: true, data: record });
  } catch (err) {
    handleError(res, err);
  }
};

// ----------------------------
// 📚 Get all attendance for a session
// ----------------------------
export const getSessionAttendance = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) throw { statusCode: 400, message: "sessionId is required" };

    const records = await attendanceRepo.find({
      where: { session: { id: Number(sessionId) } },
      relations: ["student", "session", "session.course"],
    });

    res.json({ success: true, data: records });
  } catch (err) {
    handleError(res, err);
  }
};

// ----------------------------
// 👨‍🎓 Get one student's attendance in a course
// ----------------------------
export const getStudentAttendanceInCourse = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { courseId } = req.params;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const studentId = req.user.user_id;

    if (!courseId || !studentId)
      throw { statusCode: 400, message: "courseId and studentId are required" };

    const records = await attendanceRepo.find({
      where: {
        session: { course: { id: Number(courseId) } },
        student: { id: Number(studentId) },
      },
      relations: ["student", "session", "session.course"],
    });

    res.json({ success: true, data: records });
  } catch (err) {
    handleError(res, err);
  }
};

// ----------------------------
// 📊 Get all attendance sessions and student attendance for a course
// ----------------------------
export const getCourseAttendanceWithSessions = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.params;
    if (!course_id) throw { statusCode: 400, message: "course_id is required" };

    // Fetch all sessions for the course
    const sessions = await attendanceSessionRepo.find({
      where: { course: { id: Number(course_id) } },
      relations: ["course", "attendances", "attendances.student"],
      order: { date: "ASC" },
    });

    // Format response
    const formatted = sessions.map((session) => ({
      session_id: session.id,
      code: session.code,
      date: session.date,
      attendances: session.attendances.map((a) => ({
        attendance_id: a.id,
        student_id: a.student.id,
        student_name: `${a.student.first_name} ${a.student.father_name}`,
        status: a.status,
      })),
    }));

    res.json({ success: true, data: formatted });
  } catch (err) {
    handleError(res, err);
  }
};
