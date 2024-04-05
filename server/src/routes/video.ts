import { Router } from "express";
import { VideoController } from "../controllers/video";

export const videoRouter: Router = Router();

videoRouter.get("/:id", VideoController.getById);
videoRouter.delete("/:id", VideoController.delete);
