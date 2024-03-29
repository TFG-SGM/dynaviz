import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserData, actual } from "../../utils/types";

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
  const { _id, name, surname } = userData;
  const [error, setError] = useState<string | null>(null);

  const handleView = (e: FormEvent) => {
    const { target } = e;
    const userId = (target as HTMLButtonElement).getAttribute("data-user-id");

    setActual({
      action: "get",
      userId,
    });
  };

  const handleEdit = (e: FormEvent) => {
    const { target } = e;
    setActual({
      action: "update",
      userId: (target as HTMLButtonElement).getAttribute("data-user-id"),
    });
  };

  return (
    <h2 className="user-card" data-user-id={_id} onClick={handleView}>
      {name} {surname}
    </h2>
  );
}

/*
    <article>
      <button data-user-id={_id} onClick={handleView}>
        Consultar
      </button>
      <button data-user-id={_id} onClick={handleEdit}>
        Editar
      </button>
      <DeleteUserButton
        endpoint={endpoint + _id}
        setUsers={setUsers}
        setError={setError}
      ></DeleteUserButton>
      
      {error && <ErrorComponent error={error}></ErrorComponent>}
      {endpoint === PATIENT_ENDPOINT && (
        <TestsViewButton userId={_id}></TestsViewButton>
      )}
      
      <hr></hr>
    </article>
    */
