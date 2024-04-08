"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = require("express");
const test_1 = require("../controllers/test");
const constants_1 = require("../utils/constants");
const checkRole_1 = require("../middlewares/checkRole");
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
exports.testRouter = (0, express_1.Router)();
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: constants_1.MONGO_URL,
    file: (req, file) => {
        return {
            filename: file.originalname,
        };
    },
});
const upload = (0, multer_1.default)({ storage });
exports.testRouter.delete("/patient/:patientId", test_1.TestController.deleteByPatient);
exports.testRouter.use((0, checkRole_1.checkRole)(constants_1.DOCTOR_ROLE));
exports.testRouter.get("/", test_1.TestController.getAll);
exports.testRouter.post("/", upload.single("video"), test_1.TestController.create);
exports.testRouter.get("/attribute", test_1.TestController.getAttributes);
exports.testRouter.get("/:id", test_1.TestController.getById);
exports.testRouter.delete("/:id", test_1.TestController.delete);
