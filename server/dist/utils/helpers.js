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
exports.getLastNumericIdFromDatabase = exports.generateNumericId = void 0;
const connection_1 = require("./connection");
function generateNumericId(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        const lastUid = yield getLastNumericIdFromDatabase(collection);
        const nextUid = lastUid + 1;
        return nextUid;
    });
}
exports.generateNumericId = generateNumericId;
function getLastNumericIdFromDatabase(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.connectToMongoDB)(collection);
        const lastUser = yield db.findOne({}, { sort: { uId: -1 } });
        if (lastUser && lastUser.uId) {
            const lastNumericUid = parseInt(lastUser.uId.substring(0, 8), 10);
            return lastNumericUid;
        }
        else {
            return 0;
        }
    });
}
exports.getLastNumericIdFromDatabase = getLastNumericIdFromDatabase;