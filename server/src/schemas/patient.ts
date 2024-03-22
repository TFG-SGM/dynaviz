import z from "zod";
import { Patient } from "../utils/types";

const patientSchema = z.object({
  name: z.string(),
  surname: z.string(),
  age: z.number(),
  city: z.string(),
  email: z.string(),
  phone: z.number(),
  occupation: z.string(),
  activityLevel: z.number(),
  diagnosisYears: z.number(),
  isFibro: z.boolean(),
  doctorId: z.string(),
});

export function validatePatient(input: Patient) {
  return patientSchema.safeParse(input);
}

export function validatePartialPatient(input: Patient) {
  return patientSchema.partial().safeParse(input);
}
