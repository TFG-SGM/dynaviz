import { Request, Response } from "express";
import { DoctorModel } from "../models/doctor";
import { validateDoctor, validatePartialDoctor } from "../schemas/doctor";

export class DoctorController {
  static async getAll(req: Request, res: Response) {
    const doctors = await DoctorModel.getAll();
    res.json(doctors);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const doctor = await DoctorModel.getById({ id });
    if (doctor) return res.json(doctor);
    res.status(404).json({ message: "user not found" });
  }

  static async create(req: Request, res: Response) {
    console.log(req.body);

    const result = validateDoctor(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newUser = await DoctorModel.create({ input: result.data });
    res.json(newUser);
  }

  static async update(req: Request, res: Response) {
    const result = validatePartialDoctor(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedUser = await DoctorModel.update({ id, input: result.data });
    return res.json(updatedUser);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await DoctorModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "user not found" });
  }
}
