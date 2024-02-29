import { Dispatch, SetStateAction, useState } from "react";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { DeleteUserButton } from "../buttons/DeleteUserButton";
import { ErrorComponent } from "../other/ErrorComponent";
import { useData } from "../../hooks/useData";
import { UserData, actual } from "../../utils/types";
import { UserDataComponent } from "./UserDataComponent";
import { CrossButton } from "../buttons/CrossButton";
import { TestsViewButton } from "../buttons/TestsViewButton";

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
  const [user, setUser] = useData<UserData>(endpoint);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);
  const handleUpdate = (data: UserData) => {
    setUser(data);
    handleUpdateList(data);
  };

  return (
    <>
      {isUpdate ? (
        <UpdateUserForm
          endpoint={endpoint}
          handleClean={handleCancelUpdate}
          handleUpdate={handleUpdate}
          isPass={false}
        ></UpdateUserForm>
      ) : (
        <article>
          <CrossButton handleClean={handleClean}></CrossButton>
          {user && <UserDataComponent user={user}></UserDataComponent>}
          <button onClick={handleStartUpdate}>Editar</button>
          {user && isPatient && (
            <TestsViewButton userId={user?._id}></TestsViewButton>
          )}
          <DeleteUserButton
            endpoint={endpoint}
            setActual={setActual}
            setError={setError}
            setUsers={setUsers}
          ></DeleteUserButton>
          {error && <ErrorComponent error={error}></ErrorComponent>}
        </article>
      )}
    </>
  );
}
