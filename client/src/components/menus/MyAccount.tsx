import { useState } from "react";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { UserData } from "../../utils/types";
import { UserDataElement } from "../elements/UserDataElement";
import { LoadingComponent } from "../other/LoadingComponent";
import { useData } from "../../hooks/useData";
import { CrossButton } from "../buttons/CrossButton";

export function MyAccount({ handleClean }: { handleClean: () => void }) {
  const [user, setUser] = useData<UserData>("auth/user-data");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleStartUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);
  const handleUpdate = (data: UserData) =>
    setUser((prevState) => {
      return { ...prevState, ...data };
    });

  if (!user) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      {isUpdate ? (
        <UpdateUserForm
          endpoint={user.role + "/" + user._id}
          handleClean={handleCancelUpdate}
          handleUpdate={handleUpdate}
        ></UpdateUserForm>
      ) : (
        <dialog open>
          <CrossButton handleClean={handleClean}></CrossButton>
          {user && <UserDataElement user={user}></UserDataElement>}
          <button onClick={handleStartUpdate}>Editar</button>
        </dialog>
      )}
    </>
  );
}
