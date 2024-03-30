export type UserData = {
  uId?: string;
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
  uId?: string;
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
  weight: number;
  height: number;
  doctorId: string;
};

export type userActual = {
  action: string;
  userId: string | null;
};

export type testActual = {
  chart: string;
  part1: string;
  part2: string;
};

export type evolutionActual = {
  chart: string;
  parts: string[];
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

export interface ManyTestsData {
  _id: string;
  doctorId: string;
  date: string;
  patientId: string;
  evaScale: number;
  dataTests: {
    [key: number]: { typeId: string; video: string };
  };
}

export interface TestTypeData {
  _id: string;
  name: string;
  bodyParts: string[];
}
