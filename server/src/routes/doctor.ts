import { Router } from "express";
import { DoctorController } from "../controllers/doctor";
import { checkRole } from "../middlewares/checkRole";
import { ADMIN_ROLE } from "../utils/constants";

export const doctorRouter: Router = Router();

doctorRouter.get("/:id", DoctorController.getById);
doctorRouter.get("/", DoctorController.getAll);

doctorRouter.put("/:id", DoctorController.update);

doctorRouter.use(checkRole(ADMIN_ROLE));

doctorRouter.post("/", DoctorController.create);
doctorRouter.delete("/:id", DoctorController.delete);
