import { Router } from "express";
import { TestController } from "../controllers/test";
import { DOCTOR_ROLE } from "../utils/constants";
import { checkRole } from "../middlewares/checkRole";

export const testRouter: Router = Router();

testRouter.delete("/patient/:patientId", TestController.deleteByPatient);

testRouter.use(checkRole(DOCTOR_ROLE));

testRouter.get("/", TestController.getAll);
testRouter.post("/", TestController.create);

testRouter.get("/attribute", TestController.getAttributes);

testRouter.get("/:id", TestController.getById);
testRouter.put("/:id", TestController.update);
testRouter.delete("/:id", TestController.delete);
