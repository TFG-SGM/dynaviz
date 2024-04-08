"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const video_1 = require("../controllers/video");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter.get("/:id", video_1.VideoController.getById);
exports.videoRouter.delete("/:id", video_1.VideoController.delete);
