export type UserData = {
  _id: string;
  password: string;
  name: string;
  surname: string;
  bornDate: string;
  address: string;
  email: string;
  phone: string;
  role?: string;
};

export type actual = {
  action: string;
  userId: string | null;
};

export interface TestPartsData {
  [key: string]: {
    idealAngles: number[];
    realAngles: number[];
    problem: number;
  };
}

export interface TestSubData {
  time: number[];
  probability: number;
  problem: number;
  parts: TestPartsData;
}

export interface TestData {
  _id: string;
  doctor: string;
  type: string;
  date: string;
  video: string;
  patientId: string;
  data: TestSubData;
}

export interface TestTypeData {
  _id: string;
  name: string;
  bodyParts: string[];
}
