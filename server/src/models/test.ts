import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";
import { PartialTest, Test } from "../utils/types";

export class TestModel {
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

  static async deleteByPatient({ patientId }: { patientId: string }) {
    const db = await connectToMongoDB("tests");
    const deletedTests = await db.find({ patientId }).toArray();
    const deletedVideoIds = deletedTests.map((test) => test.video.id);

    const { deletedCount } = await db.deleteMany({ patientId });

    if (deletedCount > 0) return deletedVideoIds;
    return null;
  }

  static async getAttributes({
    attribute,
    patientId,
  }: {
    attribute: string;
    patientId: string;
  }) {
    const db = await connectToMongoDB("tests");

    const aggregationPipeline = [
      { $match: { patientId: patientId } },
      { $sort: { date: 1 } },
      {
        $group: {
          _id: "$" + attribute,
        },
      },
    ];

    const distinctValues = await db.aggregate(aggregationPipeline).toArray();
    const attributes = distinctValues.map((entry) => entry._id);
    return attributes;
  }

  static async getAll({
    patientId,
    doctorId,
    typeId,
    date,
    order,
  }: {
    patientId: string;
    doctorId: string;
    typeId: string;
    date: string;
    order?: string;
  }) {
    const db = await connectToMongoDB("tests");
    const dateOrder = order ? 1 : -1;

    const matchStage: any = {};
    if (patientId) matchStage.patientId = patientId;
    if (doctorId) matchStage.doctorId = doctorId;
    if (typeId) matchStage.typeId = typeId;
    if (date) matchStage.date = new Date(date);

    const aggregationPipeline = [
      { $match: matchStage },
      { $sort: { date: dateOrder } },
    ];

    const result = await db.aggregate(aggregationPipeline).toArray();
    return result;
  }
}
