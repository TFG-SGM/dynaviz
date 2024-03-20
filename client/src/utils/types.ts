export type UserData = {
  _id: string;
  password: string;
  name: string;
  surname: string;
  age: number;
  city: string;
  email: string;
  phone: string;
  role?: string;
};

export type PatientData = {
  _id: string;
  name: string;
  surname: string;
  age: number;
  city: string;
  email: string;
  phone: string;
  activityLevel: number;
  occupation: string;
  diagnosisYears: number;
  isFibro: boolean;
  assignedDoctor: string;
};

export type actual = {
  action: string;
  userId: string | null;
};

export interface TestPartsData {
  [key: string]: {
    idealMovement: number[];
    realMovement: number[];
    variations: number[];
    restriction: number;
  };
}

export interface TestSubData {
  time: number[];
  restriction: number;
  parts: TestPartsData;
}

export interface TestData {
  _id: string;
  doctorId: string;
  typeId: string;
  date: string;
  video: string;
  patientId: string;
  evaScale: number;
  data?: TestSubData;
}

export interface TestTypeData {
  _id: string;
  name: string;
  bodyParts: string[];
}
