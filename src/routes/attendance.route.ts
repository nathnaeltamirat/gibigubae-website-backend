import { Router } from "express";
import {
  createAttendance,
  markAttendanceQR,
  markAttendanceCode,
  updateAttendanceManual,
  getCourseAttendance,
  getStudentAttendanceInCourse,
} from "../controllers/attendance.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";

const attendanceRouter = Router();

attendanceRouter.post("/", authenticate, createAttendance);
attendanceRouter.get("/mark/qr", authenticate, markAttendanceQR);
attendanceRouter.post("/mark/code", authenticate, markAttendanceCode);
attendanceRouter.put("/manual", authenticate, updateAttendanceManual);

attendanceRouter.get("/course/:courseId", authenticate, getCourseAttendance);
attendanceRouter.get("/course/:courseId/student/:studentId", authenticate, getStudentAttendanceInCourse);

export default attendanceRouter;
