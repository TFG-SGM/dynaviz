import z from "zod";
import { Patient } from "../utils/types";

const patientSchema = z.object({
  name: z.string(),
  surname: z.string(),
  age: z.number(),
});

export function validatePatient(input: Patient) {
  return patientSchema.safeParse(input);
}

export function validatePartialPatient(input: Patient) {
  return patientSchema.partial().safeParse(input);
}
