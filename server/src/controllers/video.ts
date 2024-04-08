import { Request, Response } from "express";
import { getMongoDB } from "../utils/connection";
import { GridFSBucket, ObjectId } from "mongodb";

export class VideoController {
  static async getById(req: Request, res: Response) {
    const _id = new ObjectId(req.params.id);
    if (!_id) return res.status(400).send("Requiere id");

    const db = await getMongoDB();
    const fileMetadata = await db.collection("fs.files").findOne({ _id });

    if (!fileMetadata) return res.status(404).send("Video no encontrado");

    const videoSize = fileMetadata.length;

    const headers = {
      "Content-Length": videoSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, headers);

    const bucket = new GridFSBucket(db);
    const downloadStream = bucket.openDownloadStream(_id);

    downloadStream.pipe(res);
  }

  static async delete(req: Request, res: Response) {
    const _id = new ObjectId(req.params.id);
    if (!_id) return res.status(400).send("Requiere id");

    const db = await getMongoDB();
    const bucket = new GridFSBucket(db);

    await bucket.delete(_id);
  }
}
