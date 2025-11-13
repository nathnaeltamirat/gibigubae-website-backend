import { Router } from "express";
import { getOverallAnalytics, getCourseAttendanceStats, getStudentAttendanceSummary, } from "../controllers/analytics.controller.js";
const analyticsRouter = Router();
analyticsRouter.get("/overall", getOverallAnalytics);
analyticsRouter.get("/course/:courseId", getCourseAttendanceStats);
analyticsRouter.get("/student/:studentId", getStudentAttendanceSummary);
export default analyticsRouter;
//# sourceMappingURL=analytics.route.js.map