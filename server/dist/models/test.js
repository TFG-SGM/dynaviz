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
exports.TestModel = void 0;
const mongodb_1 = require("mongodb");
const connection_1 = require("../utils/connection");
class TestModel {
    static getById({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("tests");
            const objectId = new mongodb_1.ObjectId(id);
            const test = yield db.findOne({ _id: objectId });
            return test;
        });
    }
    static create({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("tests");
            const { insertedId } = yield db.insertOne(input);
            return Object.assign({ id: insertedId }, input);
        });
    }
    static update({ id, input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("tests");
            const objectId = new mongodb_1.ObjectId(id);
            const updatedTest = yield db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnDocument: "after" });
            if (updatedTest)
                return updatedTest;
            return null;
        });
    }
    static delete({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("tests");
            const objectId = new mongodb_1.ObjectId(id);
            const { deletedCount } = yield db.deleteOne({ _id: objectId });
            if (deletedCount > 0)
                return id;
            return null;
        });
    }
    static deleteByPatient({ patientId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("tests");
            const deletedTests = yield db.find({ patientId }).toArray();
            const deletedVideoIds = deletedTests.map((test) => test.video.id);
            const { deletedCount } = yield db.deleteMany({ patientId });
            if (deletedCount > 0)
                return deletedVideoIds;
            return null;
        });
    }
    static getAttributes({ attribute, patientId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("tests");
            const aggregationPipeline = [
                { $match: { patientId: patientId } },
                { $sort: { date: 1 } },
                {
                    $group: {
                        _id: "$" + attribute,
                    },
                },
            ];
            const distinctValues = yield db.aggregate(aggregationPipeline).toArray();
            const attributes = distinctValues.map((entry) => entry._id);
            return attributes;
        });
    }
    static getAll({ patientId, doctorId, typeId, date, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, connection_1.connectToMongoDB)("tests");
            const matchStage = {};
            if (patientId)
                matchStage.patientId = patientId;
            if (doctorId)
                matchStage.doctorId = doctorId;
            if (typeId)
                matchStage.typeId = typeId;
            if (date)
                matchStage.date = new Date(date);
            const aggregationPipeline = [
                { $match: matchStage },
                { $sort: { date: -1 } },
            ];
            const result = yield db.aggregate(aggregationPipeline).toArray();
            return result;
        });
    }
}
exports.TestModel = TestModel;
