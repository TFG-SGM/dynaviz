"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const patient_1 = require("../controllers/patient");
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const constants_1 = require("../utils/constants");
const multer_1 = __importDefault(require("multer"));
exports.patientRouter = (0, express_1.Router)();
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: constants_1.MONGO_URL,
    file: (req, file) => {
        return {
            filename: file.originalname,
        };
    },
});
const upload = (0, multer_1.default)({ storage });
exports.patientRouter.get("/", patient_1.PatientController.getAll);
exports.patientRouter.post("/", upload.single("photo"), patient_1.PatientController.create);
exports.patientRouter.get("/:id", patient_1.PatientController.getById);
exports.patientRouter.put("/:id", upload.single("photo"), patient_1.PatientController.update);
exports.patientRouter.delete("/:id", patient_1.PatientController.delete);
