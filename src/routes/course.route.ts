import { Router } from "express";
import { createCourse, getCourses, updateCourse, deleteCourse } from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";

const courseRouter = Router();

courseRouter.post("/", authenticate, createCourse);
courseRouter.get("/", authenticate, getCourses);
courseRouter.put("/:id", authenticate, updateCourse);
courseRouter.delete("/:id", authenticate, deleteCourse);

export default courseRouter;
