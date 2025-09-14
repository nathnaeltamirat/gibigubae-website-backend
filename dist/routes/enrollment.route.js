import { Router } from "express";
import { enrollStudent, removeEnrollment, getEnrollments } from "../controllers/enrollment.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";
const enrollmentRouter = Router();
enrollmentRouter.post("/", authenticate, enrollStudent);
enrollmentRouter.delete("/:id", authenticate, removeEnrollment);
enrollmentRouter.get("/", authenticate, getEnrollments);
export default enrollmentRouter;
//# sourceMappingURL=enrollment.route.js.map