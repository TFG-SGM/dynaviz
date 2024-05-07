import { Router } from "express";
import { FileController } from "../controllers/file";

export const fileRouter: Router = Router();

fileRouter.get("/:id", FileController.getById);
fileRouter.delete("/:id", FileController.delete);
