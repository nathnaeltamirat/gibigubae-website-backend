import { Router } from "express";
import {
  enrollSelf,
  enrollByAdmin,
  removeEnrollment,
  getEnrollments,
} from "../controllers/enrollment.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";

const enrollmentRouter = Router();


enrollmentRouter.post("/self", authenticate, enrollSelf);
enrollmentRouter.post("/admin", authenticate, enrollByAdmin);
enrollmentRouter.delete("/:id", authenticate, removeEnrollment);
enrollmentRouter.get("/", authenticate, getEnrollments);

export default enrollmentRouter;
