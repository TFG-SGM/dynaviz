"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTest = validateTest;
exports.validatePartialTest = validatePartialTest;
const zod_1 = __importDefault(require("zod"));
const testSchema = zod_1.default.object({
    doctorId: zod_1.default.string(),
    typeId: zod_1.default.string(),
    date: zod_1.default.string().transform((str) => new Date(str)),
    patientId: zod_1.default.string(),
    evaScale: zod_1.default.number(),
    video: zod_1.default.object({
        name: zod_1.default.string(),
        id: zod_1.default.string(),
    }),
    data: zod_1.default.object({
        time: zod_1.default.array(zod_1.default.number()),
        restriction: zod_1.default.number(),
        parts: zod_1.default.unknown(),
    }),
});
function validateTest(input) {
    return testSchema.safeParse(input);
}
function validatePartialTest(input) {
    return testSchema.partial().safeParse(input);
}
