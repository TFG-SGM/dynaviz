import { UserCard } from "../cards/UserCard";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { AddUserForm } from "../forms/AddUserForm";
import { useState } from "react";
import { UserData, actual } from "../../utils/types";
import { useData } from "../../hooks/useData";
import { LoadingComponent } from "../other/LoadingComponent";
import { ErrorComponent } from "../other/ErrorComponent";
import { PATIENT_ENDPOINT } from "../../utils/constants";
import { UserMenuView } from "../menus/UserMenuView";
import { EmptyListComponent } from "../other/EmptyListComponent";
import { updateDataHelper } from "../../utils/helpers";

export function UsersList({ endpoint }: { endpoint: string }) {
  const [users, setUsers, error] = useData<UserData[]>(endpoint);
  const [actual, setActual] = useState<actual>({
    action: "",
    userId: "",
  });

  const handleAdd = () => setActual({ action: "add", userId: "" });
  const handleClean = () => setActual({ action: "", userId: "" });
  const handleUpdateList = (data: UserData) =>
    setUsers((prevState) => updateDataHelper(prevState, data));

  if (error) {
    return <ErrorComponent error={error}></ErrorComponent>;
  }

  return (
    <>
      <button className="add-user-button" onClick={handleAdd}>
        Añadir usuario
      </button>
      {actual.action === "add" && (
        <AddUserForm
          endpoint={endpoint}
          handleClean={handleClean}
          setUsers={setUsers}
        ></AddUserForm>
      )}
      {actual.action === "update" && (
        <UpdateUserForm
          endpoint={endpoint + actual.userId}
          handleClean={handleClean}
          handleUpdate={handleUpdateList}
        ></UpdateUserForm>
      )}
      {actual.action === "get" && (
        <UserMenuView
          endpoint={endpoint + actual.userId}
          handleClean={handleClean}
          setActual={setActual}
          setUsers={setUsers}
          handleUpdateList={handleUpdateList}
          isPatient={endpoint === PATIENT_ENDPOINT}
        ></UserMenuView>
      )}
      {!users ? (
        <LoadingComponent></LoadingComponent>
      ) : users.length === 0 ? (
        <EmptyListComponent></EmptyListComponent>
      ) : (
        <div className="user-list">
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
    </>
  );
}
