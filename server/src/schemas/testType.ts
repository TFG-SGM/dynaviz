import z from "zod";
import { PartialTestType, TestType } from "../utils/types";
import { BODY_PARTS } from "../utils/constants";

const testType = z.object({
  name: z.string(),
  bodyParts: z.array(z.enum(BODY_PARTS)),
});

export function validateTestType(input: TestType) {
  return testType.safeParse(input);
}

export function validatePartialTestType(input: PartialTestType) {
  return testType.partial().safeParse(input);
}
