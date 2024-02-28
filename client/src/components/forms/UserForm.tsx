import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";

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
        [name]: name === "phone" ? parseInt(value) : value,
      };
    });
  };

  if (!data) {
    return <LoadingComponent></LoadingComponent>;
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
          required
        ></input>
      </label>
      <label>
        Apellidos:{" "}
        <input
          name="surname"
          type="text"
          value={data.surname}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Fecha de nacimiento:{" "}
        <input
          name="bornDate"
          type="date"
          value={data.bornDate.split("T")[0]}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
          required
        ></input>
      </label>
      <label>
        Dirección:{" "}
        <input
          name="address"
          type="text"
          value={data.address}
          onChange={handleChange}
          required
        ></input>
        <label>
          Email:{" "}
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            required
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
              required
            ></input>
          </label>
        )}
        <label>
          Teléfono:{" "}
          <input
            name="phone"
            pattern="[0-9]{9}"
            value={data.phone}
            onChange={handleChange}
            required
          ></input>
        </label>
      </label>
    </>
  );
}
