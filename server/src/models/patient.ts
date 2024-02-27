import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";
import { PartialPatient, PartialUser, Patient, User } from "../utils/types";

export class PatientModel {
  static async getAll() {
    const db = await connectToMongoDB("patients");

    const patients = await db.find({}).toArray();
    return patients;
  }

  static async getById({ id }: { id: string }) {
    const db = await connectToMongoDB("patients");
    const objectId = new ObjectId(id);

    const patient = await db.findOne({ _id: objectId });
    return patient;
  }

  static async create({ input }: { input: Patient }) {
    const db = await connectToMongoDB("patients");

    input = { ...input, tests: [] };
    const { insertedId } = await db.insertOne(input);
    return { id: insertedId, ...input };
  }

  static async update({ id, input }: { id: string; input: PartialPatient }) {
    const db = await connectToMongoDB("patients");
    const objectId = new ObjectId(id);

    const updatedPatient = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: "after" }
    );

    if (updatedPatient) return updatedPatient;
    return null;
  }

  static async delete({ id }: { id: string }) {
    const db = await connectToMongoDB("patients");
    const objectId = new ObjectId(id);

    const { deletedCount } = await db.deleteOne({ _id: objectId });
    if (deletedCount > 0) return id;
    return null;
  }

  static async validateEmail({ email }: { email: string }) {
    const db = await connectToMongoDB("patients");

    let patient = await db.findOne({ email });
    return patient ? false : true;
  }
}
