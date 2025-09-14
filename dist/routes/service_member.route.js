import { Router } from "express";
import { getMembers, getMemberById, createMember, updateMember, deleteMember, } from "../controllers/service_member.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";
const serviceMemberRouter = Router();
// Public
serviceMemberRouter.get("/", getMembers);
serviceMemberRouter.get("/:user_id/:group_id", getMemberById);
serviceMemberRouter.post("/", authenticate, createMember);
serviceMemberRouter.put("/:user_id/:group_id", authenticate, updateMember);
serviceMemberRouter.delete("/:user_id/:group_id", authenticate, deleteMember);
export default serviceMemberRouter;
//# sourceMappingURL=service_member.route.js.map