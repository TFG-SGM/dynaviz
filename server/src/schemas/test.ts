import z from "zod";
import { Test } from "../utils/types";

const testSchema = z.object({
  doctor: z.string(),
  date: z.string().transform((str) => new Date(str)),
  video: z.string(),
});

export function validateTest(input: Test) {
  return testSchema.safeParse(input);
}

export function validatePartialTest(input: Test) {
  return testSchema.partial().safeParse(input);
}
