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
exports.VideoController = void 0;
const connection_1 = require("../utils/connection");
const mongodb_1 = require("mongodb");
class VideoController {
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongodb_1.ObjectId(req.params.id);
            if (!_id)
                return res.status(400).send("Requiere id");
            const db = yield (0, connection_1.getMongoDB)();
            const fileMetadata = yield db.collection("fs.files").findOne({ _id });
            if (!fileMetadata)
                return res.status(404).send("Video no encontrado");
            const videoSize = fileMetadata.length;
            const headers = {
                "Content-Length": videoSize,
                "Content-Type": "video/mp4",
            };
            res.writeHead(200, headers);
            const bucket = new mongodb_1.GridFSBucket(db);
            const downloadStream = bucket.openDownloadStream(_id);
            downloadStream.pipe(res);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongodb_1.ObjectId(req.params.id);
            if (!_id)
                return res.status(400).send("Requiere id");
            const db = yield (0, connection_1.getMongoDB)();
            const bucket = new mongodb_1.GridFSBucket(db);
            yield bucket.delete(_id);
        });
    }
}
exports.VideoController = VideoController;
