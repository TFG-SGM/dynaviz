import { Router } from "express";
import { AdminController } from "../controllers/admin";
import { checkRole } from "../middlewares/checkRole";
import { ADMIN_ROLE, MONGO_URL } from "../utils/constants";
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
});
const upload = multer({ storage });

adminRouter.use(checkRole(ADMIN_ROLE));

adminRouter.get("/", AdminController.getAll);
adminRouter.post("/", upload.single("photo"), AdminController.create);

adminRouter.get("/:id", AdminController.getById);

adminRouter.put("/:id", upload.single("photo"), AdminController.update);
adminRouter.put("/password/:id", AdminController.updatePass);

adminRouter.delete("/:id", AdminController.delete);
