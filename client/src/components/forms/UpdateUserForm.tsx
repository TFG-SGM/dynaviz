import { FormEvent, MouseEventHandler, useState } from "react";
import { useData } from "../../hooks/useData";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { PatientData, UserData } from "../../utils/types";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";
import { PatientForm } from "./PatientForm";
import { Overlay } from "../other/Overlay";
import { getUserType } from "../../utils/helpers";
import { toast } from "sonner";

export interface UpdateFormProps {
  endpoint: string;
  handleClean: () => void;
  handleCancel: () => void;
  handleUpdate: (data: UserData) => void;
  handleChangePassForm?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export function UpdateUserForm({
  endpoint,
  handleClean,
  handleCancel,
  handleUpdate,
  handleChangePassForm = undefined,
}: UpdateFormProps) {
  const userType = getUserType(endpoint.split("/")[0] + "/");
  const [newData, setNewData] = useData<UserData | PatientData>(endpoint);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.updateFormData<UserData | PatientData>(
        endpoint,
        newData
      );
      handleUpdate(data);
      handleCancel();
      toast.success(`${userType} actualizado correctamente`);
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${userType} no actualizado correctamente`);
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  if (!newData) return;

  return (
    <>
      <Overlay></Overlay>
      <dialog open>
        <div className="menu-title">
          <h2>Editar {userType}</h2>
          <CrossButton handleClean={handleClean}></CrossButton>
        </div>
        <form onSubmit={handleSubmit}>
          {userType === "Paciente" ? (
            <PatientForm
              data={newData as PatientData}
              setNewData={setNewData}
              error={error}
            ></PatientForm>
          ) : (
            <UserForm
              data={newData as UserData}
              setNewData={setNewData}
              handleChangePassForm={handleChangePassForm}
              error={error}
            ></UserForm>
          )}
          <div className="buttons-container">
            <button
              className="cancel-button"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button>Guardar</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
