import z from "zod";
import { User } from "../utils/types";

const adminSchema = z.object({
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  date: z.string().transform((str) => new Date(str)),
  city: z.string(),
  email: z.string(),
  phone: z.string(),
  photo: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .optional(),
});

export function validateAdmin(input: User) {
  return adminSchema.safeParse(input);
}

export function validatePartialAdmin(input: User) {
  return adminSchema.partial().safeParse(input);
}
