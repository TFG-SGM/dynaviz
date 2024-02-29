import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";

export interface TestFormProps<T> {
  data: UserData | null;
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
        ></input>
      </label>
      <label>
        Tipo:{" "}
        <input
          name="type"
          type="text"
          value={data.type}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Video:{" "}
        <input
          name="video"
          type="text"
          value={data.video}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Fecha:{" "}
        <input
          name="date"
          type="date"
          value={data.date}
          onChange={handleChange}
        ></input>
      </label>
    </>
  );
}
