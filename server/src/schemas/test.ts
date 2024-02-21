import z from "zod";
import { Test } from "../utils/types";

const testSchema = z.object({
  name: z.string(),
  surname: z.string(),
  age: z.number(),
});

export function validateTest(input: Test) {
  return testSchema.safeParse(input);
}

export function validatePartialTest(input: Test) {
  return testSchema.partial().safeParse(input);
}
