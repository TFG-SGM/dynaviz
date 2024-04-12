import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserForm } from "./UserForm";
import { DataService } from "../../services/DataService";
import { PatientData, UserData } from "../../utils/types";
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
  const userType = getUserType(endpoint);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsDisabled(true);
      const data = await DataService.createData<UserData | PatientData>(
        endpoint,
        newData
      );
      setUsers((prevState) => [...(prevState || []), data]);
      handleClean();
      setFeedback(`${userType} añadido correctamente`);
    } catch (error) {
      setIsDisabled(false);
      console.log(error);
      setFeedback(`Error: ${userType} no añadido correctamente.`);
      if (error instanceof AxiosError && error.response)
        setError(error.response.data.message);
    }
  };

  return (
    <>
      <Overlay></Overlay>
      <dialog open>
        <div className="menu-title">
          <h2>Nuevo {userType}</h2>
          <CrossButton handleClean={handleClean}></CrossButton>
        </div>
        <form onSubmit={handleSubmit}>
          {endpoint === PATIENT_ENDPOINT ? (
            <PatientForm
              data={newData as PatientData}
              setNewData={setNewData}
              error={error}
            ></PatientForm>
          ) : (
            <UserForm
              data={newData as UserData}
              setNewData={setNewData}
              isPass={true}
              error={error}
            ></UserForm>
          )}
          <div className="buttons-container">
            {isDisabled && <p className="loading">Añadiendo {userType}</p>}
            <button
              className="cancel-button"
              onClick={handleClean}
              disabled={isDisabled}
            >
              Cancelar
            </button>
            <button className="add-button" disabled={isDisabled}>
              Añadir
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
