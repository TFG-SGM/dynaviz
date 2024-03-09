export interface Login {
  email: string;
  password: string;
}

export interface User {
  password: string;
  name: string;
  surname: string;
  bornDate: Date;
  address: string;
  email: string;
  phone: number;
}

export interface PartialUser {
  password?: string | undefined;
  name?: string | undefined;
  surname?: string | undefined;
  bornDate?: Date | undefined;
  address?: string | undefined;
  email?: string | undefined;
  phone?: number | undefined;
}

export interface Patient {
  name: string;
  surname: string;
  bornDate: Date;
  address: string;
  email: string;
  phone: number;
}

export interface PartialPatient {
  name?: string | undefined;
  surname?: string | undefined;
  bornDate?: Date | undefined;
  address?: string | undefined;
  email?: string | undefined;
  phone?: number | undefined;
}

export interface Test {
  doctor: string;
  type: string;
  date: Date;
  video: string;
  patientId: string;
  data: object;
}

export interface PartialTest {
  doctor?: string | undefined;
  type?: string | undefined;
  date?: Date | undefined;
  video?: string | undefined;
  patientId?: string | undefined;
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
