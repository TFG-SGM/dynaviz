"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const userAuth_1 = require("../middlewares/userAuth");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/login", auth_1.AuthController.login);
exports.authRouter.get("/user-data", userAuth_1.userAuth, auth_1.AuthController.getUserData);
