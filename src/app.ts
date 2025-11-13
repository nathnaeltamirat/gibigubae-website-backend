import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "reflect-metadata";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger.js";
import studentRouter from "./routes/student.route.js";
import departmentRouter from "./routes/department.route.js";
import serviceGroupRouter from "./routes/service_group.route.js";
import subGroupRouter from "./routes/service_sub_group.route.js";
import serviceMemberRouter from "./routes/service_member.route.js";
import academicInfoRouter from "./routes/academic_info.route.js";
import adminRouter from "./routes/admin.route.js";
import courseRouter from "./routes/course.route.js";
import enrollmentRouter from "./routes/enrollment.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import analyticsRouter from "./routes/analytics.route.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", authRouter);
app.use("/api/v1/students/me", studentRouter);
app.use("/api/v1/departments", departmentRouter);
app.use("/api/v1/service-groups",serviceGroupRouter);
app.use("/api/v1/service-sub-groups",subGroupRouter);
app.use("/api/v1/service-members",serviceMemberRouter);
app.use("/api/v1/academic-info", academicInfoRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/enrollments", enrollmentRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/analytics",analyticsRouter)
app.use(errorMiddleware);

export default app;
