import { UserCard } from "../cards/UserCard";
import { UpdateForm } from "../forms/UpdateForm";
import { CreateForm } from "../forms/CreateForm";
import { useState } from "react";
import { UserData, actual } from "../../utils/types";
import { useData } from "../../hooks/useData";
import { LoadingComponent } from "../other/LoadingComponent";
import { ErrorComponent } from "../other/ErrorComponent";
import { PATIENT_ENDPOINT } from "../../utils/constants";
import { UserMenuView } from "../menus/UserMenuView";
import { EmptyListComponent } from "../other/EmptyListComponent";

export function UsersList({ endpoint }: { endpoint: string }) {
  const [users, setUsers, error] = useData<UserData[]>(endpoint);
  const [actual, setActual] = useState<actual>({
    action: "",
    userId: "",
  });

  const handleCreate = () => setActual({ action: "create", userId: "" });
  const handleClean = () => setActual({ action: "", userId: "" });

  if (error) {
    return <ErrorComponent error={error}></ErrorComponent>;
  }

  return (
    <div>
      <button onClick={handleCreate}>Crear</button>
      {actual.action === "create" && (
        <CreateForm
          endpoint={endpoint}
          handleClean={handleClean}
          setUsers={setUsers}
          isPass={endpoint !== PATIENT_ENDPOINT}
        ></CreateForm>
      )}
      {actual.action === "update" && (
        <UpdateForm
          endpoint={endpoint + actual.userId}
          handleClean={handleClean}
          setUsers={setUsers}
          isPass={false}
        ></UpdateForm>
      )}
      {actual.action === "get" && (
        <UserMenuView
          endpoint={endpoint + actual.userId}
          setActual={setActual}
          setUsers={setUsers}
        ></UserMenuView>
      )}
      {!users ? (
        <LoadingComponent></LoadingComponent>
      ) : users.length === 0 ? (
        <EmptyListComponent></EmptyListComponent>
      ) : (
        <div>
          {users.map((user: UserData) => {
            return (
              <UserCard
                key={user._id}
                endpoint={endpoint}
                setActual={setActual}
                userData={user}
                setUsers={setUsers}
              ></UserCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
