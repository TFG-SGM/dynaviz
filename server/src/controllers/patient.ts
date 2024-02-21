import { Request, Response } from "express";
import { PatientModel } from "../models/patient";
import { validatePatient, validatePartialPatient } from "../schemas/patient";

export class PatientController {
  static async getAll(req: Request, res: Response) {
    const patients = await PatientModel.getAll();
    res.json(patients);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const patient = await PatientModel.getById({ id });
    if (patient) return res.json(patient);
    res.status(404).json({ message: "user not found" });
  }

  static async create(req: Request, res: Response) {
    console.log(req.body);

    const result = validatePatient(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await PatientModel.create({ input: result.data });
    res.json(newUser);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialPatient(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedUser = await PatientModel.update({ id, input: result.data });
    return res.json(updatedUser);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await PatientModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "user not found" });
  }
}
