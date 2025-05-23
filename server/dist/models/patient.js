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
exports.PatientModel = void 0;
const mongodb_1 = require("mongodb");
const connection_1 = require("../utils/connection");
const helpers_1 = require("../utils/helpers");
class PatientModel {
    static getAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ doctorId }) {
            const db = yield (0, connection_1.connectToMongoDB)("patients");
            const query = doctorId ? { doctorId } : {};
            const patients = yield db.find(query).toArray();
            return patients;
        });
    }
    static getById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const db = yield (0, connection_1.connectToMongoDB)("patients");
            const objectId = new mongodb_1.ObjectId(id);
            const patient = yield db.findOne({ _id: objectId });
            return patient;
        });
    }
    static create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ input }) {
            const db = yield (0, connection_1.connectToMongoDB)("patients");
            const numericId = yield (0, helpers_1.generateNumericId)("patients");
            const formattedId = numericId.toString().padStart(4, "0") + "P";
            const userWithId = Object.assign(Object.assign({}, input), { uId: formattedId });
            const { insertedId } = yield db.insertOne(userWithId);
            return Object.assign({ id: insertedId }, userWithId);
        });
    }
    static update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, input }) {
            const db = yield (0, connection_1.connectToMongoDB)("patients");
            const objectId = new mongodb_1.ObjectId(id);
            const updatedPatient = yield db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnDocument: "after" });
            if (updatedPatient)
                return updatedPatient;
            return null;
        });
    }
    static delete(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const db = yield (0, connection_1.connectToMongoDB)("patients");
            const objectId = new mongodb_1.ObjectId(id);
            const { deletedCount } = yield db.deleteOne({ _id: objectId });
            if (deletedCount > 0)
                return id;
            return null;
        });
    }
    static findByEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            const db = yield (0, connection_1.connectToMongoDB)("patients");
            let admin = yield db.findOne({ email });
            return admin;
        });
    }
    static validateEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            const db = yield (0, connection_1.connectToMongoDB)("patients");
            let patient = yield db.findOne({ email });
            return patient ? false : true;
        });
    }
}
exports.PatientModel = PatientModel;
