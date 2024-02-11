export interface User {
  name: string;
  surname: string;
  age: number;
}

export interface PartialUser {
  name?: string | undefined;
  surname?: string | undefined;
  age?: number | undefined;
}
