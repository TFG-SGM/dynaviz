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
    res.status(404).json({ message: "Prueba no encontrada." });
  }

  static async create(req: Request, res: Response) {
    const result = validateTest(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newTest = await TestModel.create({ input: result.data });
    res.json(newTest);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialTest(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedTest = await TestModel.update({ id, input: result.data });
    return res.json(updatedTest);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TestModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "Prueba no encontrada." });
  }
}
