import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
    const token = req.cookies?.auth_token;
    console.log(token);
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.user = decoded; // attach typed user to request
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=authenticator.middleware.js.map