import { Router } from "express";
import multer from "multer";
import { signUp } from "../controllers/auth.controller.js";

const authRouter = Router();


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }, 
});

authRouter.post("/sign-up", upload.single("idCard"), signUp);

export default authRouter;
