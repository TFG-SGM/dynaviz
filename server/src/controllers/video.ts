import { Request, Response } from "express";
import { TestModel } from "../models/test";
import { VideoModel } from "../models/video";
import { connectToMongoDB } from "../utils/connection";
import { Db, GridFSBucket } from "mongodb";

export class VideoController {
  static async getById(req: Request, res: Response) {
    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const db = (await connectToMongoDB()) as Db;
    db.collection("fs.files").findOne({}, (err, video) => {
      if (!video) {
        res.status(404).send("No video uploaded!");
        return;
      }

      // Create response headers
      const videoSize = video.length;
      const start = Number(range.replace(/\D/g, ""));
      const end = videoSize - 1;

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      // Get the bucket and download stream from GridFS
      const bucket = new GridFSBucket(db);
      const downloadStream = bucket.openDownloadStreamByName("bigbuck", {
        start,
      });

      // Finally pipe video to response
      downloadStream.pipe(res);
    });
  }

  static async delete(req: Request, res: Response) {}
}
