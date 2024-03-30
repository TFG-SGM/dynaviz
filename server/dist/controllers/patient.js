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
exports.PatientController = void 0;
const patient_1 = require("../models/patient");
const patient_2 = require("../schemas/patient");
const auth_1 = require("./auth");
class PatientController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { doctorId } = req.query;
            const patients = yield patient_1.PatientModel.getAll({
                doctorId: doctorId,
            });
            res.json(patients);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const patient = yield patient_1.PatientModel.getById({ id });
            if (patient)
                return res.json(patient);
            res.status(404).json({ message: "Paciente no encontrado." });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, patient_2.validatePatient)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const isEmail = yield auth_1.AuthController.validateEmail(result.data.email);
            if (isEmail) {
                return res.status(400).json({
                    message: `El correo ya esta registrado.`,
                });
            }
            const newPatient = yield patient_1.PatientModel.create({ input: result.data });
            res.json(newPatient);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, patient_2.validatePartialPatient)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const { id } = req.params;
            const existingPatient = yield patient_1.PatientModel.getById({ id });
            if (!existingPatient) {
                return res.status(404).json({ message: "Paciente no encontrado" });
            }
            if (result.data.email && result.data.email !== existingPatient.email) {
                const isEmail = yield auth_1.AuthController.validateEmail(result.data.email);
                if (isEmail) {
                    return res.status(400).json({
                        message: `El correo ya esta registrado.`,
                    });
                }
            }
            const updatedPatient = yield patient_1.PatientModel.update({
                id,
                input: result.data,
            });
            return res.json(updatedPatient);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield patient_1.PatientModel.delete({ id });
            if (result)
                return res.json(result);
            res.status(404).json({ message: "Paciente no encontrado." });
        });
    }
}
exports.PatientController = PatientController;
