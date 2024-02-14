import { useState } from "react";
import { useData } from "../hooks/useData";
import { deleteData } from "../utils/utils";
import { UserData } from "../utils/types";
import { CreateUserForm, UpdateUserForm } from "./UserForm";

export function UsersList() {
  const [users, setUsers] = useData<UserData[]>("user");
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <>
      <CreateUserForm setUsers={setUsers}></CreateUserForm>
      {userId && (
        <UpdateUserForm
          userId={userId}
          setUserId={setUserId}
          setUsers={setUsers}
        ></UpdateUserForm>
      )}
      {users ? (
        <div>
          {users.map((user: UserData) => {
            return (
              <div key={user._id}>
                <p>
                  {user.name} {user.surname}. {user.age} años.
                </p>
                <button
                  data-user-id={user._id}
                  onClick={(e) => {
                    const { target } = e;
                    setUserId(
                      (target as HTMLButtonElement).getAttribute("data-user-id")
                    );
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteData(`user/${user._id}`, setUsers)}
                >
                  Eliminar
                </button>
                <hr></hr>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
}
