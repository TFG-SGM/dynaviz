import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { UserData } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { AxiosError } from "axios";

export interface CreateFormProps<T> {
  endpoint: string;
  handleClean: () => void;
  setUsers: Dispatch<SetStateAction<T[] | null>>;
  isPass: boolean;
}

export function CreateForm<T>({
  endpoint,
  handleClean,
  setUsers,
  isPass,
}: CreateFormProps<T>) {
  const [newData, setNewData] = useState<UserData>(getInitialState());
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.createData<UserData>(endpoint, newData);
      setUsers((prevState) => [...(prevState || []), data]);
      handleClean();
    } catch (error) {
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <UserForm
          data={newData}
          setNewData={setNewData}
          isPass={isPass}
        ></UserForm>
        <button>Crear usuario</button>
      </form>
      {error && <ErrorComponent error={error}></ErrorComponent>}
      <button onClick={handleClean}>Cancelar</button>
    </>
  );
}

function getInitialState() {
  return {
    _id: "",
    name: "",
    surname: "",
    bornDate: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  };
}
