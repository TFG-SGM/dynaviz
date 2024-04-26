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
exports.DoctorModel = void 0;
const mongodb_1 = require("mongodb");
const connection_1 = require("../utils/connection");
const helpers_1 = require("../utils/helpers");
class DoctorModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("doctors");
            const doctors = yield db.find({}).toArray();
            return doctors;
        });
    }
    static getById(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const db = yield (0, connection_1.connectToMongoDB)("doctors");
            const objectId = new mongodb_1.ObjectId(id);
            const doctor = yield db.findOne({ _id: objectId });
            return doctor;
        });
    }
    static create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ input }) {
            const db = yield (0, connection_1.connectToMongoDB)("doctors");
            const numericId = yield (0, helpers_1.generateNumericId)("doctors");
            const formattedId = numericId.toString().padStart(4, "0") + "M";
            const userWithId = Object.assign(Object.assign({}, input), { uId: formattedId });
            const { insertedId } = yield db.insertOne(userWithId);
            return Object.assign({ id: insertedId }, userWithId);
        });
    }
    static update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, input }) {
            const db = yield (0, connection_1.connectToMongoDB)("doctors");
            const objectId = new mongodb_1.ObjectId(id);
            const updatedDoctor = yield db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnDocument: "after" });
            if (updatedDoctor)
                return updatedDoctor;
            return null;
        });
    }
    static delete(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            const db = yield (0, connection_1.connectToMongoDB)("doctors");
            const objectId = new mongodb_1.ObjectId(id);
            const { deletedCount } = yield db.deleteOne({ _id: objectId });
            if (deletedCount > 0)
                return id;
            return null;
        });
    }
    static findByEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            const db = yield (0, connection_1.connectToMongoDB)("doctors");
            let admin = yield db.findOne({ email });
            return admin;
        });
    }
    static validateEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            const db = yield (0, connection_1.connectToMongoDB)("doctors");
            let doctor = yield db.findOne({ email });
            return doctor ? false : true;
        });
    }
}
exports.DoctorModel = DoctorModel;
