import z from "zod";
import { ModelPainted } from "../utils/types";

const modelPaintedSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  patientId: z.string(),
  data: z.array(z.array(z.unknown())),
  colors: z.record(
    z.object({
      color: z.string(),
      description: z.string(),
    })
  ),
});

export function validateModelPainted(input: ModelPainted) {
  return modelPaintedSchema.safeParse(input);
}

export function validatePartialModelPainted(input: ModelPainted) {
  return modelPaintedSchema.partial().safeParse(input);
}
