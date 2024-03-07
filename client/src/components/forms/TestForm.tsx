import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TestData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { RecordVideoView, RecordView } from "../menus/RecordVideoView";
import { TEST_TYPES } from "../../utils/constants";

export interface TestFormProps<T> {
  data: TestData | null;
  setNewData: Dispatch<SetStateAction<T>>;
}

export function TestForm<T>({ data, setNewData }: TestFormProps<T>) {
  const [isRecord, setIsRecord] = useState(false);
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

  const handleRecordWindow = () => setIsRecord(true);
  const handleClean = () => setIsRecord(false);

  if (!data) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <>
      <label>
        Médico:{" "}
        <input
          name="doctor"
          type="text"
          value={data.doctor}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Tipo:{" "}
        <select name="type" value={data.type} onChange={handleChange} required>
          <option value="">Selecciona un tipo</option>
          {TEST_TYPES.map((option, index) => (
            <option key={index} value={option}>
              {option}
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
