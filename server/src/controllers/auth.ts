import { Request, Response } from "express";
import { AdminModel } from "../models/admin";
import { DoctorModel } from "../models/doctor";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { validateLogin } from "../schemas/login";
import { PatientModel } from "../models/patient";
import { ADMIN_ROLE, DOCTOR_ROLE, PATIENT_ROLE } from "../utils/constants";

export class AuthController {
  static async validateEmail(email: string) {
    const isEmailAdmin = await AdminModel.validateEmail({ email });
    const isEmailDoctor = await DoctorModel.validateEmail({
      email,
    });
    const isEmailPatient = await PatientModel.validateEmail({
      email,
    });

    return !(isEmailAdmin && isEmailDoctor && isEmailPatient);
  }

  static async hashPassword(password: string) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }

  static async getUserData(req: Request, res: Response) {
    const { role, email } = req.body.userData;
    let user = null;

    if (role === "admin") {
      user = await AdminModel.findByEmail({ email });
    } else if (role === "doctor") {
      user = await DoctorModel.findByEmail({ email });
    } else {
      user = await PatientModel.findByEmail({ email });
    }

    user = { ...user, role };
    res.json(user);
  }

  static async login(req: Request, res: Response) {
    try {
      const result = validateLogin(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const { email, password } = result.data;

      let user: {
        role: string;
        name?: string;
        email?: string;
        password?: string;
      } = { role: "" };

      const admin = await AdminModel.findByEmail({ email });
      const doctor = await DoctorModel.findByEmail({ email });
      const patient = await PatientModel.findByEmail({ email });

      if (admin) {
        user = { ...user, ...admin };
        user.role = ADMIN_ROLE;
      } else if (doctor) {
        user = { ...user, ...doctor };
        user.role = DOCTOR_ROLE;
      } else if (patient) {
        user = { ...user, ...patient };
        user.role = PATIENT_ROLE;
      } else {
        return res.status(404).json({
          message: "Usuario no encontrado.",
          success: false,
        });
      }

      const isMatch = await compare(password, user.password || "");
      if (isMatch) {
        const token = sign(
          {
            name: user.name,
            email: user.email,
            role: user.role,
          },
          process.env.APP_SECRET || "",
          { expiresIn: "3 days" }
        );

        const result = {
          name: user.name,
          email: user.email,
          role: user.role,
          token: token,
          expiresIn: 168,
        };

        return res.status(200).json({
          ...result,
          message: "Has iniciado sesión correctamente.",
        });
      } else {
        return res.status(403).json({
          message: "Contraseña incorrecta.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error interno de servidor.",
        success: false,
      });
    }
  }
}
