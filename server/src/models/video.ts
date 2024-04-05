import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";

export class VideoModel {
  static async getById({ id, range }: { id: string, range: string }) {
    const db = await connectToMongoDB("fs.files");

    db.findOne({}, (err, video) => {
      if (!video) {
        return;
      }

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
      const bucket = new mongodb.GridFSBucket(db);
      const downloadStream = bucket.openDownloadStreamByName('bigbuck', {
        start
      });

      // Finally pipe video to response
      downloadStream.pipe(res);
  }
}
