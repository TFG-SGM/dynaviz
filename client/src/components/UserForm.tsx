import axios from "axios";

import { ChangeEvent, FormEvent, useState } from "react";
import { URL } from "../utils/constants";
import { useData } from "../hooks/useData";
import {
  CreateUserFormProps,
  CreatedUserData,
  UpdateUserFormProps,
  UserData,
  UserFormProps,
} from "../utils/types";
import { updateData } from "../utils/utils";

function UserForm<T extends CreatedUserData>({
  userData,
  setUserData,
  handleSubmit,
  action,
}: UserFormProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: name === "age" ? parseInt(value) : value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={userData?.name}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Apellido:
        <input
          type="text"
          name="surname"
          value={userData?.surname}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Edad:
        <input
          type="number"
          name="age"
          value={userData?.age}
          onChange={handleChange}
        ></input>
      </label>
      <button>{action} usuario</button>
    </form>
  );
}

export function CreateUserForm({ setUsers }: CreateUserFormProps) {
  const [userData, setUserData] = useState<CreatedUserData | null>({
    name: "",
    surname: "",
    age: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post(`${URL}user`, userData);
    setUserData({ name: "", surname: "", age: 0 });
    setUsers((prevState) => [...(prevState || []), data]);
  };

  return (
    <UserForm
      userData={userData}
      setUserData={setUserData}
      handleSubmit={handleSubmit}
      action="Crear"
    ></UserForm>
  );
}

export function UpdateUserForm({
  userId,
  setUserId,
  setUsers,
}: UpdateUserFormProps) {
  const [userData, setUserData] = useData<UserData>(`user/${userId}`);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.put(`${URL}user/${userId}`, userData);
    setUserId(null);
    setUsers((prevState) => updateData(prevState, data));
  };

  return (
    <>
      {userData ? (
        <UserForm
          userData={userData}
          setUserData={setUserData}
          handleSubmit={handleSubmit}
          action="Editar"
        ></UserForm>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
}
