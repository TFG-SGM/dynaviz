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
  tests?: string;
};

export type actual = {
  action: string;
  userId: string | null;
};
