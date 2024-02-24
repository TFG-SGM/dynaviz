import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { userAuth } from "../middlewares/userAuth";

export const authRouter: Router = Router();

authRouter.post("/login", AuthController.login);
authRouter.get("/user-data", userAuth, AuthController.getUserData);
