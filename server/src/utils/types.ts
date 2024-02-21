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
}

export interface PartialDoctor {
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
}

export interface Admin {
  name: string;
  surname: string;
  age: number;
}

export interface PartialAdmin {
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
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
