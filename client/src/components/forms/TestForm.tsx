import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";

export interface TestFormProps<T> {
  data: UserData | null;
  setNewData: Dispatch<SetStateAction<T>>;
  isPass: boolean;
}

export function TestForm<T>({ data, setNewData, isPass }: TestFormProps<T>) {
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
      <p>Profesional: ... </p>
      <label>
        Tipo:{" "}
        <input
          name="surname"
          type="text"
          value={data.surname}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Fecha:{" "}
        <input
          name="bornDate"
          type="date"
          value={data.bornDate}
          onChange={handleChange}
        ></input>
      </label>
    </>
  );
}
