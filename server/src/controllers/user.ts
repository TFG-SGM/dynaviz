import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { validateUser, validatePartialUser } from "../schemas/user";

export class UserController {
  static async getAll(req: Request, res: Response) {
    const users = await UserModel.getAll();
    res.json(users);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserModel.getById({ id });
    if (user) return res.json(user);
    res.status(404).json({ message: "Usuario no encontrado" });
  }

  static async create(req: Request, res: Response) {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await UserModel.create({ input: result.data });
    res.json(newUser);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedUser = await UserModel.update({ id, input: result.data });
    return res.json(updatedUser);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await UserModel.delete({ id });

    if (result) return res.json({ message: "Usuario eliminado" });
    res.status(404).json({ message: "Usuario no encontrado" });
  }
}
