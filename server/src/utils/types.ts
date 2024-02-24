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
  phone: string;
}

export interface PartialUser {
  password?: string | undefined;
  name?: string | undefined;
  surname?: string | undefined;
  bornDate?: Date | undefined;
  address?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
}

export interface Test {
  doctor: string;
  date: Date;
  video: string;
}

export interface PartialTest {
  doctor?: string | undefined;
  date?: Date | undefined;
  video?: string | undefined;
}
