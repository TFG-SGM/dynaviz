import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { PatientData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { SelectType } from "../selects/SelectType";
import { DOCTOR_ENDPOINT } from "../../utils/constants";

export interface PatientFormProps<T> {
  data: PatientData | null;
  setNewData: Dispatch<SetStateAction<T>>;
}

export function PatientForm<T>({ data, setNewData }: PatientFormProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

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
            : value,
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
        Edad:{" "}
        <input
          name="age"
          type="number"
          value={data.age}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Ciudad:{" "}
        <input
          name="city"
          type="text"
          value={data.city}
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
      <label>
        Ocupación:{" "}
        <input
          name="occupation"
          type="text"
          value={data.occupation}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Nivel de actividad física:{" "}
        <input
          name="activityLevel"
          type="number"
          value={data.activityLevel}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Años con diagnostico:{" "}
        <input
          name="diagnosisYears"
          type="number"
          value={data.diagnosisYears}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Tiene fibromialgia:{" "}
        <input
          name="isFibro"
          type="checkbox"
          checked={data.isFibro}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Selecciona el médico:{" "}
        <SelectType
          option="assignedDoctor"
          value={data.assignedDoctor}
          endpoint={DOCTOR_ENDPOINT}
          handleChange={handleChange}
        ></SelectType>
      </label>
    </>
  );
}
