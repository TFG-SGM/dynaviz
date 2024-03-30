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
exports.AuthController = void 0;
const admin_1 = require("../models/admin");
const doctor_1 = require("../models/doctor");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const login_1 = require("../schemas/login");
const patient_1 = require("../models/patient");
const constants_1 = require("../utils/constants");
class AuthController {
    static validateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEmailAdmin = yield admin_1.AdminModel.validateEmail({ email });
            const isEmailDoctor = yield doctor_1.DoctorModel.validateEmail({
                email,
            });
            const isEmailPatient = yield patient_1.PatientModel.validateEmail({
                email,
            });
            return !(isEmailAdmin && isEmailDoctor && isEmailPatient);
        });
    }
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, bcryptjs_1.hash)(password, 12);
            return hashedPassword;
        });
    }
    static getUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role, email } = req.body.userData;
            let user = null;
            if (role === "admin") {
                user = yield admin_1.AdminModel.findByEmail({ email });
            }
            else {
                user = yield doctor_1.DoctorModel.findByEmail({ email });
            }
            user = Object.assign(Object.assign({}, user), { role });
            res.json(user);
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, login_1.validateLogin)(req.body);
                if (!result.success) {
                    return res
                        .status(400)
                        .json({ error: JSON.parse(result.error.message) });
                }
                const { email, password } = result.data;
                let user = { role: "" };
                const admin = yield admin_1.AdminModel.findByEmail({ email });
                const doctor = yield doctor_1.DoctorModel.findByEmail({ email });
                if (admin) {
                    user = Object.assign(Object.assign({}, user), admin);
                    user.role = constants_1.ADMIN_ROLE;
                }
                else if (doctor) {
                    user = Object.assign(Object.assign({}, user), doctor);
                    user.role = constants_1.DOCTOR_ROLE;
                }
                else {
                    return res.status(404).json({
                        message: "Usuario no encontrado.",
                        success: false,
                    });
                }
                const isMatch = yield (0, bcryptjs_1.compare)(password, user.password || "");
                if (isMatch) {
                    const token = (0, jsonwebtoken_1.sign)({
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }, process.env.APP_SECRET || "", { expiresIn: "3 days" });
                    const result = {
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        token: token,
                        expiresIn: 168,
                    };
                    return res.status(200).json(Object.assign(Object.assign({}, result), { message: "Has iniciado sesión correctamente." }));
                }
                else {
                    return res.status(403).json({
                        message: "Contraseña incorrecta.",
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    message: "Error interno de servidor.",
                    success: false,
                });
            }
        });
    }
}
exports.AuthController = AuthController;
