import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
} from "react";
import { UserData } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { useFile } from "../../hooks/useFile";
import { IMAGE_TYPE } from "../../utils/constants";
import { LoadingComponent } from "../other/LoadingComponent";
export interface UserFormProps {
  data: UserData | null;
  setNewData: Dispatch<SetStateAction<UserData>>;
  isPass?: boolean;
  handleChangePassForm?: MouseEventHandler<HTMLButtonElement> | undefined;
  error: string | null;
}

export function UserForm({
  data,
  setNewData,
  isPass = false,
  handleChangePassForm = undefined,
  error,
}: UserFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageBlob] = useFile(data?.photo.id, IMAGE_TYPE);

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    setNewData((prevState) => {
      return {
        ...prevState,
        isPhotoChanged: true,
        prevPhoto: prevState.photo.id,
      };
    });
    reader.onload = () => {
      const imgElement = document.querySelector(
        ".photo-preview"
      ) as HTMLImageElement;
      if (!imgElement) return;
      imgElement.src = reader.result as string;
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

  const handleDeletePhoto = () => {
    setNewData((prevState) => {
      return {
        ...prevState,
        photo: { name: "", id: "" },
        isPhotoChanged: true,
        prevPhoto: prevState.photo.id,
      };
    });

    const imgElement = document.querySelector(
      ".photo-preview"
    ) as HTMLImageElement;
    if (!imgElement) return;
    imgElement.src = "";
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
      <label>
        Foto:
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
        ></input>
        {!data.photo.id ? (
          <img className="photo-preview" />
        ) : imageBlob ? (
          <>
            <img
              className="photo-preview"
              src={URL.createObjectURL(imageBlob)}
            />
          </>
        ) : (
          <LoadingComponent message="Cargando imagen"></LoadingComponent>
        )}
        <button
          type="button"
          className="remove-image-button"
          onClick={handleDeletePhoto}
        >
          Eliminar imagen
        </button>
      </label>

      {handleChangePassForm && (
        <div className="change-pass-container">
          <strong>Contraseña</strong>
          <button type="button" onClick={handleChangePassForm}>
            Cambiar contraseña
          </button>
        </div>
      )}
    </>
  );
}
