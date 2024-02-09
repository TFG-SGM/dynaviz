import { Router } from "express";
import { UserController } from "../controllers/user";

export const userRouter: Router = Router();

userRouter.get("/", UserController.getAll);
userRouter.post("/", UserController.create);
