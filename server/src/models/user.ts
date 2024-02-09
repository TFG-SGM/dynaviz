import { connectToMongoDB } from "../utils/connection";
import { User } from "../utils/types";

export class UserModel {
  static async getAll() {
    const db = await connectToMongoDB("users");
    const users = db.find({}).toArray();
    return users;
  }

  static async getById() {}

  static async create({ input }: { input: User }) {
    const db = await connectToMongoDB("users");
    db.insertOne(input);
  }

  static async update() {}

  static async delete() {}
}
