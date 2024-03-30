import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";
import { PartialUser, User } from "../utils/types";
import { generateNumericId } from "../utils/helpers";

export class AdminModel {
  static async getAll() {
    const db = await connectToMongoDB("admins");

    const admins = await db.find({}).toArray();
    return admins;
  }

  static async getById({ id }: { id: string }) {
    const db = await connectToMongoDB("admins");
    const objectId = new ObjectId(id);

    const admin = await db.findOne({ _id: objectId });
    return admin;
  }

  static async create({ input }: { input: User }) {
    const db = await connectToMongoDB("admins");

    const numericId = await generateNumericId("admins");
    const formattedId = numericId.toString().padStart(8, "0") + "A";
    const userWithId = { ...input, uId: formattedId };

    const { insertedId } = await db.insertOne(userWithId);
    return { id: insertedId, ...userWithId };
  }

  static async update({ id, input }: { id: string; input: PartialUser }) {
    const db = await connectToMongoDB("admins");
    const objectId = new ObjectId(id);

    const updatedAdmin = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: "after" }
    );

    if (updatedAdmin) return updatedAdmin;
    return null;
  }

  static async delete({ id }: { id: string }) {
    const db = await connectToMongoDB("admins");
    const objectId = new ObjectId(id);

    const { deletedCount } = await db.deleteOne({ _id: objectId });
    if (deletedCount > 0) return id;
    return null;
  }

  static async findByEmail({ email }: { email: string }) {
    const db = await connectToMongoDB("admins");

    let admin = await db.findOne({ email });
    return admin;
  }

  static async validateEmail({ email }: { email: string }) {
    const db = await connectToMongoDB("admins");

    let admin = await db.findOne({ email });
    return admin ? false : true;
  }
}
