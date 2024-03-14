import { Router } from "express";
import { TestController } from "../controllers/test";

export const testRouter: Router = Router();

testRouter.get("/", TestController.getAll);
testRouter.post("/", TestController.create);

testRouter.get("/attributes/:attribute", TestController.getAttributes);
testRouter.delete("/patient/:patientId", TestController.deleteByPatient);

testRouter.get("/:id", TestController.getById);
testRouter.put("/:id", TestController.update);
testRouter.delete("/:id", TestController.delete);
