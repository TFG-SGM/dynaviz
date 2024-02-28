import { Dispatch, SetStateAction, useState } from "react";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { UserData } from "../../utils/types";
import { UserDataComponent } from "./UserDataComponent";

interface ActualUserViewProps {
  user: UserData;
  setUser: Dispatch<SetStateAction<UserData | null>>;
}

export function ActualUserView({ user, setUser }: ActualUserViewProps) {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleStartUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);
  const handleUpdate = (data: UserData) =>
    setUser((prevState) => {
      return { ...prevState, ...data };
    });
  return (
    <>
      {isUpdate ? (
        <UpdateUserForm
          endpoint={user.role + "/" + user._id}
          handleClean={handleCancelUpdate}
          handleUpdate={handleUpdate}
          isPass={false}
        ></UpdateUserForm>
      ) : (
        <article>
          {user && <UserDataComponent user={user}></UserDataComponent>}
          <button onClick={handleStartUpdate}>Editar</button>
        </article>
      )}
    </>
  );
}
