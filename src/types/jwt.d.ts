import "express";

declare module "express" {
  export interface Request {
    user?: {
      user_id: string;
      email: string;
      role: string;
    };
  }
}
