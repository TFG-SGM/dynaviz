"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const connect_to_MongoDB_1 = require("../utils/connect-to-MongoDB");
class UserModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connect_to_MongoDB_1.connectToMongoDB)("users");
            return { name: "Sergio", subName: "Garcia", age: "21" };
        });
    }
    static getById() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getById");
        });
    }
    static create({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connect_to_MongoDB_1.connectToMongoDB)("users");
            db.insertOne(input);
        });
    }
    static delete() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("delete");
        });
    }
    static update() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("update");
        });
    }
}
exports.UserModel = UserModel;
