import z from "zod";
import { User } from "../utils/types";

const DoctorSchema = z.object({
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  date: z.string().transform((str) => new Date(str)),
  city: z.string(),
  email: z.string(),
  phone: z.string(),
});

export function validateDoctor(input: User) {
  return DoctorSchema.safeParse(input);
}

export function validatePartialDoctor(input: User) {
  return DoctorSchema.omit({ password: true }).partial().safeParse(input);
}
