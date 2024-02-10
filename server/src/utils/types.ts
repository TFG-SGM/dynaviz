export interface User {
  name: string;
  subName: string;
  age: number;
}

export interface PartialUser {
  name?: string | undefined;
  subName?: string | undefined;
  age?: number | undefined;
}
