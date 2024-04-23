import z from "zod";
import { Password } from "../utils/types";

const PasswordsSchema = z.object({
  old: z.string(),
  new1: z.string(),
  new2: z.string(),
});

export function validatePasswords(input: Password) {
  return PasswordsSchema.safeParse(input);
}
