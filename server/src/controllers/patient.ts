import { Request, Response } from "express";
import { PatientModel } from "../models/patient";
import { validatePatient, validatePartialPatient } from "../schemas/patient";
import { AuthController } from "./auth";

export class PatientController {
  static async getAll(req: Request, res: Response) {
    const { doctorId } = req.query;
    const patients = await PatientModel.getAll({
      doctorId: doctorId as string,
    });
    res.json(patients);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const patient = await PatientModel.getById({ id });
    if (patient) return res.json(patient);
    res.status(404).json({ message: "Paciente no encontrado." });
  }

  static async create(req: Request, res: Response) {
    const result = validatePatient(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const isEmail = await AuthController.validateEmail(result.data.email);
    if (isEmail) {
      return res.status(400).json({
        message: `El correo ya está registrado.`,
      });
    }

    const newPatient = await PatientModel.create({ input: result.data });
    res.json(newPatient);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialPatient(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const existingPatient = await PatientModel.getById({ id });

    if (!existingPatient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    if (result.data.email && result.data.email !== existingPatient.email) {
      const isEmail = await AuthController.validateEmail(result.data.email);
      if (isEmail) {
        return res.status(400).json({
          message: `El correo ya está registrado.`,
        });
      }
    }

    const updatedPatient = await PatientModel.update({
      id,
      input: result.data,
    });
    return res.json(updatedPatient);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await PatientModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "Paciente no encontrado." });
  }
}
