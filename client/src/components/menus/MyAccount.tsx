import { useState } from "react";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { UserData } from "../../utils/types";
import { UserDataElement } from "../elements/UserDataElement";
import { useData } from "../../hooks/useData";
import { CrossButton } from "../buttons/CrossButton";
import { Overlay } from "../other/Overlay";

export function MyAccount({ handleClean }: { handleClean: () => void }) {
  const [user, setUser] = useData<UserData>("auth/user-data");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleStartUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);
  const handleUpdate = (data: UserData) =>
    setUser((prevState) => {
      return { ...prevState, ...data };
    });

  if (!user) return;

  return (
    <>
      {isUpdate ? (
        <UpdateUserForm
          endpoint={user.role + "/" + user._id}
          handleClean={handleClean}
          handleCancel={handleCancelUpdate}
          handleUpdate={handleUpdate}
        ></UpdateUserForm>
      ) : (
        <>
          <Overlay></Overlay>
          <dialog open className="view-menu">
            <div className="menu-title">
              <h2>Mi Cuenta</h2>
              <CrossButton handleClean={handleClean}></CrossButton>
            </div>
            {user && <UserDataElement user={user}></UserDataElement>}
            <button className="edit-button" onClick={handleStartUpdate}>
              Editar
            </button>
          </dialog>
        </>
      )}
    </>
  );
}
