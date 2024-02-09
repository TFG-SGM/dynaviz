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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = void 0;
const mongodb_1 = require("mongodb");
const DEFAULT_URL = "mongodb://localhost:27017";
const connectionSting = (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : DEFAULT_URL;
const client = new mongodb_1.MongoClient(connectionSting);
function connectToMongoDB(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("connected to db");
            yield client.connect();
            const database = client.db("dipamia");
            return database.collection(collection);
        }
        catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            throw error;
        }
    });
}
exports.connectToMongoDB = connectToMongoDB;
