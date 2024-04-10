export const ADMIN_ROLE = "admin";
export const DOCTOR_ROLE = "doctor";
const LOCAL_URL = "mongodb://localhost:27017/dynaviz";
export const MONGO_URL = process.env.DATABASE_URL ?? LOCAL_URL;
