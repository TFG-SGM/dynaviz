import { Dispatch, SetStateAction, useState } from "react";
import { UpdateForm } from "../forms/UpdateForm";
import { DeleteUserButton } from "../buttons/DeleteUserButton";
import { ErrorComponent } from "../other/ErrorComponent";
import { useData } from "../../hooks/useData";
import { UserData, actual } from "../../utils/types";
import { UserDataComponent } from "./UserDataComponent";
import { CrossButton } from "../buttons/CrossButton";

export interface UserMenuView {
  endpoint: string;
  handleClean: () => void;
  setActual: Dispatch<SetStateAction<actual>>;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
}

export function UserMenuView({
  endpoint,
  handleClean,
  setActual,
  setUsers,
}: UserMenuView) {
  const [user] = useData<UserData>(endpoint);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);

  return (
    <>
      {isUpdate ? (
        <UpdateForm
          endpoint={endpoint}
          handleClean={handleCancelUpdate}
          setUsers={setUsers}
          isPass={false}
        ></UpdateForm>
      ) : (
        <article>
          <CrossButton handleClean={handleClean}></CrossButton>
          {user && <UserDataComponent user={user}></UserDataComponent>}
          <button onClick={handleUpdate}>Actualizar</button>
          <DeleteUserButton
            endpoint={endpoint}
            setActual={setActual}
            setUsers={setUsers}
            setError={setError}
          ></DeleteUserButton>
          {error && <ErrorComponent error={error}></ErrorComponent>}
        </article>
      )}
    </>
  );
}
