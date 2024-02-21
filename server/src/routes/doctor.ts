import { Router } from "express";
import { DoctorController } from "../controllers/doctor";

export const doctorRouter: Router = Router();

doctorRouter.get("/", DoctorController.getAll);
doctorRouter.post("/", DoctorController.create);

doctorRouter.get("/:id", DoctorController.getById);
doctorRouter.put("/:id", DoctorController.update);
doctorRouter.delete("/:id", DoctorController.delete);
