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
exports.TestController = void 0;
const test_1 = require("../models/test");
const test_2 = require("../schemas/test");
class TestController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { patientId, doctorId, typeId, date, order } = req.query;
            const tests = yield test_1.TestModel.getAll({
                patientId: patientId,
                typeId: typeId,
                doctorId: doctorId,
                date: date,
                order: order,
            });
            res.json(tests);
        });
    }
    static getAttributes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { attribute, patientId } = req.query;
            const attributes = yield test_1.TestModel.getAttributes({
                attribute: attribute,
                patientId: patientId,
            });
            res.json(attributes);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const test = yield test_1.TestModel.getById({ id });
            if (test)
                return res.json(test);
            res.status(404).json({ message: "Prueba no encontrada." });
        });
    }
    static create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.file);
            req.body = Object.assign(Object.assign({}, req.body), { evaScale: parseInt(req.body.evaScale), data: JSON.parse(req.body.data), video: { name: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname, id: (_b = req.file) === null || _b === void 0 ? void 0 : _b.id.toString() } });
            console.log(req.body);
            const result = (0, test_2.validateTest)(req.body);
            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }
            const newTest = yield test_1.TestModel.create({ input: result.data });
            res.json(newTest);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield test_1.TestModel.delete({ id });
            if (result)
                return res.json(result);
            res.status(404).json({ message: "Prueba no encontrada." });
        });
    }
    static deleteByPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { patientId } = req.params;
            const result = yield test_1.TestModel.deleteByPatient({ patientId });
            if (result)
                return res.json(result);
            res.status(404).json({ message: "Prueba no encontrada." });
        });
    }
}
exports.TestController = TestController;
