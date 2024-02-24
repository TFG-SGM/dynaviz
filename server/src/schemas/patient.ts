import z from "zod";
import { Patient } from "../utils/types";

const patientSchema = z.object({
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  bornDate: z.string().transform((str) => new Date(str)),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
});

export function validatePatient(input: Patient) {
  return patientSchema.safeParse(input);
}

export function validatePartialPatient(input: Patient) {
  return patientSchema.partial().safeParse(input);
}
