import { Router } from "express";
import { TestTypeController } from "../controllers/testType";

export const testTypeRouter: Router = Router();

testTypeRouter.get("/", TestTypeController.getAll);
testTypeRouter.get("/:id", TestTypeController.getById);
