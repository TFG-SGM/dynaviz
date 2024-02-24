import { Router } from "express";
import { PatientController } from "../controllers/patient";
import { checkRole } from "../middlewares/checkRole";

export const patientRouter: Router = Router();

patientRouter.use(checkRole("doctor"));

patientRouter.get("/", PatientController.getAll);
patientRouter.post("/", PatientController.create);

patientRouter.get("/:id", PatientController.getById);
patientRouter.put("/:id", PatientController.update);
patientRouter.delete("/:id", PatientController.delete);
