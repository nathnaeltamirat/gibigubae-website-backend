import { Router } from "express";
import multer from "multer";
import { logout, refreshToken, signIn, signUp } from "../controllers/auth.controller.js";
const authRouter = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 3 * 1024 * 1024 },
});
authRouter.post("/sign-up", upload.single("id_card"), signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/logout", logout);
export default authRouter;
//# sourceMappingURL=auth.route.js.map