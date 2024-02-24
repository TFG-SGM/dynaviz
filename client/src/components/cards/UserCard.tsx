import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserData, actual } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { DeleteUserButton } from "../buttons/DeleteUserButton";

interface UsersCard {
  endpoint: string;
  setActual: Dispatch<SetStateAction<actual>>;
  userData: UserData;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
}

export function UserCard({
  endpoint,
  setActual,
  userData,
  setUsers,
}: UsersCard) {
  const [error, setError] = useState<string | null>(null);

  const handleView = (e: FormEvent) => {
    const { target } = e;
    setActual({
      action: "get",
      userId: (target as HTMLButtonElement).getAttribute("data-patient-id"),
    });
  };

  const handleEdit = (e: FormEvent) => {
    const { target } = e;
    setActual({
      action: "update",
      userId: (target as HTMLButtonElement).getAttribute("data-patient-id"),
    });
  };

  return (
    <article>
      <h2>
        {userData.name} {userData.surname}
      </h2>
      <button data-patient-id={userData._id} onClick={handleView}>
        Consultar
      </button>
      <button data-patient-id={userData._id} onClick={handleEdit}>
        Editar
      </button>
      <DeleteUserButton
        endpoint={endpoint}
        setUsers={setUsers}
        setError={setError}
      ></DeleteUserButton>
      {error && <ErrorComponent error={error}></ErrorComponent>}
      <hr></hr>
    </article>
  );
}
