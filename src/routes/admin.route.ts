import { Router } from "express";
import {
  getAllStudents,
  getStudentById,
  updateStudent,
  changeStudentRole,
  verifyStudent,
  deleteStudent,
} from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";

const adminRouter = Router();


adminRouter.get("/", authenticate, getAllStudents);
adminRouter.get("/:id", authenticate, getStudentById);
adminRouter.put("/:id", authenticate, updateStudent);
adminRouter.put("/:id/role", authenticate, changeStudentRole);
adminRouter.put("/:id/verify", authenticate, verifyStudent);
adminRouter.delete("/:id", authenticate, deleteStudent);

export default adminRouter;
