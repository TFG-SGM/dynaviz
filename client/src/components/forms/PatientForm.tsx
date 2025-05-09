import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PatientData } from "../../utils/types";
import { DOCTOR_ENDPOINT } from "../../utils/constants";
import { useActualDoctor } from "../../hooks/useActualDoctor";
import { ErrorComponent } from "../other/ErrorComponent";
import { SelectDoctor } from "../selects/SelectDoctor";

export interface PatientFormProps {
  data: PatientData | null;
  setNewData: Dispatch<SetStateAction<PatientData>>;
  error: string | null;
}

export function PatientForm({ data, setNewData, error }: PatientFormProps) {
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
  );
}
