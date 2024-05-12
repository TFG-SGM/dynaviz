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
    date: zod_1.default.string().transform((str) => new Date(str)),
    city: zod_1.default.string(),
    email: zod_1.default.string(),
    phone: zod_1.default.string(),
    photo: zod_1.default
        .object({
        name: zod_1.default.string().optional(),
        id: zod_1.default.string().optional(),
    })
        .optional(),
});
function validateDoctor(input) {
    return DoctorSchema.safeParse(input);
}
exports.validateDoctor = validateDoctor;
function validatePartialDoctor(input) {
    return DoctorSchema.omit({ password: true }).partial().safeParse(input);
}
exports.validatePartialDoctor = validatePartialDoctor;
