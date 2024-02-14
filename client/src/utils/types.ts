import { Dispatch, FormEvent, SetStateAction } from "react";

export interface UserData {
  _id: string;
  name: string;
  surname: string;
  age: number;
}

export interface CreatedUserData {
  name: string;
  surname: string;
  age: number;
}

export type HookData<T> = [T | null, Dispatch<SetStateAction<T | null>>];

export interface UserFormProps<T> {
  userData: T | null;
  setUserData: Dispatch<SetStateAction<T | null>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  action: string;
}

export interface CreateUserFormProps {
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
}

export interface UpdateUserFormProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string | null>>;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
}
