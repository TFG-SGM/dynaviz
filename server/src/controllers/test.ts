import { Request, Response } from "express";
import { TestModel } from "../models/test";
import { validateTest, validatePartialTest } from "../schemas/test";

export class TestController {
  static async getAll(req: Request, res: Response) {
    const tests = await TestModel.getAll();
    res.json(tests);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const test = await TestModel.getById({ id });
    if (test) return res.json(test);
    res.status(404).json({ message: "user not found" });
  }

  static async create(req: Request, res: Response) {
    console.log(req.body);

    const result = validateTest(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await TestModel.create({ input: result.data });
    res.json(newUser);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialTest(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedUser = await TestModel.update({ id, input: result.data });
    return res.json(updatedUser);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TestModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "user not found" });
  }
}
