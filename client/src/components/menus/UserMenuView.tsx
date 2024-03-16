import { Dispatch, SetStateAction, useState } from "react";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { DeleteUserButton } from "../buttons/DeleteUserButton";
import { ErrorComponent } from "../other/ErrorComponent";
import { useData } from "../../hooks/useData";
import { PatientData, UserData, actual } from "../../utils/types";
import { UserDataElement } from "../elements/UserDataElement";
import { CrossButton } from "../buttons/CrossButton";
import { TestsViewButton } from "../buttons/TestsViewButton";
import { PatientDataElement } from "../elements/PatientDataElement";

export interface UserMenuView {
  endpoint: string;
  handleClean: () => void;
  setActual: Dispatch<SetStateAction<actual>>;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
  handleUpdateList: (data: UserData) => void;
  isPatient?: boolean;
}

export function UserMenuView({
  endpoint,
  handleClean,
  setActual,
  setUsers,
  handleUpdateList,
  isPatient = false,
}: UserMenuView) {
  const [user, setUser] = useData<UserData | PatientData>(endpoint);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);
  const handleUpdate = (data: UserData) => {
    setUser(data);
    handleUpdateList(data);
  };

  if (!user) return;
  return (
    <dialog open>
      {isUpdate ? (
        <UpdateUserForm
          endpoint={endpoint}
          handleClean={handleCancelUpdate}
          handleUpdate={handleUpdate}
        ></UpdateUserForm>
      ) : (
        <article>
          <CrossButton handleClean={handleClean}></CrossButton>
          {isPatient ? (
            <PatientDataElement user={user as PatientData}></PatientDataElement>
          ) : (
            <UserDataElement user={user as UserData}></UserDataElement>
          )}
          <button onClick={handleStartUpdate}>Editar</button>
          {isPatient && <TestsViewButton userId={user?._id}></TestsViewButton>}
          <DeleteUserButton
            endpoint={endpoint}
            setActual={setActual}
            setError={setError}
            setUsers={setUsers}
          ></DeleteUserButton>
          {error && <ErrorComponent error={error}></ErrorComponent>}
        </article>
      )}
    </dialog>
  );
}
