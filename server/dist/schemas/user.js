"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialUser = exports.validateUser = void 0;
const zod_1 = __importDefault(require("zod"));
const userSchema = zod_1.default.object({
    name: zod_1.default.string(),
    subName: zod_1.default.string(),
    age: zod_1.default.number(),
});
function validateUser(input) {
    return userSchema.safeParse(input);
}
exports.validateUser = validateUser;
function validatePartialUser(input) {
    return userSchema.partial().safeParse(input);
}
exports.validatePartialUser = validatePartialUser;
