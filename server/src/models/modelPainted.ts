import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";
import { ModelPainted, PartialModelPainted } from "../utils/types";

export class ModelPaintedModel {
  static async getById({ id }: { id: string }) {
    const db = await connectToMongoDB("modelPainted");
    const objectId = new ObjectId(id);

    const modelPainted = await db.findOne({ _id: objectId });
    return modelPainted;
  }

  static async create({ input }: { input: ModelPainted }) {
    const db = await connectToMongoDB("modelPainted");

    const inputDate = new Date(input.date);
    const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));

    const existingModel = await db.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingModel) {
      const objectId = new ObjectId(existingModel._id);
      const updatedModel = await db.findOneAndUpdate(
        { _id: objectId },
        { $set: input },
        { returnDocument: "after" }
      );

      return updatedModel.value;
    }

    const { insertedId } = await db.insertOne(input);
    return { id: insertedId, ...input };
  }

  static async update({
    id,
    input,
  }: {
    id: string;
    input: PartialModelPainted;
  }) {
    const db = await connectToMongoDB("modelPainted");
    const objectId = new ObjectId(id);

    const updatedModelPainted = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: "after" }
    );

    if (updatedModelPainted) return updatedModelPainted;
    return null;
  }

  static async delete({ id }: { id: string }) {
    const db = await connectToMongoDB("modelPainted");
    const objectId = new ObjectId(id);

    const { deletedCount } = await db.deleteOne({ _id: objectId });
    if (deletedCount > 0) return id;
    return null;
  }

  static async deleteByPatient({ patientId }: { patientId: string }) {
    const db = await connectToMongoDB("modelPainted");
    const deletedTests = await db.find({ patientId }).toArray();
    const deletedVideoIds = deletedTests.map((test) => test.video.id);

    const { deletedCount } = await db.deleteMany({ patientId });

    if (deletedCount > 0) return deletedVideoIds;
    return null;
  }

  static async getByPatientAndDate({
    patientId,
    date,
  }: {
    patientId: string;
    date: string;
  }) {
    const db = await connectToMongoDB("modelPainted");
    const inputDate = new Date(date);
    const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));

    const model = await db.findOne({
      patientId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!model) return null;

    return model;
  }

  static async getByPatientId({ patientId }: { patientId: string }) {
    const db = await connectToMongoDB("modelPainted");
    const model = await db.find({ patientId }).toArray();
    if (model.length === 0) return null;
    return model;
  }

  static async getAll({
    patientId,
    date,
    order,
  }: {
    patientId: string;
    date: string;
    order?: string;
  }) {
    const db = await connectToMongoDB("modelPainted");
    const dateOrder = order ? 1 : -1;

    const matchStage: any = {};
    if (patientId) matchStage.patientId = patientId;
    if (date) matchStage.date = new Date(date);

    const aggregationPipeline = [
      { $match: matchStage },
      { $sort: { date: dateOrder } },
    ];

    const result = await db.aggregate(aggregationPipeline).toArray();
    return result;
  }
}
