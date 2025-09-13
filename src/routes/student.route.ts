import { Router } from "express";
import multer from "multer";
import { getOwnProfile, updateOwnProfile } from "../controllers/student.controller.js";
import { authenticate } from "../middlewares/authenticator.middleware.js";

const studentRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
});


studentRouter.get("/students/me", authenticate, getOwnProfile);
studentRouter.put("/students/me", authenticate, upload.single("id_card"), updateOwnProfile);

export default studentRouter;
