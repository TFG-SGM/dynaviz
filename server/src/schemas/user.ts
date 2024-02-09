import z from "zod";
import { User } from "../utils/types";

const userSchema = z.object({
  name: z.string(),
  subName: z.string(),
  age: z.number(),
});

export function validateUser(input: User) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input: User) {
  return userSchema.partial().safeParse(input);
}
