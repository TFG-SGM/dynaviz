"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialDoctor = exports.validateDoctor = void 0;
const zod_1 = __importDefault(require("zod"));
const DoctorSchema = zod_1.default.object({
    password: zod_1.default.string(),
    name: zod_1.default.string(),
    surname: zod_1.default.string(),
    age: zod_1.default.number(),
    city: zod_1.default.string(),
    email: zod_1.default.string(),
    phone: zod_1.default.string(),
});
function validateDoctor(input) {
    return DoctorSchema.safeParse(input);
}
exports.validateDoctor = validateDoctor;
function validatePartialDoctor(input) {
    return DoctorSchema.omit({ password: true }).partial().safeParse(input);
}
exports.validatePartialDoctor = validatePartialDoctor;
