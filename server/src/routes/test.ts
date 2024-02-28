import { Router } from "express";
import { TestController } from "../controllers/test";
import { checkRole } from "../middlewares/checkRole";
import { DOCTOR_ROLE } from "../utils/constants";

export const testRouter: Router = Router();

testRouter.use(checkRole(DOCTOR_ROLE));

testRouter.get("/", TestController.getAll);
testRouter.post("/", TestController.create);

testRouter.get("/:id", TestController.getById);
testRouter.put("/:id", TestController.update);
testRouter.delete("/:id", TestController.delete);
