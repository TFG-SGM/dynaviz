export const URL = "http://localhost:3000/";

export const ADMIN_ENDPOINT = "admin/";
export const DOCTOR_ENDPOINT = "doctor/";
export const PATIENT_ENDPOINT = "patient/";
export const TEST_ENDPOINT = "test/";
export const TEST_TYPE_ENDPOINT = "testType/";
export const ACTUAL_USER_ENDPOINT = "auth/user-data";

export const CHART_HEIGHT = "80%";

export const INITIAL_USER = {
  _id: "",
  name: "",
  surname: "",
  age: 0,
  city: "",
  email: "",
  phone: "",
  password: "",
};

export const INITIAL_PATIENT = {
  _id: "",
  name: "",
  surname: "",
  age: 0,
  city: "",
  email: "",
  phone: "",
  activityLevel: 0,
  occupation: "",
  diagnosisYears: 0,
  isFibro: false,
  doctorId: "",
};

export const INITIAL_TEST = {
  _id: "",
  doctorId: "",
  typeId: "",
  date: "",
  video: "",
  patientId: "",
  evaScale: 5,
};

export const TEST_TYPES = {
  0: {
    name: "Cerrar las piernas juntas",
    img: null,
    bodyParts: [
      "Dedo Gordo Pie Izquierdo",
      "Dedo Gordo Pie Derecho",
      "Rodilla Izquierda",
      "Rodilla Derecha",
    ],
  },
  1: { name: "Estiramiento simétrico", img: null, bodyParts: null },
  2: { name: "Estiramiento asimétrico", img: null, bodyParts: null },
  3: {
    name: "Arriba abajo a lo largo del eje vertical",
    img: null,
    bodyParts: null,
  },
  4: { name: "Movimientos laterales", img: null, bodyParts: null },
  5: { name: "De marcha", img: null, bodyParts: null },
};
