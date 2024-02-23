export interface Patient {
  name: string;
  surname: string;
  age: number;
}

export interface PartialPatient {
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
}

export interface Doctor {
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
}

export interface PartialDoctor {
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

export interface Admin {
  name: string;
  surname: string;
  age: number;
  email: string;
  password: string;
}

export interface PartialAdmin {
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

export interface Test {
  name: string;
  surname: string;
  age: number;
}

export interface PartialTest {
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
}
