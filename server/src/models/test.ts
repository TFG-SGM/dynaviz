import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";
import { PartialTest, Test } from "../utils/types";

export class TestModel {
  static async getAll() {
    const db = await connectToMongoDB("tests");

    const tests = await db.find({}).toArray();
    return tests;
  }

  static async getById({ id }: { id: string }) {
    const db = await connectToMongoDB("tests");
    const objectId = new ObjectId(id);

    const test = await db.findOne({ _id: objectId });
    return test;
  }

  static async create({ input }: { input: Test }) {
    const db = await connectToMongoDB("tests");

    const { insertedId } = await db.insertOne(input);
    return { id: insertedId, ...input };
  }

  static async update({ id, input }: { id: string; input: PartialTest }) {
    const db = await connectToMongoDB("tests");
    const objectId = new ObjectId(id);

    const updatedTest = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: "after" }
    );

    if (updatedTest) return updatedTest;
    return null;
  }

  static async delete({ id }: { id: string }) {
    const db = await connectToMongoDB("tests");
    const objectId = new ObjectId(id);

    const { deletedCount } = await db.deleteOne({ _id: objectId });
    if (deletedCount > 0) return id;
    return null;
  }
}
