import { ObjectId } from "mongodb";
import { connectToMongoDB } from "../utils/connection";
import { PartialUser, User } from "../utils/types";

export class UserModel {
  static async getAll() {
    const db = await connectToMongoDB("users");

    const users = await db.find({}).toArray();
    return users;
  }

  static async getById({ id }: { id: string }) {
    const db = await connectToMongoDB("users");
    const objectId = new ObjectId(id);

    const user = await db.findOne({ _id: objectId });
    return user;
  }

  static async create({ input }: { input: User }) {
    const db = await connectToMongoDB("users");

    const { insertedId } = await db.insertOne(input);
    return { id: insertedId, ...input };
  }

  static async update({ id, input }: { id: string; input: PartialUser }) {
    const db = await connectToMongoDB("users");
    const objectId = new ObjectId(id);

    const updatedUser = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnDocument: "after" }
    );

    if (updatedUser) return updatedUser;
    return null;
  }

  static async delete({ id }: { id: string }) {
    const db = await connectToMongoDB("users");
    const objectId = new ObjectId(id);

    const { deletedCount } = await db.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }
}
