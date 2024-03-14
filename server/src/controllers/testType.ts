import { Request, Response } from "express";
import { TestTypeModel } from "../models/testType";

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
}
