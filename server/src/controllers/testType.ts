import { Request, Response } from "express";
import { TestTypeModel } from "../models/testType";
import { validateTestType, validatePartialTestType } from "../schemas/testType";

export class TestTypeController {
  static async getAll(req: Request, res: Response) {
    const testTypes = await TestTypeModel.getAll();
    res.json(testTypes);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const testType = await TestTypeModel.getById({ id });
    if (testType) return res.json(testType);
    res.status(404).json({ message: "Prueba no encontrada." });
  }

  static async create(req: Request, res: Response) {
    const result = validateTestType(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newTestType = await TestTypeModel.create({ input: result.data });
    res.json(newTestType);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialTestType(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedTestType = await TestTypeModel.update({
      id,
      input: result.data,
    });
    return res.json(updatedTestType);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TestTypeModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "Prueba no encontrada." });
  }
}
