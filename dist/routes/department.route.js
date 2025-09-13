import { Router } from "express";
import { getDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment, } from "../controllers/department.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";
const departmentRouter = Router();
departmentRouter.get("/", getDepartments);
departmentRouter.get("/:id", getDepartmentById);
departmentRouter.post("/", authenticate, createDepartment);
departmentRouter.put("/:id", authenticate, updateDepartment);
departmentRouter.delete("/:id", authenticate, deleteDepartment);
export default departmentRouter;
//# sourceMappingURL=department.route.js.map