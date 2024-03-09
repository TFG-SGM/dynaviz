import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";
import { PartialTestType, TestType } from "../utils/types";

export class TestTypeModel {
  static async getAll() {
    const db = await connectToMongoDB("testTypes");

    const testTypes = await db.find({}).toArray();
    return testTypes;
  }

  static async getById({ id }: { id: string }) {
    const db = await connectToMongoDB("testTypes");
    const objectId = new ObjectId(id);

    const testType = await db.findOne({ _id: objectId });
    return testType;
  }

  static async create({ input }: { input: TestType }) {
    const db = await connectToMongoDB("testTypes");

    const { insertedId } = await db.insertOne(input);
    return { id: insertedId, ...input };
  }

  static async update({ id, input }: { id: string; input: PartialTestType }) {
    const db = await connectToMongoDB("testTypes");
    const objectId = new ObjectId(id);

    const updatedTestType = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: "after" }
    );

    if (updatedTestType) return updatedTestType;
    return null;
  }

  static async delete({ id }: { id: string }) {
    const db = await connectToMongoDB("testTypes");
    const objectId = new ObjectId(id);

    const { deletedCount } = await db.deleteOne({ _id: objectId });
    if (deletedCount > 0) return id;
    return null;
  }
}
