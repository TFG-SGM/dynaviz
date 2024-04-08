"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URL = exports.DOCTOR_ROLE = exports.ADMIN_ROLE = void 0;
exports.ADMIN_ROLE = "admin";
exports.DOCTOR_ROLE = "doctor";
exports.MONGO_URL = (_a = process.env.LOCAL_URL) !== null && _a !== void 0 ? _a : "mongodb://localhost:27017/dynaviz";
