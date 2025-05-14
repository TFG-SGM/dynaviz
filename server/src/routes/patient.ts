import { Router } from "express";
import { PatientController } from "../controllers/patient";
import { GridFsStorage } from "multer-gridfs-storage";
import { MONGO_URL } from "../utils/constants";
import multer from "multer";

export const patientRouter: Router = Router();
const storage = new GridFsStorage({
  url: MONGO_URL,
  file: (req, file) => {
    return {
      filename: file.originalname,
    };
  },
}) as unknown as multer.StorageEngine;
const upload = multer({ storage });

patientRouter.get("/", PatientController.getAll);
patientRouter.post("/", upload.single("photo"), PatientController.create);

patientRouter.get("/:id", PatientController.getById);
patientRouter.put("/:id", upload.single("photo"), PatientController.update);
patientRouter.delete("/:id", PatientController.delete);
