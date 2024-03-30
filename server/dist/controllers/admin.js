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
exports.AdminController = void 0;
const admin_1 = require("../models/admin");
const admin_2 = require("../schemas/admin");
const auth_1 = require("./auth");
class AdminController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield admin_1.AdminModel.getAll();
            res.json(admins);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const admin = yield admin_1.AdminModel.getById({ id });
            if (admin)
                return res.json(admin);
            res.status(404).json({ message: "Admin no encontrado." });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, admin_2.validateAdmin)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const isEmail = yield auth_1.AuthController.validateEmail(result.data.email);
            if (isEmail) {
                return res.status(400).json({
                    message: `El correo ya esta registrado.`,
                });
            }
            result.data.password = yield auth_1.AuthController.hashPassword(result.data.password);
            const newAdmin = yield admin_1.AdminModel.create({ input: result.data });
            res.json(newAdmin);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, admin_2.validatePartialAdmin)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const { id } = req.params;
            const existingAdmin = yield admin_1.AdminModel.getById({ id });
            if (!existingAdmin) {
                return res.status(404).json({ message: "Administrador no encontrado" });
            }
            if (result.data.email && result.data.email !== existingAdmin.email) {
                const isEmail = yield auth_1.AuthController.validateEmail(result.data.email);
                if (isEmail) {
                    return res.status(400).json({
                        message: `El correo ya esta registrado.`,
                    });
                }
            }
            const updatedAdmin = yield admin_1.AdminModel.update({ id, input: result.data });
            return res.json(updatedAdmin);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield admin_1.AdminModel.delete({ id });
            if (result)
                return res.json(result);
            res.status(404).json({ message: "Admin no encontrado." });
        });
    }
}
exports.AdminController = AdminController;
