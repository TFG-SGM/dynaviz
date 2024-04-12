import { UserCard } from "../cards/UserCard";
import { AddUserForm } from "../forms/AddUserForm";
import { Dispatch, SetStateAction, useState } from "react";
import { UserData, userActual } from "../../utils/types";
import { ErrorComponent } from "../other/ErrorComponent";
import { ACTUAL_USER_ENDPOINT, PATIENT_ENDPOINT } from "../../utils/constants";
import { UserMenuView } from "../menus/UserMenuView";
import { getUserType, updateDataHelper } from "../../utils/helpers";
import { useUserEndpoint } from "../../hooks/useUserEndpoint";
import { useData } from "../../hooks/useData";
import { Feedback } from "../elements/Feedback";
import { useFeedback } from "../../hooks/useFeedback";

export function UsersList({ endpoint }: { endpoint: string }) {
  const [finalEndpoint] = useUserEndpoint(endpoint);
  const [users, setUsers, error] = useData<UserData[]>(finalEndpoint);
  const [actual, setActual] = useState<userActual>({
    action: "",
    userId: "",
  });
  const [actualUser] = useData<UserData>(ACTUAL_USER_ENDPOINT);
  const [feedback, setFeedback] = useFeedback();

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
      {feedback && <Feedback feedback={feedback as string}></Feedback>}
      <button className="add-user-button" onClick={handleAdd}>
        Añadir {getUserType(endpoint)}
      </button>
      {actual.action === "add" && (
        <AddUserForm
          endpoint={endpoint}
          handleClean={handleClean}
          setUsers={setUsers}
          setFeedback={setFeedback as Dispatch<SetStateAction<string | null>>}
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
          setFeedback={setFeedback as Dispatch<SetStateAction<string | null>>}
        ></UserMenuView>
      )}

      <div className="user-list">
        {users.length === 0 ? (
          <p className="empty-text">
            ¡No hay ningún {getUserType(endpoint)?.toLowerCase()}!
          </p>
        ) : (
          users.map((user: UserData) => {
            if (actualUser?._id === user._id) return;
            return (
              <UserCard
                key={user._id}
                setActual={setActual}
                userData={user}
              ></UserCard>
            );
          })
        )}
      </div>
    </>
  );
}
