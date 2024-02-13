import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { URL } from "../utils/constants";
import { useData } from "../hooks/useData";

function UserForm({ userData, setUserData, handleSubmit, action }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Apellido:
        <input
          type="text"
          name="surname"
          value={userData.surname}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Edad:
        <input
          type="number"
          name="age"
          value={userData.age}
          onChange={handleChange}
        ></input>
      </label>
      <button>{action} usuario</button>
    </form>
  );
}

export function CreateUserForm({ setUsers }) {
  const [userData, setUserData] = useState({ name: "", surname: "", age: 0 });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post(`${URL}user`, userData);
    setUserData({ name: "", surname: "", age: 0 });
    setUsers((prevState) => [...prevState, data]);
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

export function UpdateUserForm({ userId, setUserId }) {
  const userData = useData(`user/${userId}`);
  const [newUserData, setNewUserData] = useState(userData);

  useEffect(() => {
    if (userData) setNewUserData(userData);
  }, [userData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.put(`${URL}user/${userId}`, newUserData);
    setUserId(null);
  };

  return (
    <>
      {newUserData ? (
        <UserForm
          userData={newUserData}
          setUserData={setNewUserData}
          handleSubmit={handleSubmit}
          action="Editar"
        ></UserForm>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
}
