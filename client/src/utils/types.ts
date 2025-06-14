export type UserData = {
  uId?: string;
  _id: string;
  password: string;
  name: string;
  surname: string;
  date: string;
  age?: number;
  city: string;
  email: string;
  phone: string;
  role?: string;
  photo: { id: string; name: string };
  prevPhoto?: string;
  isPhotoChanged?: boolean;

  activityLevel?: activityLevel;
  occupation?: string;
  diagnosisYears?: number;
  isFibro?: boolean;
  weight?: number;
  height?: number;
  doctorId?: string;
};

export type DoctorAdminType = {
  uId?: string;
  _id: string;
  password: string;
  name: string;
  surname: string;
  date: string;
  age?: number;
  city: string;
  email: string;
  phone: string;
  role?: string;
  photo: { id: string; name: string };
  prevPhoto?: string;
  isPhotoChanged?: boolean;
};

export type activityLevel = "leve" | "moderado" | "activo";

export type PatientData = {
  uId?: string;
  _id: string;
  name: string;
  surname: string;
  date: string;
  age?: number;
  city: string;
  email: string;
  phone: string;
  password?: string;
  activityLevel: activityLevel;
  occupation: string;
  diagnosisYears: number;
  isFibro: boolean;
  weight: number;
  height: number;
  doctorId: string;
  photo: { id: string; name: string };
};

export type userActual = {
  action: string;
  userId: string | null;
};

export type axisData = "xAxis" | "yAxis";

export type testActual = {
  chart: string;
  axis: axisData;
  part1: string;
  part2: string;
};

export type evolutionActual = {
  chart: string;
  parts: string[];
};

export interface TestPartsData {
  [key: string]: {
    xAxis: {
      idealMovement: number[];
      realMovement: number[];
      variations: number[];
    };
    yAxis: {
      idealMovement: number[];
      realMovement: number[];
      variations: number[];
    };
    restriction: number;
  };
}

export interface TestSubData {
  time: number[];
  restriction: number;
  parts: TestPartsData;
}

export interface TestVideo {
  name: string;
  id: string;
}

export interface TestData {
  _id: string;
  doctorId: string;
  typeId: string;
  date: string;
  video: TestVideo;
  patientId: string;
  evaScale: number;
  data?: TestSubData;
}
export interface CreateTestData {
  _id: string;
  doctorId: string;
  typeId: string;
  date: string;
  video: File | string;
  patientId: string;
  evaScale: number;
  data: string;
}
export type dataTests = {
  typeId: string;
  video: string | File;
};
export interface ManyTestsData {
  _id: string;
  doctorId: string;
  date: string;
  patientId: string;
  evaScale: number;
  dataTests: { [key: number]: dataTests };
}

export interface TestTypeData {
  _id: string;
  name: string;
  bodyParts: string[];
}

export type Stroke = {
  u: number;
  v: number;
  color: string;
  size: number;
};

export type ModelPainted = {
  _id: string;
  patientId: string;
  date: string;
  strokes: Stroke[];
};

export type Colors = {
  [key: string]: {
    color: string;
    description: string;
    intensity: number;
    base: string;
  };
};

export type DeleteMenuState = {
  delete: () => void;
  message:
    | string
    | { color: string; description: string; intensity: number; base: string };
};

export type GeneralNoteType = {
  patient: string;
  doctor: string;
};

export interface Downloader3DRef {
  downloadPdfWithViews: (
    patient: PatientData,
    date: string,
    colors: Colors,
    generalNote: GeneralNoteType
  ) => void;
}
