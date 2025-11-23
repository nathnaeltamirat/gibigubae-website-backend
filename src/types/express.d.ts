import "express";
import type { Request } from "express";
import { JwtUserPayload } from "../middlewares/authenticator.middleware.js"; 

export interface AuthenticatedRequest extends Request {
  user?: JwtUserPayload;
}
declare module "express" {
  export interface Request {
    user?: {
      user_id: string;
      email: string;
      role: string;
    };
  }
}
