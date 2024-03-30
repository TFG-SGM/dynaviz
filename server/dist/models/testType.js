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
exports.TestTypeModel = void 0;
const mongodb_1 = require("mongodb");
const connection_1 = require("../utils/connection");
class TestTypeModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("testTypes");
            const testTypes = yield db.find({}).toArray();
            return testTypes;
        });
    }
    static getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("testTypes");
            const objectId = new mongodb_1.ObjectId(id);
            const testType = yield db.findOne({ _id: objectId });
            return testType;
        });
    }
}
exports.TestTypeModel = TestTypeModel;
