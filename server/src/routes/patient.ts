import { Router } from "express";
import { PatientController } from "../controllers/patient";

export const patientRouter: Router = Router();

patientRouter.get("/", PatientController.getAll);
patientRouter.post("/", PatientController.create);

patientRouter.get("/:id", PatientController.getById);
patientRouter.put("/:id", PatientController.update);
patientRouter.delete("/:id", PatientController.delete);
