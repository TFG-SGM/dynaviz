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
exports.TestTypeController = void 0;
const testType_1 = require("../models/testType");
class TestTypeController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const testTypes = yield testType_1.TestTypeModel.getAll();
            res.json(testTypes);
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const testType = yield testType_1.TestTypeModel.getById({ id });
            if (testType)
                return res.json(testType);
            res.status(404).json({ message: "Prueba no encontrada." });
        });
    }
}
exports.TestTypeController = TestTypeController;
