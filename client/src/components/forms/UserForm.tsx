import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from "react";
import { UserData } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
export interface UserFormProps<T> {
  data: UserData | null;
  setNewData: Dispatch<SetStateAction<T>>;
  isPass?: boolean;
  handleChangePassForm?: MouseEventHandler<HTMLButtonElement> | undefined;
  error: string | null;
}

export function UserForm<T>({
  data,
  setNewData,
  isPass = false,
  handleChangePassForm = undefined,
  error,
}: UserFormProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: name === "age" ? parseInt(value) : value,
      };
    });
  };

  if (!data) return;

  return (
    <>
      <label>
        Nombre{" "}
        <input
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Apellidos{" "}
        <input
          name="surname"
          type="text"
          value={data.surname}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Edad{" "}
        <input
          name="age"
          type="number"
          value={data.age}
          onChange={handleChange}
          min="0"
          required
        ></input>
      </label>
      <label>
        Ciudad{" "}
        <input
          name="city"
          type="text"
          value={data.city}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Email{" "}
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required
        ></input>
        {error && <ErrorComponent error={error}></ErrorComponent>}
      </label>
      <label>
        Teléfono{" "}
        <input
          name="phone"
          pattern="[0-9]{9}"
          value={data.phone}
          onChange={handleChange}
          required
        ></input>
      </label>
      {isPass && (
        <label>
          Contraseña{" "}
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            required
          ></input>
        </label>
      )}
      {handleChangePassForm && (
        <button
          type="button"
          className="change-pass-button"
          onClick={handleChangePassForm}
        >
          Cambiar contraseña
        </button>
      )}
    </>
  );
}
