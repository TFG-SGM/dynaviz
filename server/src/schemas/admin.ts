import z from "zod";
import { Admin } from "../utils/types";

const adminSchema = z.object({
  name: z.string(),
  surname: z.string(),
  age: z.number(),
});

export function validateAdmin(input: Admin) {
  return adminSchema.safeParse(input);
}

export function validatePartialAdmin(input: Admin) {
  return adminSchema.partial().safeParse(input);
}
