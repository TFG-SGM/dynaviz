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
}
