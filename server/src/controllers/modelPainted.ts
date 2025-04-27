import { Request, Response } from "express";
import { ModelPaintedModel } from "../models/modelPainted";
import {
  validateModelPainted,
  validatePartialModelPainted,
} from "../schemas/modelPainted";
import { validatePartialPatient } from "../schemas/patient";

export class ModelPaintedController {
  static async getAll(req: Request, res: Response) {
    const { patientId, date, order } = req.query;

    const paintedModels = await ModelPaintedModel.getAll({
      patientId: patientId as string,
      date: date as string,
      order: order as string,
    });

    res.json(paintedModels);
  }

  static async getByPatientAndDate(req: Request, res: Response) {
    const { patientId, date } = req.params;
    const modelPainted = await ModelPaintedModel.getByPatientAndDate({
      patientId,
      date,
    });
    if (modelPainted) return res.json(modelPainted);
    res.status(404).json({ message: "Modelo no encontrado." });
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const modelPainted = await ModelPaintedModel.getById({ id });
    if (modelPainted) return res.json(modelPainted);
    res.status(404).json({ message: "Modelo no encontrado." });
  }

  static async create(req: Request, res: Response) {
    console.log(req.body);
    const result = validateModelPainted(req.body);
    console.log(result);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newModelPainted = await ModelPaintedModel.create({
      input: result.data,
    });
    res.json(newModelPainted);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = validatePartialModelPainted(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const updatedModelPainted = await ModelPaintedModel.update({
      id,
      input: result.data,
    });

    if (updatedModelPainted) return res.json(updatedModelPainted);
    res.status(404).json({ message: "Modelo no encontrado." });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ModelPaintedModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "Modelo no encontrado." });
  }

  static async deleteByPatient(req: Request, res: Response) {
    const { patientId } = req.params;
    const result = await ModelPaintedModel.deleteByPatient({ patientId });

    if (result) return res.json(result);
    res.status(404).json({ message: "Modelo no encontrado." });
  }
}
