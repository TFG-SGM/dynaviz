"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
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
exports.adminRouter.use((0, checkRole_1.checkRole)(constants_1.ADMIN_ROLE));
exports.adminRouter.get("/", admin_1.AdminController.getAll);
exports.adminRouter.post("/", upload.single("photo"), admin_1.AdminController.create);
exports.adminRouter.get("/:id", admin_1.AdminController.getById);
exports.adminRouter.put("/:id", upload.single("photo"), admin_1.AdminController.update);
exports.adminRouter.put("/password/:id", admin_1.AdminController.updatePass);
exports.adminRouter.delete("/:id", admin_1.AdminController.delete);
