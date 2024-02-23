import { AdminModel } from "../models/admin";
import { DoctorModel } from "../models/doctor";
import { hash } from "bcryptjs";

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
}
