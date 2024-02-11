import { useState } from "react";
import { useData } from "../hooks/useData";
import { deleteHelper } from "../utils/deleteHelper";
import { UserData } from "../utils/types";
import { CreateUserForm, UpdateUserForm } from "./UserForm";

export function UsersList() {
  const users = useData<UserData[]>("user");
  const [userId, setUserId] = useState(null);

  return (
    <>
      <CreateUserForm></CreateUserForm>
      {userId && (
        <UpdateUserForm userId={userId} setUserId={setUserId}></UpdateUserForm>
      )}
      {users ? (
        <div>
          {users.map((user) => {
            return (
              <div key={user._id}>
                <p>
                  {user.name} {user.surname}. {user.age} años.
                </p>
                <button
                  data-user-id={user._id}
                  onClick={(e) =>
                    setUserId(e.target.getAttribute("data-user-id"))
                  }
                >
                  Editar
                </button>
                <button onClick={() => deleteHelper(`user/${user._id}`)}>
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
