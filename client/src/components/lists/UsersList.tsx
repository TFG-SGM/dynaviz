import { UserCard } from "../cards/UserCard";
import { AddUserForm } from "../forms/AddUserForm";
import { useEffect, useState } from "react";
import { UserData, userActual } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { PATIENT_ENDPOINT } from "../../utils/constants";
import { UserMenuView } from "../menus/UserMenuView";
import { getUserType, updateDataHelper } from "../../utils/helpers";
import { useUserEndpoint } from "../../hooks/useUserEndpoint";
import { useData } from "../../hooks/useData";
import { Feedback } from "../elements/Feedback";

export function UsersList({ endpoint }: { endpoint: string }) {
  const [finalEndpoint] = useUserEndpoint(endpoint);
  const [users, setUsers, error] = useData<UserData[]>(finalEndpoint);
  const [actual, setActual] = useState<userActual>({
    action: "",
    userId: "",
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) return;
    setTimeout(() => setFeedback(null), 2000);
  }, [feedback]);

  const handleAdd = () => setActual({ action: "add", userId: "" });
  const handleClean = () => setActual({ action: "", userId: "" });
  const handleUpdateList = (data: UserData) =>
    setUsers((prevState) => updateDataHelper(prevState, data));

  if (error) {
    return <ErrorComponent error={error}></ErrorComponent>;
  }

  if (!users) return;

  return (
    <>
      {feedback && <Feedback feedback={feedback}></Feedback>}
      <button className="add-user-button" onClick={handleAdd}>
        Añadir {getUserType(endpoint)}
      </button>
      {actual.action === "add" && (
        <AddUserForm
          endpoint={endpoint}
          handleClean={handleClean}
          setUsers={setUsers}
          setFeedback={setFeedback}
        ></AddUserForm>
      )}
      {actual.action === "get" && (
        <UserMenuView
          endpoint={endpoint + actual.userId}
          handleClean={handleClean}
          setActual={setActual}
          setUsers={setUsers}
          handleUpdateList={handleUpdateList}
          isPatient={endpoint === PATIENT_ENDPOINT}
          setFeedback={setFeedback}
        ></UserMenuView>
      )}

      <div className="user-list">
        {users.map((user: UserData) => {
          return (
            <UserCard
              key={user._id}
              setActual={setActual}
              userData={user}
            ></UserCard>
          );
        })}
      </div>
    </>
  );
}
