import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
} from "react";
import { PatientData, UserData } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { useFile } from "../../hooks/useFile";
import { DOCTOR_ENDPOINT, IMAGE_TYPE } from "../../utils/constants";
import { LoadingComponent } from "../other/LoadingComponent";
import { SelectDoctor } from "../selects/SelectDoctor";
import { useActualDoctor } from "../../hooks/useActualDoctor";
export interface UserFormProps {
  data: PatientData | null;
  setNewData: Dispatch<SetStateAction<UserData>>;
  isPass?: boolean;
  handleChangePassForm?: MouseEventHandler<HTMLButtonElement> | undefined;
  error: string | null;
  isPatient: boolean;
}

export function UserForm({
  data,
  setNewData,
  isPass = false,
  handleChangePassForm = undefined,
  error,
  isPatient,
}: UserFormProps) {
  useActualDoctor(setNewData);

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
      const removeImgButton = document.querySelector(".remove-image-button");

      if (!imgElement) return;
      imgElement.src = reader.result as string;
      removeImgButton?.classList.remove("hidden");
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setNewData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]:
          name === "diagnosisYears"
            ? parseInt(value)
            : name === "isFibro"
            ? checked
            : name === "weight" || name === "height"
            ? parseFloat(value)
            : value,
      };
    });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    const removeImgButton = document.querySelector(".remove-image-button");
    if (!imgElement) return;
    imgElement.src = "";
    removeImgButton?.classList.add("hidden");
  };

  if (!data) return;

  return (
    <>
      <label>
        Nombre*{" "}
        <input
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Apellidos*{" "}
        <input
          name="surname"
          type="text"
          value={data.surname}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Fecha de nacimiento*{" "}
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
        Ciudad*{" "}
        <input
          name="city"
          type="text"
          value={data.city}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Email*{" "}
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
        Teléfono*{" "}
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
          Contraseña*{" "}
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            required
          ></input>
        </label>
      )}
      {isPatient && (
        <>
          <label>
            Peso (kg){" "}
            <input
              name="weight"
              type="number"
              step="0.01"
              value={data.weight}
              onChange={handleChange}
              min="0"
              required
            ></input>
          </label>
          <label>
            Altura (cm){" "}
            <input
              name="height"
              type="number"
              step="0.01"
              value={data.height}
              onChange={handleChange}
              min="0"
              required
            ></input>
          </label>
          <label>
            Ocupación{" "}
            <input
              name="occupation"
              type="text"
              value={data.occupation}
              onChange={handleChange}
              required
            ></input>
          </label>
          <label>
            Nivel de actividad física
            <select
              name="activityLevel"
              value={data.activityLevel}
              onChange={handleChange}
              required
            >
              <option value="leve">Leve</option>
              <option value="moderado">Moderado</option>
              <option value="activo">Activo</option>
            </select>
          </label>
          <label>
            Años con diagnostico{" "}
            <input
              name="diagnosisYears"
              type="number"
              value={data.diagnosisYears}
              onChange={handleChange}
              required
            ></input>
          </label>
          <label className="fibro-label">
            Tiene fibromialgia{" "}
            <input
              className="fibro-input"
              name="isFibro"
              type="checkbox"
              checked={data.isFibro}
              onChange={handleChange}
              role="switch"
            ></input>
          </label>
          <label>
            Médico{" "}
            <SelectDoctor
              option="doctorId"
              value={data.doctorId}
              endpoint={DOCTOR_ENDPOINT}
              handleChange={handleChange}
            ></SelectDoctor>
          </label>
        </>
      )}
      <label>
        Foto
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
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
          className={`remove-image-button ${!imageBlob && "hidden"}`}
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
