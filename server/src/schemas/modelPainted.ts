import z from "zod";
import { ModelPainted } from "../utils/types";

const baseModelPaintedSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  generalNote: z.object({ patient: z.string(), doctor: z.string() }),
  patientId: z.string(),
  data: z.array(z.array(z.unknown())),
  colors: z.record(
    z.object({
      color: z.string(),
      description: z.string(),
      intensity: z.number(),
    })
  ),
});

const modelPaintedSchema = baseModelPaintedSchema.refine(
  (data) => {
    const colorValues = Object.values(data.colors).map((item) => item.color);
    return new Set(colorValues).size === colorValues.length; // Ensure no duplicate colors
  },
  {
    message: "No puede haber colores duplicados",
    path: ["colors"],
  }
);

export function validateModelPainted(input: ModelPainted) {
  return modelPaintedSchema.safeParse(input);
}

export function validatePartialModelPainted(input: ModelPainted) {
  const partialSchema = baseModelPaintedSchema.partial();
  return partialSchema.safeParse(input);
}
