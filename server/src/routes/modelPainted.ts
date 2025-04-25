import { Router } from "express";
import { ModelPaintedController } from "../controllers/modelPainted";

export const modelPaintedRouter: Router = Router();

modelPaintedRouter.delete(
  "/patient/:patientId",
  ModelPaintedController.deleteByPatient
);

//modelPaintedRouter.use(checkRole(PATIENT_ROLE));

modelPaintedRouter.get("/", ModelPaintedController.getAll);

modelPaintedRouter.get("/:id", ModelPaintedController.getById);
modelPaintedRouter.delete("/:id", ModelPaintedController.delete);
modelPaintedRouter.post("/", ModelPaintedController.create);
modelPaintedRouter.put("/:id", ModelPaintedController.update);
