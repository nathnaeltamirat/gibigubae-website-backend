import { Router } from "express";
import { addOrUpdateAcademicInfo, getAcademicInfo } from "../controllers/academic_info.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";
const academicInfoRouter = Router();
academicInfoRouter.post("/", authenticate, addOrUpdateAcademicInfo);
academicInfoRouter.put("/academic-info/:id", authenticate, addOrUpdateAcademicInfo);
academicInfoRouter.get("/academic-info/:studentId", authenticate, getAcademicInfo);
export default academicInfoRouter;
//# sourceMappingURL=academic_info.route.js.map