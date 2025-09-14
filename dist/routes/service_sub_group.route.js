import { Router } from "express";
import { authenticate } from "../middlewares/authenticator.middleware.js";
import { getSubGroups, getSubGroupById, createSubGroup, updateSubGroup, deleteSubGroup } from "../controllers/service_sub_group.controller.js";
;
const subGroupRouter = Router();
subGroupRouter.get("/", authenticate, getSubGroups);
subGroupRouter.get("/:id", authenticate, getSubGroupById);
subGroupRouter.post("/", authenticate, createSubGroup);
subGroupRouter.put("/:id", authenticate, updateSubGroup);
subGroupRouter.delete("/:id", authenticate, deleteSubGroup);
export default subGroupRouter;
//# sourceMappingURL=service_sub_group.route.js.map