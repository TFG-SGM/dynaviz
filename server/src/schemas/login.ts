import z from "zod";
import { Login } from "../utils/types";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function validateLogin(input: Login) {
  return loginSchema.safeParse(input);
}
