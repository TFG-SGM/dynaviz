"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswords = validatePasswords;
const zod_1 = __importDefault(require("zod"));
const PasswordsSchema = zod_1.default.object({
    old: zod_1.default.string(),
    new1: zod_1.default.string(),
    new2: zod_1.default.string(),
});
function validatePasswords(input) {
    return PasswordsSchema.safeParse(input);
}
