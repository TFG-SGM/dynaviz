import axios from "axios";
import { FormEvent, useState } from "react";
import { URL } from "../utils/constants";

export function CreateUserForm() {
  const [userData, setUserData] = useState({ name: "", subName: "", age: 0 });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post(`${URL}user`, userData);
    setUserData({ name: "", subName: "", age: 0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="subName"
        value={userData.subName}
        onChange={handleChange}
      ></input>
      <input
        type="number"
        name="age"
        value={userData.age}
        onChange={handleChange}
      ></input>

      <button>Crear usuario</button>
    </form>
  );
}
