import { Dispatch, FormEvent, SetStateAction } from "react";
import { useData } from "../../hooks/useData";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { UserData } from "../../utils/types";

export interface UpdateFormProps<T> {
  endpoint: string;
  setActualId: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<SetStateAction<T[] | null>>;
}

export function UpdateForm<T>({
  endpoint,
  setActualId,
  setData,
}: UpdateFormProps<T>) {
  const [data, setNewData] = useData<UserData>(endpoint);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await DataService.updateData<UserData>(endpoint, data, setData);
    setActualId(null);
  };

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <UserForm data={data} setNewData={setNewData} isPass={false}></UserForm>
        <button>Actualizar usuario</button>
      </form>
      <button onClick={() => setActualId(null)}>Cancelar</button>
    </>
  );
}
