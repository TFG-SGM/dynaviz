"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialAdmin = exports.validateAdmin = void 0;
const zod_1 = __importDefault(require("zod"));
const adminSchema = zod_1.default.object({
    password: zod_1.default.string(),
    name: zod_1.default.string(),
    surname: zod_1.default.string(),
    age: zod_1.default.number(),
    city: zod_1.default.string(),
    email: zod_1.default.string(),
    phone: zod_1.default.number(),
});
function validateAdmin(input) {
    return adminSchema.safeParse(input);
}
exports.validateAdmin = validateAdmin;
function validatePartialAdmin(input) {
    return adminSchema.partial().safeParse(input);
}
exports.validatePartialAdmin = validatePartialAdmin;