import { Router } from "express";
import multer from "multer";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }, 
});

authRouter.post("/sign-up", upload.single("idCard"), signUp);
authRouter.post("/sign-in",signIn)

export default authRouter;
