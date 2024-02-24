import { UserCard } from "../cards/UserCard";
import { UpdateForm } from "../forms/UpdateForm";
import { CreateForm } from "../forms/CreateForm";
import { Dispatch, SetStateAction } from "react";
import { UserData } from "../../utils/types";

interface UsersList {
  users: UserData[] | null;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
  endpoint: string;
  fields: string[];
}

export function UsersList({
  users,
  setUsers,
  userId,
  setUserId,
  endpoint,
}: UsersList) {
  return (
    <div>
      <button onClick={() => setUserId("new")}>Crear</button>
      {userId === "new" && (
        <CreateForm
          endpoint={endpoint}
          setActualId={setUserId}
          setData={setUsers}
        ></CreateForm>
      )}
      {userId && userId != "new" && (
        <UpdateForm
          endpoint={`${endpoint}/${userId}`}
          setActualId={setUserId}
          setData={setUsers}
        ></UpdateForm>
      )}
      {users ? (
        <div>
          {users.map((user: UserData) => {
            return (
              <UserCard
                key={user._id}
                userData={user}
                setUserId={setUserId}
                setUsers={setUsers}
              ></UserCard>
            );
          })}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
