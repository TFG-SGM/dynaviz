import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { TestData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { RecordVideoView } from "../menus/RecordVideoView";

export interface TestFormProps<T> {
  data: TestData | null;
  setNewData: Dispatch<SetStateAction<T>>;
}

export function TestForm<T>({ data, setNewData }: TestFormProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewData((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

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
        <input
          name="type"
          type="text"
          value={data.type}
          onChange={handleChange}
          required
        ></input>
      </label>
      <label>
        Video:{" "}
        <input
          name="video"
          type="file"
          accept="video/*"
          value={data.video}
          onChange={handleChange}
          required
        ></input>
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
      <RecordVideoView></RecordVideoView>
    </>
  );
}
