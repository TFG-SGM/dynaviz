import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { UserData } from "../../utils/types";

export interface CreateFormProps<T> {
  endpoint: string;
  setActualId: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<SetStateAction<T[] | null>>;
}

export function CreateForm<T>({
  endpoint,
  setActualId,
  setData,
}: CreateFormProps<T>) {
  const [data, setNewData] = useState<UserData>(getInitialState());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await DataService.createData<UserData>(endpoint, data, setData);
    setActualId(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <UserForm data={data} setNewData={setNewData} isPass={true}></UserForm>
        <button>Crear usuario</button>
      </form>
      <button onClick={() => setActualId(null)}>Cancelar</button>
    </>
  );
}

function getInitialState() {
  return {
    name: "",
    surname: "",
    bornDate: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  };
}
