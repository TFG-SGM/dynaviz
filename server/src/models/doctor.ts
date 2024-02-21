import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";
import { PartialDoctor, Doctor } from "../utils/types";

export class DoctorModel {
  static async getAll() {
    const db = await connectToMongoDB("doctors");

    const doctors = await db.find({}).toArray();
    return doctors;
  }

  static async getById({ id }: { id: string }) {
    const db = await connectToMongoDB("doctors");
    const objectId = new ObjectId(id);

    const doctor = await db.findOne({ _id: objectId });
    return doctor;
  }

  static async create({ input }: { input: Doctor }) {
    const db = await connectToMongoDB("doctors");

    const { insertedId } = await db.insertOne(input);
    return { id: insertedId, ...input };
  }

  static async update({ id, input }: { id: string; input: PartialDoctor }) {
    const db = await connectToMongoDB("doctors");
    const objectId = new ObjectId(id);

    const updatedDoctor = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: "after" }
    );

    if (updatedDoctor) return updatedDoctor;
    return null;
  }

  static async delete({ id }: { id: string }) {
    const db = await connectToMongoDB("doctors");
    const objectId = new ObjectId(id);

    const { deletedCount } = await db.deleteOne({ _id: objectId });
    if (deletedCount > 0) return id;
    return null;
  }
}
