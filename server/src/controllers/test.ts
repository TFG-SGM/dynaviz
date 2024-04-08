import { Request, Response } from "express";
import { TestModel } from "../models/test";
import { validateTest, validatePartialTest } from "../schemas/test";

export class TestController {
  static async getAll(req: Request, res: Response) {
    const { patientId, doctorId, typeId, date } = req.query;

    const tests = await TestModel.getAll({
      patientId: patientId as string,
      typeId: typeId as string,
      doctorId: doctorId as string,
      date: date as string,
    });

    res.json(tests);
  }

  static async getAttributes(req: Request, res: Response) {
    const { attribute, patientId } = req.query;

    const attributes = await TestModel.getAttributes({
      attribute: attribute as string,
      patientId: patientId as string,
    });

    res.json(attributes);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const test = await TestModel.getById({ id });
    if (test) return res.json(test);
    res.status(404).json({ message: "Prueba no encontrada." });
  }

  static async create(req: Request, res: Response) {
    console.log(req.file);
    req.body = {
      ...req.body,
      evaScale: parseInt(req.body.evaScale),
      data: JSON.parse(req.body.data),
      video: { name: req.file?.originalname, id: req.file?.id.toString() },
    };
    console.log(req.body);

    const result = validateTest(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newTest = await TestModel.create({ input: result.data });
    res.json(newTest);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TestModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "Prueba no encontrada." });
  }

  static async deleteByPatient(req: Request, res: Response) {
    const { patientId } = req.params;
    const result = await TestModel.deleteByPatient({ patientId });

    if (result) return res.json(result);
    res.status(404).json({ message: "Prueba no encontrada." });
  }
}
