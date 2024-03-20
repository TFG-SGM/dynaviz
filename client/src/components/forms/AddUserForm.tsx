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

export interface AddFormProps<T> {
  endpoint: string;
  handleClean: () => void;
  setUsers: Dispatch<SetStateAction<T[] | null>>;
}

export function AddUserForm<T>({
  endpoint,
  handleClean,
  setUsers,
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
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog open>
        <CrossButton handleClean={handleClean}></CrossButton>
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
            ></UserForm>
          )}
          <div className="buttons-container">
            <button className="cancel-button" onClick={handleClean}>
              Cancelar
            </button>
            <button>Añadir</button>
          </div>
        </form>
        {error && <ErrorComponent error={error}></ErrorComponent>}
      </dialog>
    </>
  );
}
