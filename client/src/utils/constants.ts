export const URL = "http://localhost:3000/";

export const ADMIN_ENDPOINT = "admin/";
export const DOCTOR_ENDPOINT = "doctor/";
export const PATIENT_ENDPOINT = "patient/";
export const TEST_ENDPOINT = "test/";

export const INITIAL_USER = {
  _id: "",
  name: "",
  surname: "",
  bornDate: "",
  address: "",
  email: "",
  phone: "",
  password: "",
};

export const INITIAL_TEST = {
  _id: "",
  doctor: "",
  type: "",
  date: "",
  video: "",
};

export const TEST_TYPES = [
  "Cerrar las piernas juntas",
  "Estiramiento simétrico",
  "Estiramiento asimétrico",
  "Arriba abajo a lo largo del eje vertical",
  "Movimientos laterales",
  "De marcha",
];
