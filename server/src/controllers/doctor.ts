import { Request, Response } from "express";
import { DoctorModel } from "../models/doctor";
import { validateDoctor, validatePartialDoctor } from "../schemas/doctor";
import { AuthController } from "./auth";
import { validatePasswords } from "../schemas/passwords";
import { compare } from "bcryptjs";

export class DoctorController {
  static async getAll(req: Request, res: Response) {
    const doctors = await DoctorModel.getAll();
    res.json(doctors);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const doctor = await DoctorModel.getById({ id });
    if (doctor) return res.json(doctor);
    res.status(404).json({ message: "Médico no encontrado." });
  }

  static async create(req: Request, res: Response) {
    req.body = {
      ...req.body,
      photo: { name: req.file?.originalname, id: req.file?.id.toString() },
    };

    const result = validateDoctor(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const isEmail = await AuthController.validateEmail(result.data.email);
    if (isEmail) {
      return res.status(400).json({
        message: `El correo ya está registrado.`,
      });
    }

    result.data.password = await AuthController.hashPassword(
      result.data.password
    );

    const newDoctor = await DoctorModel.create({ input: result.data });
    res.json(newDoctor);
  }

  static async update(req: Request, res: Response) {
    if (req.body.isPhotoChanged) {
      req.body = {
        ...req.body,
        photo: { name: req.file?.originalname, id: req.file?.id.toString() },
      };
    } else {
      delete req.body.photo;
    }

    const result = validatePartialDoctor(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const existingDoctor = await DoctorModel.getById({ id });

    if (!existingDoctor) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }

    if (result.data.email && result.data.email !== existingDoctor.email) {
      const isEmail = await AuthController.validateEmail(result.data.email);
      if (isEmail) {
        return res.status(400).json({
          message: `El correo ya está registrado.`,
        });
      }
    }

    const updatedDoctor = await DoctorModel.update({ id, input: result.data });
    return res.json(updatedDoctor);
  }

  static async updatePass(req: Request, res: Response) {
    const result = validatePasswords(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const existingDoctor = await DoctorModel.getById({ id });

    if (!existingDoctor) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }

    if (result.data.new1 !== result.data.new2) {
      return res.status(404).json({ message: "Las contraseñas no coinciden" });
    }

    let isMatch = await compare(result.data.old, existingDoctor.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }

    isMatch = await compare(result.data.new1, existingDoctor.password);

    if (isMatch) {
      return res
        .status(404)
        .json({ message: "La contraseña antigua y nueva son las mismas" });
    }

    const password = await AuthController.hashPassword(result.data.new1);

    const updatedDoctor = await DoctorModel.update({
      id,
      input: { password },
    });

    return res.json(updatedDoctor);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await DoctorModel.delete({ id });

    if (result) return res.json(result);
    res.status(404).json({ message: "Doctor no encontrado." });
  }
}
