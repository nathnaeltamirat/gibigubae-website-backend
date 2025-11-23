import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getStudentCourses,
} from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";

const courseRouter = Router();

/**
 * Admin routes
 */
courseRouter.post("/", authenticate, createCourse);
courseRouter.get("/", authenticate, getCourses);
courseRouter.get("/:id", authenticate, getCourseById); // <--- new endpoint
courseRouter.put("/:id", authenticate, updateCourse);
courseRouter.delete("/:id", authenticate, deleteCourse);

/**
 * Student routes
 */
courseRouter.get("/student", authenticate, getStudentCourses);

export default courseRouter;
