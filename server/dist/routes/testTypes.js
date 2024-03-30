"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTypeRouter = void 0;
const express_1 = require("express");
const testType_1 = require("../controllers/testType");
exports.testTypeRouter = (0, express_1.Router)();
exports.testTypeRouter.get("/", testType_1.TestTypeController.getAll);
exports.testTypeRouter.get("/:id", testType_1.TestTypeController.getById);
