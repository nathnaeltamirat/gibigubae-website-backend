import { Router } from "express";
import { createAttendance, markAttendanceQR, markAttendanceCode, updateAttendanceManual, } from "../controllers/attendance.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";
const attendanceRouter = Router();
attendanceRouter.post("/", authenticate, createAttendance);
attendanceRouter.get("/mark/qr", markAttendanceQR);
attendanceRouter.post("/mark/code", markAttendanceCode);
attendanceRouter.put("/manual", authenticate, updateAttendanceManual);
export default attendanceRouter;
//# sourceMappingURL=attendance.route.js.map