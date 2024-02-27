import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useData } from "../../hooks/useData";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { ErrorComponent } from "../other/ErrorComponent";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";

export interface UpdateFormProps<T> {
  endpoint: string;
  handleClean: () => void;
  setUsers: Dispatch<SetStateAction<T[] | null>>;
  isPass: boolean;
}

export function UpdateForm<T>({
  endpoint,
  handleClean,
  setUsers,
  isPass,
}: UpdateFormProps<T>) {
  const [newData, setNewData] = useData<UserData>(endpoint);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.updateData<UserData>(endpoint, newData);
      setUsers((prevState) => updateDataHelper(prevState, data));
      handleClean();
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.error);
    }
  };

  if (!newData) {
    return <LoadingComponent></LoadingComponent>;
  }

  return (
    <>
      <CrossButton handleClean={handleClean}></CrossButton>
      <form onSubmit={handleSubmit}>
        <UserForm
          data={newData}
          setNewData={setNewData}
          isPass={isPass}
        ></UserForm>
        <button>Confirmar</button>
      </form>
      {error && <ErrorComponent error={error}></ErrorComponent>}
      <button onClick={handleClean}>Cancelar</button>
    </>
  );
}

function updateDataHelper<T extends { _id: string }>(
  prevState: T[] | null,
  updatedData: T
) {
  if (!prevState) return [updatedData];

  const index = prevState.findIndex((user: T) => user._id === updatedData._id);
  const updatedState = [...prevState];
  updatedState[index] = updatedData;
  return updatedState;
}
