import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { validateUser, validatePartialUser } from "../schemas/user";

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await UserModel.getAll();
    res.send(users);
  }

  static async create(req: Request, res: Response) {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await UserModel.create({ input: result.data });
    res.status(201).json(newUser);
  }
}
