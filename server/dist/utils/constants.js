"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URL = exports.DOCTOR_ROLE = exports.ADMIN_ROLE = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ADMIN_ROLE = "admin";
exports.DOCTOR_ROLE = "doctor";
exports.MONGO_URL = (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : "mongodb://localhost:27017/dynaviz";
