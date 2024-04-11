import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { PatientData, UserData } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { AxiosError } from "axios";
import { CrossButton } from "../buttons/CrossButton";
import {
  INITIAL_PATIENT,
  INITIAL_USER,
  PATIENT_ENDPOINT,
} from "../../utils/constants";
import { PatientForm } from "./PatientForm";
import { Overlay } from "../other/Overlay";
import { getUserType } from "../../utils/helpers";

export interface AddFormProps<T> {
  endpoint: string;
  handleClean: () => void;
  setUsers: Dispatch<SetStateAction<T[] | null>>;
  setFeedback: Dispatch<SetStateAction<string | null>>;
}

export function AddUserForm<T>({
  endpoint,
  handleClean,
  setUsers,
  setFeedback,
}: AddFormProps<T>) {
  const [newData, setNewData] = useState<UserData | PatientData>(
    endpoint === PATIENT_ENDPOINT ? INITIAL_PATIENT : INITIAL_USER
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await DataService.createData<UserData | PatientData>(
        endpoint,
        newData
      );
      setUsers((prevState) => [...(prevState || []), data]);
      handleClean();
      setFeedback("Usuario añadido correctamente");
    } catch (error) {
      console.log(error);
      setFeedback("Error: Usuario no añadido correctamente");
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog open>
        <div className="menu-title">
          <h2>Nuevo {getUserType(endpoint)}</h2>
          <CrossButton handleClean={handleClean}></CrossButton>
        </div>
        <form onSubmit={handleSubmit}>
          {endpoint === PATIENT_ENDPOINT ? (
            <PatientForm
              data={newData as PatientData}
              setNewData={setNewData}
            ></PatientForm>
          ) : (
            <UserForm
              data={newData as UserData}
              setNewData={setNewData}
              isPass={true}
            ></UserForm>
          )}
          <div className="buttons-container">
            <button className="cancel-button" onClick={handleClean}>
              Cancelar
            </button>
            <button className="add-button">Añadir</button>
          </div>
        </form>
        {error && <ErrorComponent error={error}></ErrorComponent>}
      </dialog>
    </>
  );
}
