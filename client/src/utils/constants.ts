import { activityLevel } from "./types";

export const URL = import.meta.env.VITE_SERVER_URL ?? "http://localhost:3000/";

export const ADMIN_ENDPOINT = "admin/";
export const DOCTOR_ENDPOINT = "doctor/";
export const PATIENT_ENDPOINT = "patient/";
export const TEST_ENDPOINT = "test/";
export const TEST_TYPE_ENDPOINT = "testType/";
export const ACTUAL_USER_ENDPOINT = "auth/user-data";
export const FILE_ENDPOINT = "file/";
export const VIDEO_TYPE = "?type=video";
export const IMAGE_TYPE = "?type=image";
export const CHART_HEIGHT = "500px";

export const ROTATE_MODE = "rotation";
export const DRAWING_MODE = "drawing";

export const INITIAL_USER = {
  _id: "",
  name: "",
  surname: "",
  date: "",
  city: "",
  email: "",
  phone: "",
  password: "",
  photo: { id: "", name: "" },
};

export const INITIAL_PATIENT = {
  _id: "",
  name: "",
  surname: "",
  date: "",
  city: "",
  email: "",
  phone: "",
  password: "",
  weight: 0,
  height: 0,
  activityLevel: "leve" as activityLevel,
  occupation: "",
  diagnosisYears: 0,
  isFibro: false,
  doctorId: "",
  photo: { id: "", name: "" },
};

export const INITIAL_TEST = {
  _id: "",
  doctorId: "",
  date: "",
  evaScale: 5,
  patientId: "",
  dataTests: {
    0: { typeId: "", video: "" },
  },
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

export const COLORS = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
  orange: "#ffa500",
  purple: "#800080",
  teal: "#008080",
  yellow: "#ffff00",
  brown: "#8b4513",
  pink: "#ff69b4",
};
