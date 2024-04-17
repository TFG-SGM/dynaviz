"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialPatient = exports.validatePatient = void 0;
const zod_1 = __importDefault(require("zod"));
const patientSchema = zod_1.default.object({
    name: zod_1.default.string(),
    surname: zod_1.default.string(),
    age: zod_1.default.number(),
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
});
function validatePatient(input) {
    return patientSchema.safeParse(input);
}
exports.validatePatient = validatePatient;
function validatePartialPatient(input) {
    return patientSchema.partial().safeParse(input);
}
exports.validatePartialPatient = validatePartialPatient;
