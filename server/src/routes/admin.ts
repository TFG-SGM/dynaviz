import { Router } from "express";
import { AdminController } from "../controllers/admin";

export const adminRouter: Router = Router();

adminRouter.get("/", AdminController.getAll);
adminRouter.post("/", AdminController.create);

adminRouter.get("/:id", AdminController.getById);
adminRouter.put("/:id", AdminController.update);
adminRouter.delete("/:id", AdminController.delete);
