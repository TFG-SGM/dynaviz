import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { UserData, actual } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { DeleteUserButton } from "../buttons/DeleteUserButton";
import { PATIENT_ENDPOINT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const handleViewTests = (e: FormEvent) => {
    const { target } = e;
    const userId = (target as HTMLButtonElement).getAttribute("data-user-id");
    navigate(`/app/pacientes/${userId}`);
  };

  return (
    <article>
      <h2>
        {userData.name} {userData.surname}
      </h2>
      <button data-user-id={userData._id} onClick={handleView}>
        Consultar
      </button>
      <button data-user-id={userData._id} onClick={handleEdit}>
        Editar
      </button>
      <DeleteUserButton
        endpoint={endpoint + userData._id}
        setUsers={setUsers}
        setError={setError}
      ></DeleteUserButton>
      {error && <ErrorComponent error={error}></ErrorComponent>}
      {endpoint === PATIENT_ENDPOINT && (
        <button data-user-id={userData._id} onClick={handleViewTests}>
          Pruebas
        </button>
      )}
      <hr></hr>
    </article>
  );
}
