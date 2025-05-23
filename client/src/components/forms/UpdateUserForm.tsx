import {
  Dispatch,
  FormEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { useData } from "../../hooks/useData";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { PatientData, UserData } from "../../utils/types";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";
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
      let data = null;
      if (userType === "Paciente") {
        data = await DataService.updateData<PatientData>(
          endpoint,
          newData as PatientData
        );
      } else {
        data = await DataService.updateFormData<UserData>(
          endpoint,
          newData as UserData
        );
      }

      handleUpdate(data);
      handleCancel();
      toast.success(`${userType} actualizado correctamente`);
    } catch (error) {
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
          <UserForm
            data={newData as UserData}
            setNewData={setNewData as Dispatch<SetStateAction<UserData>>}
            handleChangePassForm={handleChangePassForm}
            error={error}
            isPatient={userType === "Paciente"}
          ></UserForm>
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
