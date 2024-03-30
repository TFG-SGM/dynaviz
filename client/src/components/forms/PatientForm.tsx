import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PatientData } from "../../utils/types";
import { SelectType } from "../selects/SelectType";
import { DOCTOR_ENDPOINT } from "../../utils/constants";
import { useActualDoctor } from "../../hooks/useActualDoctor";

export interface PatientFormProps<T> {
  data: PatientData | null;
  setNewData: Dispatch<SetStateAction<T>>;
}

export function PatientForm<T>({ data, setNewData }: PatientFormProps<T>) {
  useActualDoctor(setNewData);

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
          name === "phone" ||
          name === "activityLevel" ||
          name === "diagnosisYears" ||
          name === "age"
            ? parseInt(value)
            : name === "isFibro"
            ? checked
            : name === "weight" || name === "height"
            ? parseFloat(value)
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
        Edad{" "}
        <input
          name="age"
          type="number"
          value={data.age}
          onChange={handleChange}
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
      <label>
        Peso{" "}
        <input
          name="weight"
          type="number"
          value={data.weight}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Altura{" "}
        <input
          name="height"
          type="number"
          value={data.height}
          onChange={handleChange}
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
        <input
          name="activityLevel"
          type="range"
          value={data.activityLevel}
          onChange={handleChange}
          min={1}
          max={5}
          required
        ></input>
        <p>
          {" "}
          {data.activityLevel < 3
            ? "😞"
            : data.activityLevel > 3
            ? "😀"
            : "😐"}{" "}
          {data.activityLevel}
        </p>
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
        <SelectType
          option="doctorId"
          value={data.doctorId}
          endpoint={DOCTOR_ENDPOINT}
          handleChange={handleChange}
        ></SelectType>
      </label>
    </>
  );
}
