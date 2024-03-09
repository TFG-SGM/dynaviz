import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { UserData } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";
import { INITIAL_USER } from "../../utils/constants";

export interface AddFormProps<T> {
  endpoint: string;
  handleClean: () => void;
  setUsers: Dispatch<SetStateAction<T[] | null>>;
  isPass: boolean;
}

export function AddUserForm<T>({
  endpoint,
  handleClean,
  setUsers,
  isPass,
}: AddFormProps<T>) {
  const [newData, setNewData] = useState<UserData>(INITIAL_USER);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.createData<UserData>(endpoint, newData);
      setUsers((prevState) => [...(prevState || []), data]);
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
        <UserForm
          data={newData}
          setNewData={setNewData}
          isPass={isPass}
        ></UserForm>
        <button>Añadir</button>
      </form>
      {error && <ErrorComponent error={error}></ErrorComponent>}
      <button onClick={handleClean}>Cancelar</button>
    </>
  );
}
