import { Request, Response } from "express";
import { AdminModel } from "../models/admin";
import { DoctorModel } from "../models/doctor";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  static async validateGmail(email: string) {
    const isEmailAdmin = await AdminModel.validateEmail({ email });
    const isEmailDoctor = await DoctorModel.validateEmail({
      email,
    });

    return !(isEmailAdmin && isEmailDoctor);
  }

  static async hashPassword(password: string) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      let user: {
        role: string;
        name?: string;
        email?: string;
        password?: string;
      } = { role: "" };

      const admin = await AdminModel.findByEmail({ email });
      const doctor = await DoctorModel.findByEmail({ email });

      if (admin) {
        user = { ...user, ...admin };
        user.role = "admin";
      } else if (doctor) {
        user = { ...user, ...doctor };
        user.role = "doctor";
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
          process.env.APP_SECRET || "", // Ensure APP_SECRET is defined in your environment
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
          message: "Has iniciado sesión.",
        });
      } else {
        return res.status(403).json({
          message: "Contraseña incorrecta.",
        });
      }
    } catch (error) {
      console.error("Error in loginUser:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  }
}
