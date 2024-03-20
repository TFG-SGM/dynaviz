import z from "zod";
import { Test } from "../utils/types";

const testSchema = z.object({
  doctorId: z.string(),
  typeId: z.string(),
  date: z.string().transform((str) => new Date(str)),
  video: z.string(),
  patientId: z.string(),
  evaScale: z.number(),
  data: z.object({
    time: z.array(z.number()),
    restriction: z.number(),
    parts: z.unknown(),
  }),
});

export function validateTest(input: Test) {
  return testSchema.safeParse(input);
}

export function validatePartialTest(input: Test) {
  return testSchema.partial().safeParse(input);
}
