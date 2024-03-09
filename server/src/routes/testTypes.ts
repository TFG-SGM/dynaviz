import { Router } from "express";
import { checkRole } from "../middlewares/checkRole";
import { DOCTOR_ROLE } from "../utils/constants";
import { TestTypeController } from "../controllers/testType";

export const testTypeRouter: Router = Router();

testTypeRouter.use(checkRole(DOCTOR_ROLE));

testTypeRouter.get("/", TestTypeController.getAll);
testTypeRouter.post("/", TestTypeController.create);

testTypeRouter.get("/:id", TestTypeController.getById);
testTypeRouter.put("/:id", TestTypeController.update);
testTypeRouter.delete("/:id", TestTypeController.delete);
