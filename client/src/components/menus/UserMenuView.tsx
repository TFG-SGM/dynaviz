import { Dispatch, SetStateAction, useState } from "react";
import { UpdateForm } from "../forms/UpdateForm";
import { DeleteUserButton } from "../buttons/DeleteUserButton";
import { ErrorComponent } from "../other/ErrorComponent";
import { useData } from "../../hooks/useData";
import { UserData, actual } from "../../utils/types";
import { UserDataComponent } from "./UserDataComponent";

export interface UserMenuView {
  endpoint: string;
  setActual: Dispatch<SetStateAction<actual>>;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
}

export function UserMenuView({ endpoint, setActual, setUsers }: UserMenuView) {
  const [user] = useData<UserData>(endpoint);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = () => setIsUpdate(true);
  const handleClean = () => setIsUpdate(false);
  const handleOnBack = () => setActual({ action: "", userId: "" });

  return (
    <>
      {isUpdate ? (
        <UpdateForm
          endpoint={endpoint}
          handleClean={handleClean}
          setUsers={setUsers}
          isPass={false}
        ></UpdateForm>
      ) : (
        <article>
          <button onClick={handleOnBack}>Atrás</button>
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
