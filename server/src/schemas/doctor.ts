import z from "zod";
import { Patient } from "../utils/types";

const DoctorSchema = z.object({
  name: z.string(),
  surname: z.string(),
  age: z.number(),
});

export function validateDoctor(input: Patient) {
  return DoctorSchema.safeParse(input);
}

export function validatePartialDoctor(input: Patient) {
  return DoctorSchema.partial().safeParse(input);
}
