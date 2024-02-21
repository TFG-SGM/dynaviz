import { Dispatch, FormEvent, SetStateAction } from "react";
import { useData } from "../../hooks/useData";
import { UserForm } from "./UserForm";
import { updateData } from "../../utils/utils";

export interface UpdateFormProps<T> {
  endpoint: string;
  setActualId: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<SetStateAction<T[] | null>>;
  fields: string[];
}

export function UpdateForm<T>({
  endpoint,
  setActualId,
  setData,
  fields,
}: UpdateFormProps<T>) {
  const [data, setNewData] = useData<T>(endpoint);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateData(endpoint, data, setData);
    setActualId(null);
  };

  if (!data) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <UserForm
        data={data}
        setNewData={setNewData}
        handleSubmit={handleSubmit}
        fields={fields}
        action="Editar"
      ></UserForm>
      <button onClick={() => setActualId(null)}>Cancelar</button>
    </>
  );
}
