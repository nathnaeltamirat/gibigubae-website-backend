import { Router } from "express";
import { createServiceGroup, deleteServiceGroup, getServiceGroupById, getServiceGroups, updateServiceGroup } from "../controllers/service-group.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";


const serviceGroupRouter = Router();

serviceGroupRouter.get("/", authenticate, getServiceGroups);
serviceGroupRouter.get("/:id", authenticate, getServiceGroupById);
serviceGroupRouter.post("/", authenticate, createServiceGroup);
serviceGroupRouter.put("/:id", authenticate, updateServiceGroup);
serviceGroupRouter.delete("/:id", authenticate, deleteServiceGroup);

export default serviceGroupRouter;
