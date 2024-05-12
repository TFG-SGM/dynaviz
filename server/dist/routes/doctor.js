"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = exports.adminRouter = void 0;
const express_1 = require("express");
const doctor_1 = require("../controllers/doctor");
const checkRole_1 = require("../middlewares/checkRole");
const constants_1 = require("../utils/constants");
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const multer_1 = __importDefault(require("multer"));
exports.adminRouter = (0, express_1.Router)();
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: constants_1.MONGO_URL,
    file: (req, file) => {
        return {
            filename: file.originalname,
        };
    },
});
const upload = (0, multer_1.default)({ storage });
exports.doctorRouter = (0, express_1.Router)();
exports.doctorRouter.get("/:id", doctor_1.DoctorController.getById);
exports.doctorRouter.get("/", doctor_1.DoctorController.getAll);
exports.doctorRouter.put("/:id", upload.single("photo"), doctor_1.DoctorController.update);
exports.doctorRouter.put("/password/:id", (0, checkRole_1.checkRole)(constants_1.DOCTOR_ROLE), doctor_1.DoctorController.updatePass);
exports.doctorRouter.use((0, checkRole_1.checkRole)(constants_1.ADMIN_ROLE));
exports.doctorRouter.post("/", upload.single("photo"), doctor_1.DoctorController.create);
exports.doctorRouter.delete("/:id", doctor_1.DoctorController.delete);
