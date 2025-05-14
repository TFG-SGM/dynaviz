import { Router } from "express";
import { DoctorController } from "../controllers/doctor";
import { checkRole } from "../middlewares/checkRole";
import { ADMIN_ROLE, DOCTOR_ROLE, MONGO_URL } from "../utils/constants";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

export const adminRouter: Router = Router();
const storage = new GridFsStorage({
  url: MONGO_URL,
  file: (req, file) => {
    return {
      filename: file.originalname,
    };
  },
}) as unknown as multer.StorageEngine;
const upload = multer({ storage });

export const doctorRouter: Router = Router();

doctorRouter.get("/:id", DoctorController.getById);
doctorRouter.get("/", DoctorController.getAll);

doctorRouter.put("/:id", upload.single("photo"), DoctorController.update);
doctorRouter.put(
  "/password/:id",
  checkRole(DOCTOR_ROLE),
  DoctorController.updatePass
);

doctorRouter.use(checkRole(ADMIN_ROLE));

doctorRouter.post("/", upload.single("photo"), DoctorController.create);
doctorRouter.delete("/:id", DoctorController.delete);
