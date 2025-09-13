import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
export const authenticate = (req, res, next) => {
    const token = req.cookies?.auth_token;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=authenticator.middleware.js.map