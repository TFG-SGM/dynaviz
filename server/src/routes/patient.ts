import { Router } from "express";
import { PatientController } from "../controllers/patient";
import { checkRole } from "../middlewares/checkRole";
import { DOCTOR_ROLE } from "../utils/constants";

export const patientRouter: Router = Router();

patientRouter.use(checkRole(DOCTOR_ROLE));

patientRouter.get("/", PatientController.getAll);
patientRouter.post("/", PatientController.create);

patientRouter.get("/:id", PatientController.getById);
patientRouter.put("/:id", PatientController.update);
patientRouter.delete("/:id", PatientController.delete);
