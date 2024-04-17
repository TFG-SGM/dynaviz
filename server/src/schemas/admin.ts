import z from "zod";
import { User } from "../utils/types";

const adminSchema = z.object({
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  age: z.number(),
  city: z.string(),
  email: z.string(),
  phone: z.string(),
});

export function validateAdmin(input: User) {
  return adminSchema.safeParse(input);
}

export function validatePartialAdmin(input: User) {
  return adminSchema.partial().safeParse(input);
}
