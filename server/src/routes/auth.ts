import { Router } from "express";
import { AuthController } from "../controllers/auth";

export const authRouter: Router = Router();

authRouter.post("/", AuthController.loginUser);
