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
exports.UserController = void 0;
const user_1 = require("../models/user");
const user_2 = require("../schemas/user");
class UserController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.UserModel.getAll();
            res.send(users);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserModel.getById();
            res.send(user);
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, user_2.validateUser)(req.body);
            if (!result.success) {
                res.status(400).json({ error: JSON.parse(result.error.message) });
                return;
            }
            const newUser = yield user_1.UserModel.create({ input: result.data });
            res.status(201).json(newUser);
        });
    }
}
exports.UserController = UserController;
