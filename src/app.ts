import express from "express";
import cookieParser from "cookie-parser";
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

const app = express();

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
app.use(errorMiddleware);

export default app;
