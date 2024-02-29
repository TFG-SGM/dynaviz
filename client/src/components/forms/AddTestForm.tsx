import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { DataService } from "../../services/DataService";
import { UserData } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";
import { INITIAL_TEST } from "../../utils/constants";
import { TestForm } from "./TestForm";

export interface AddTestProps<T> {
  endpoint: string;
  handleClean: () => void;
  setTests: Dispatch<SetStateAction<T[] | null>>;
}

export function AddTestForm<T>({
  endpoint,
  handleClean,
  setTests,
}: AddTestProps<T>) {
  const [newData, setNewData] = useState<UserData>(INITIAL_TEST);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.createData<UserData>(endpoint, newData);
      setTests((prevState) => {
        return { ...prevState, tests: data._id };
      });
      handleClean();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <>
      <CrossButton handleClean={handleClean}></CrossButton>
      <form onSubmit={handleSubmit}>
        <TestForm data={newData} setNewData={setNewData}></TestForm>
        <button>Añadir</button>
      </form>
      {error && <ErrorComponent error={error}></ErrorComponent>}
      <button onClick={handleClean}>Cancelar</button>
    </>
  );
}
