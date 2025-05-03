"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatient = validatePatient;
exports.validatePartialPatient = validatePartialPatient;
const zod_1 = __importDefault(require("zod"));
const patientSchema = zod_1.default.object({
    password: zod_1.default.string(),
    name: zod_1.default.string(),
    surname: zod_1.default.string(),
    date: zod_1.default.string().transform((str) => new Date(str)),
    city: zod_1.default.string(),
    email: zod_1.default.string(),
    phone: zod_1.default.string(),
    weight: zod_1.default.number(),
    height: zod_1.default.number(),
    occupation: zod_1.default.string(),
    activityLevel: zod_1.default.string(),
    diagnosisYears: zod_1.default.number(),
    isFibro: zod_1.default.boolean(),
    doctorId: zod_1.default.string(),
    photo: zod_1.default
        .object({
        name: zod_1.default.string().optional(),
        id: zod_1.default.string().optional(),
    })
        .optional(),
});
function validatePatient(input) {
    return patientSchema.safeParse(input);
}
function validatePartialPatient(input) {
    return patientSchema.partial().safeParse(input);
}
