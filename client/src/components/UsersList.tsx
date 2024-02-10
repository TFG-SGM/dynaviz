import { useData } from "../hooks/useData";
import { deleteHelper } from "../utils/deleteHelper";

interface UserData {
  _id: string;
  name: string;
  subName: string;
  age: number;
}

export function UsersList() {
  const users = useData<UserData[]>("user");

  return (
    <>
      {users ? (
        <div>
          {users.map((user) => {
            return (
              <div key={user._id}>
                <p>
                  {user.name} {user.subName}. {user.age} años.
                </p>
                <button onClick={() => deleteHelper(`user/${user._id}`)}>
                  Delete
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
