import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TestData, TestTypeData, UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { useData } from "../../hooks/useData";
import { DOCTOR_ENDPOINT, TEST_TYPE_ENDPOINT } from "../../utils/constants";

export interface TestFormProps<T> {
  data: TestData | null;
  setNewData: Dispatch<SetStateAction<T>>;
}

export function TestForm<T>({ data, setNewData }: TestFormProps<T>) {
  const [testTypes] = useData<TestTypeData[]>(TEST_TYPE_ENDPOINT);
  const [doctors] = useData<UserData[]>(DOCTOR_ENDPOINT);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  if (!data || !testTypes || !doctors) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <>
      <label>
        Médico:{" "}
        <select
          name="doctor"
          value={data.doctor}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un médico</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Tipo:{" "}
        <select name="type" value={data.type} onChange={handleChange} required>
          <option value="">Selecciona un tipo</option>
          {testTypes.map((type, index) => (
            <option key={index} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Fecha:{" "}
        <input
          name="date"
          type="date"
          value={data.date.split("T")[0]}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
          required
        ></input>
      </label>

      <label>
        Añadir video:{" "}
        <input
          name="video"
          type="file"
          onChange={handleChange}
          accept="video/*"
          required
        ></input>
      </label>
    </>
  );
}
