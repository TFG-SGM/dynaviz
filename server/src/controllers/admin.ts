import { Request, Response } from "express";
import { AdminModel } from "../models/admin";
import { validateAdmin, validatePartialAdmin } from "../schemas/admin";

export class AdminController {
  static async getAll(req: Request, res: Response) {
    const admins = await AdminModel.getAll();
    res.json(admins);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const admin = await AdminModel.getById({ id });
    if (admin) return res.json(admin);
    res.status(404).json({ message: "user not found" });
  }

  static async create(req: Request, res: Response) {
    console.log(req.body);

    const result = validateAdmin(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await AdminModel.create({ input: result.data });
    res.json(newUser);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialAdmin(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedUser = await AdminModel.update({ id, input: result.data });
    return res.json(updatedUser);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await AdminModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "user not found" });
  }
}
