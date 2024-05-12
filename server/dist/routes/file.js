"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRouter = void 0;
const express_1 = require("express");
const file_1 = require("../controllers/file");
exports.fileRouter = (0, express_1.Router)();
exports.fileRouter.get("/:id", file_1.FileController.getById);
exports.fileRouter.delete("/:id", file_1.FileController.delete);
