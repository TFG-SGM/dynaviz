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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoDB = exports.connectToMongoDB = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("./constants");
dotenv_1.default.config();
const connectionSting = constants_1.MONGO_URL;
console.log(connectionSting);
const client = new mongodb_1.MongoClient(connectionSting);
function connectToMongoDB(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const database = client.db();
            return database.collection(collection);
        }
        catch (error) {
            console.error("Fallo al conectar con MongoDB:", error);
            throw error;
        }
    });
}
exports.connectToMongoDB = connectToMongoDB;
function getMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            return client.db();
        }
        catch (error) {
            console.error("Fallo al conectar con MongoDB:", error);
            throw error;
        }
    });
}
exports.getMongoDB = getMongoDB;