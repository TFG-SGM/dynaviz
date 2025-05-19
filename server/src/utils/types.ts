export interface Login {
  email: string;
  password: string;
}

export interface User {
  password: string;
  name: string;
  surname: string;
  date: Date;
  city: string;
  email: string;
  phone: string;
}

export interface PartialUser {
  password?: string | undefined;
  name?: string | undefined;
  surname?: string | undefined;
  date?: Date | undefined;
  city?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
}

export interface Patient {
  name: string;
  surname: string;
  date: Date;
  city: string;
  email: string;
  phone: string;
  weight: number;
  height: number;
  occupation: string;
  activityLevel: string;
  diagnosisYears: number;
  isFibro: boolean;
  doctorId: string;
}

export interface PartialPatient {
  name?: string | undefined;
  surname?: string | undefined;
  date?: Date | undefined;
  city?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  weight?: number | undefined;
  height?: number | undefined;
  occupation?: string | undefined;
  activityLevel?: string | undefined;
  diagnosisYears?: number | undefined;
  isFibro?: boolean | undefined;
  doctorId?: string | undefined;
}

export interface Test {
  doctorId: string;
  typeId: string;
  date: Date;
  video: object;
  patientId: string;
  evaScale: number;
  data: object;
}

export interface PartialTest {
  doctorId?: string | undefined;
  typeId?: string | undefined;
  date?: Date | undefined;
  video?: object | undefined;
  patientId?: string | undefined;
  evaScale?: number | undefined;
  data?: object | object;
}

export interface TestType {
  name: string;
  bodyParts: string[];
}

export interface PartialTestType {
  name?: string | undefined;
  bodyParts?: string[] | undefined;
}

export interface Password {
  old: string;
  new1: string;
  new2: string;
}

export interface ModelPainted {
  date: Date;
  generalNote: GeneralNote;
  patientId: string;
  data: Array<Array<any>>;
  colors: Colors;
}

export interface PartialModelPainted {
  date?: Date | undefined;
  GeneralNote?: GeneralNote;
  patientId?: string | undefined;
  data?: Array<Array<any>>;
  colors?: Colors;
}

export interface Colors {
  [key: string]: {
    color: string;
    description: string;
    intensity: number;
    base: string;
  };
}

export interface GeneralNote {
  patient: string;
  doctor: string;
}
