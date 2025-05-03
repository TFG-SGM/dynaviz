import z from "zod";
import { Patient } from "../utils/types";

const patientSchema = z.object({
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  date: z.string().transform((str) => new Date(str)),
  city: z.string(),
  email: z.string(),
  phone: z.string(),
  weight: z.number(),
  height: z.number(),
  occupation: z.string(),
  activityLevel: z.string(),
  diagnosisYears: z.number(),
  isFibro: z.boolean(),
  doctorId: z.string(),
  photo: z
    .object({
      name: z.string().optional(),
      id: z.string().optional(),
    })
    .optional(),
});

export function validatePatient(input: Patient) {
  return patientSchema.safeParse(input);
}

export function validatePartialPatient(input: Patient) {
  return patientSchema.partial().safeParse(input);
}
