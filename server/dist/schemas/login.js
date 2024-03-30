"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const zod_1 = __importDefault(require("zod"));
const loginSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
function validateLogin(input) {
    return loginSchema.safeParse(input);
}
exports.validateLogin = validateLogin;
