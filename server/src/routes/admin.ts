import { Router } from "express";
import { AdminController } from "../controllers/admin";
import { checkRole } from "../middlewares/checkRole";
import { ADMIN_ROLE } from "../utils/constants";

export const adminRouter: Router = Router();

adminRouter.use(checkRole(ADMIN_ROLE));

adminRouter.get("/", AdminController.getAll);
adminRouter.post("/", AdminController.create);

adminRouter.get("/:id", AdminController.getById);

adminRouter.put("/:id", AdminController.update);
adminRouter.put("/password/:id", AdminController.updatePass);

adminRouter.delete("/:id", AdminController.delete);
