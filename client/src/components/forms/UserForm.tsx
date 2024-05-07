import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imgElement = document.querySelector(".profile");
      if (!imgElement) return;
      imgElement.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "photo") handleChangeImg(e);
    setNewData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]:
          name === "photo" && inputRef.current && inputRef.current.files
            ? inputRef.current.files[0]
            : value,
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
        Fecha de nacimiento{" "}
        <input
          name="date"
          type="date"
          value={data.date.split("T")[0] as string}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
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
      <div>
        <label>
          Foto:
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
          ></input>
        </label>
        <img className="profile"></img>
        {handleChangePassForm && (
          <button
            type="button"
            className="change-pass-button"
            onClick={handleChangePassForm}
          >
            Cambiar contraseña
          </button>
        )}
      </div>
    </>
  );
}
