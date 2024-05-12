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
exports.DoctorController = void 0;
const doctor_1 = require("../models/doctor");
const doctor_2 = require("../schemas/doctor");
const auth_1 = require("./auth");
const passwords_1 = require("../schemas/passwords");
const bcryptjs_1 = require("bcryptjs");
class DoctorController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctors = yield doctor_1.DoctorModel.getAll();
            res.json(doctors);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const doctor = yield doctor_1.DoctorModel.getById({ id });
            if (doctor)
                return res.json(doctor);
            res.status(404).json({ message: "Médico no encontrado." });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            req.body = Object.assign(Object.assign({}, req.body), { photo: { name: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname, id: (_b = req.file) === null || _b === void 0 ? void 0 : _b.id.toString() } });
            const result = (0, doctor_2.validateDoctor)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const isEmail = yield auth_1.AuthController.validateEmail(result.data.email);
            if (isEmail) {
                return res.status(400).json({
                    message: `El correo ya está registrado.`,
                });
            }
            result.data.password = yield auth_1.AuthController.hashPassword(result.data.password);
            const newDoctor = yield doctor_1.DoctorModel.create({ input: result.data });
            res.json(newDoctor);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (req.body.isPhotoChanged) {
                req.body = Object.assign(Object.assign({}, req.body), { photo: { name: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname, id: (_b = req.file) === null || _b === void 0 ? void 0 : _b.id.toString() } });
            }
            else {
                delete req.body.photo;
            }
            const result = (0, doctor_2.validatePartialDoctor)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const { id } = req.params;
            const existingDoctor = yield doctor_1.DoctorModel.getById({ id });
            if (!existingDoctor) {
                return res.status(404).json({ message: "Médico no encontrado" });
            }
            if (result.data.email && result.data.email !== existingDoctor.email) {
                const isEmail = yield auth_1.AuthController.validateEmail(result.data.email);
                if (isEmail) {
                    return res.status(400).json({
                        message: `El correo ya está registrado.`,
                    });
                }
            }
            const updatedDoctor = yield doctor_1.DoctorModel.update({ id, input: result.data });
            return res.json(updatedDoctor);
        });
    }
    static updatePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, passwords_1.validatePasswords)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const { id } = req.params;
            const existingDoctor = yield doctor_1.DoctorModel.getById({ id });
            if (!existingDoctor) {
                return res.status(404).json({ message: "Médico no encontrado" });
            }
            if (result.data.new1 !== result.data.new2) {
                return res.status(404).json({ message: "Las contraseñas no coinciden" });
            }
            let isMatch = yield (0, bcryptjs_1.compare)(result.data.old, existingDoctor.password);
            if (!isMatch) {
                return res.status(404).json({ message: "Contraseña incorrecta" });
            }
            isMatch = yield (0, bcryptjs_1.compare)(result.data.new1, existingDoctor.password);
            if (isMatch) {
                return res
                    .status(404)
                    .json({ message: "La contraseña antigua y nueva son las mismas" });
            }
            const password = yield auth_1.AuthController.hashPassword(result.data.new1);
            const updatedDoctor = yield doctor_1.DoctorModel.update({
                id,
                input: { password },
            });
            return res.json(updatedDoctor);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield doctor_1.DoctorModel.delete({ id });
            if (result)
                return res.json(result);
            res.status(404).json({ message: "Doctor no encontrado." });
        });
    }
}
exports.DoctorController = DoctorController;
