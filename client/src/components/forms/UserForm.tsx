import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UserData } from "../../utils/types";

export interface UserFormProps<T> {
  data: UserData | null;
  setNewData: Dispatch<SetStateAction<T>>;
  isPass: boolean;
}

export function UserForm<T>({ data, setNewData, isPass }: UserFormProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <label>
        Nombre:{" "}
        <input
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Apellidos:{" "}
        <input
          name="surname"
          type="text"
          value={data.surname}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Fecha de nacimiento:{" "}
        <input
          name="bornDate"
          type="date"
          value={data.bornDate}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Dirección:{" "}
        <input
          name="address"
          type="text"
          value={data.address}
          onChange={handleChange}
        ></input>
        <label>
          Email:{" "}
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
          ></input>
        </label>
        {isPass && (
          <label>
            Contraseña:{" "}
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
            ></input>
          </label>
        )}
        <label>
          Teléfono:{" "}
          <input
            name="phone"
            type="phone"
            value={data.phone}
            onChange={handleChange}
          ></input>
        </label>
      </label>
    </>
  );
}
