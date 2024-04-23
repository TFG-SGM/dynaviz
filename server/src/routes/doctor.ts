import { Router } from "express";
import { DoctorController } from "../controllers/doctor";
import { checkRole } from "../middlewares/checkRole";
import { ADMIN_ROLE, DOCTOR_ROLE } from "../utils/constants";

export const doctorRouter: Router = Router();

doctorRouter.get("/:id", DoctorController.getById);
doctorRouter.get("/", DoctorController.getAll);

doctorRouter.put("/:id", DoctorController.update);
doctorRouter.put(
  "/password/:id",
  checkRole(DOCTOR_ROLE),
  DoctorController.updatePass
);

doctorRouter.use(checkRole(ADMIN_ROLE));

doctorRouter.post("/", DoctorController.create);
doctorRouter.delete("/:id", DoctorController.delete);
