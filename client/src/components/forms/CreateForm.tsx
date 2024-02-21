import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserForm } from "./UserForm";
import { createData } from "../../utils/utils";

export interface CreateFormProps<T> {
  endpoint: string;
  setActualId: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<SetStateAction<T[] | null>>;
  fields: string[];
}

export function CreateForm<T>({
  endpoint,
  setActualId,
  setData,
  fields,
}: CreateFormProps<T>) {
  const [data, setNewData] = useState<T>(generateInitialState<T>(fields));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createData(endpoint, data, setData);
    setActualId(null);
  };

  return (
    <UserForm
      data={data}
      setNewData={setNewData}
      handleSubmit={handleSubmit}
      action="Crear"
      fields={fields}
    ></UserForm>
  );
}

function generateInitialState<T>(fields: string[]): T {
  const initialState: Partial<Record<string, string | number>> = {};
  fields.forEach((field) => {
    initialState[field] = "";
  });
  return initialState as T;
}
