import dotenv from "dotenv";

dotenv.config();

export const ADMIN_ROLE = "admin";
export const DOCTOR_ROLE = "doctor";
export const MONGO_URL =
  process.env.DATABASE_URL ?? "mongodb://localhost:27017/dynaviz";
