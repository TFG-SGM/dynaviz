import { FormEvent, useState } from "react";
import { useData } from "../../hooks/useData";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { ErrorComponent } from "../other/ErrorComponent";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";

export interface UpdateFormProps {
  endpoint: string;
  handleClean: () => void;
  handleUpdate: (data: UserData) => void;
  isPass: boolean;
}

export function UpdateUserForm({
  endpoint,
  handleClean,
  handleUpdate,
  isPass,
}: UpdateFormProps) {
  const [newData, setNewData] = useData<UserData>(endpoint);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.updateData<UserData>(endpoint, newData);
      handleUpdate(data);
      handleClean();
    } catch (error) {
      console.log(error);

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
