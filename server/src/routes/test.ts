import { Router } from "express";
import { TestController } from "../controllers/test";
import { DOCTOR_ROLE, MONGO_URL } from "../utils/constants";
import { checkRole } from "../middlewares/checkRole";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { ObjectId } from "mongodb";

export const testRouter: Router = Router();
const storage = new GridFsStorage({
  url: MONGO_URL,
  file: (req, file) => {
    return {
      filename: file.originalname,
      metadata: {
        id: new ObjectId().toString(),
      },
    };
  },
});

const upload = multer({ storage });

testRouter.delete("/patient/:patientId", TestController.deleteByPatient);

testRouter.use(checkRole(DOCTOR_ROLE));

testRouter.get("/", TestController.getAll);
testRouter.post("/", upload.single("video"), TestController.create);

testRouter.get("/attribute", TestController.getAttributes);

testRouter.get("/:id", TestController.getById);
testRouter.delete("/:id", TestController.delete);
