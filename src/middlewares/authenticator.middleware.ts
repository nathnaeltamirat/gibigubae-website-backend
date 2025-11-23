import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtUserPayload extends jwt.JwtPayload {
  user_id: string;
  email: string;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.auth_token;
  console.log(token)
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtUserPayload;
    // @ts-ignore
    req.user = decoded; // attach typed user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
