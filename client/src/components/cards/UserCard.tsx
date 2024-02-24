import { Dispatch, SetStateAction } from "react";
import { DataService } from "../../services/DataService";
import { UserData } from "../../utils/types";

interface UsersCard {
  userData: UserData;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
  setUserId: Dispatch<SetStateAction<string | null>>;
}

export function UserCard({ userData, setUserId, setUsers }: UsersCard) {
  const handleDelete = () => {
    DataService.deleteData(`patient/${userData}`, setUsers);
  };

  return (
    <article>
      <h2>
        {userData.name} {userData.surname}
      </h2>
      <button
        data-patient-id={userData._id}
        onClick={(e) => {
          const { target } = e;
          setUserId(
            (target as HTMLButtonElement).getAttribute("data-patient-id")
          );
        }}
      >
        Editar
      </button>
      <button onClick={handleDelete}>Eliminar</button>
      <hr></hr>
    </article>
  );
}
