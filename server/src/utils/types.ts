export interface Login {
  email: string;
  password: string;
}

export interface User {
  password: string;
  name: string;
  surname: string;
  age: number;
  city: string;
  email: string;
  phone: number;
}

export interface PartialUser {
  password?: string | undefined;
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
  city?: string | undefined;
  email?: string | undefined;
  phone?: number | undefined;
}

export interface Patient {
  name: string;
  surname: string;
  age: number;
  city: string;
  email: string;
  phone: number;
  occupation: string;
  activityLevel: number;
  diagnosisYears: number;
  isFibro: boolean;
  assignedDoctor: string;
}

export interface PartialPatient {
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
  city?: string | undefined;
  email?: string | undefined;
  phone?: number | undefined;
  occupation?: string | undefined;
  activityLevel?: number | undefined;
  diagnosisYears?: number | undefined;
  isFibro?: boolean | undefined;
  assignedDoctor?: string | undefined;
}

export interface Test {
  doctorId: string;
  typeId: string;
  date: Date;
  video: string;
  patientId: string;
  evaScale: number;
  data: object;
}

export interface PartialTest {
  doctorId?: string | undefined;
  typeId?: string | undefined;
  date?: Date | undefined;
  video?: string | undefined;
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
