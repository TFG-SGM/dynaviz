import { FormEvent, useState } from "react";
import { useData } from "../../hooks/useData";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { PatientData, UserData } from "../../utils/types";
import { LoadingComponent } from "../other/LoadingComponent";
import { ErrorComponent } from "../other/ErrorComponent";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";
import { PatientForm } from "./PatientForm";
import { PATIENT_ENDPOINT } from "../../utils/constants";
import { Overlay } from "../other/Overlay";

export interface UpdateFormProps {
  endpoint: string;
  handleClean: () => void;
  handleUpdate: (data: UserData) => void;
}

export function UpdateUserForm({
  endpoint,
  handleClean,
  handleUpdate,
}: UpdateFormProps) {
  const typeUser = endpoint.split("/")[0] + "/";
  const [newData, setNewData] = useData<UserData | PatientData>(endpoint);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.updateData<UserData | PatientData>(
        endpoint,
        newData
      );
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
      <Overlay></Overlay>
      <dialog open>
        <CrossButton handleClean={handleClean}></CrossButton>
        <form onSubmit={handleSubmit}>
          {typeUser === PATIENT_ENDPOINT ? (
            <PatientForm
              data={newData as PatientData}
              setNewData={setNewData}
            ></PatientForm>
          ) : (
            <UserForm
              data={newData as UserData}
              setNewData={setNewData}
            ></UserForm>
          )}
          <div className="buttons-container">
            <button
              className="cancel-button"
              type="button"
              onClick={handleClean}
            >
              Cancelar
            </button>
            <button>Guardar</button>
          </div>
        </form>
        {error && <ErrorComponent error={error}></ErrorComponent>}
      </dialog>
    </>
  );
}
