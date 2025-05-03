import { useState } from "react";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { PatientData, UserData } from "../../utils/types";
import { UserDataElement } from "../elements/UserDataElement";
import { useData } from "../../hooks/useData";
import { CrossButton } from "../buttons/CrossButton";
import { Overlay } from "../other/Overlay";
import { ChangePassForm } from "../forms/ChangePassForm";
import { PatientDataElement } from "../elements/PatientDataElement";

export function MyAccount({ handleClean }: { handleClean: () => void }) {
  const [user, setUser] = useData<UserData>("auth/user-data");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isChangePassForm, setIsChangePassForm] = useState(false);

  const handleStartUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);
  const handleUpdate = (data: UserData) =>
    setUser((prevState) => {
      return { ...prevState, ...data };
    });

  const handleChangePassForm = () => setIsChangePassForm(!isChangePassForm);

  if (!user) return;

  return (
    <>
      {isChangePassForm ? (
        <ChangePassForm
          id={user._id}
          handleChangePassForm={handleChangePassForm}
        ></ChangePassForm>
      ) : isUpdate ? (
        <UpdateUserForm
          endpoint={user.role + "/" + user._id}
          handleClean={handleClean}
          handleCancel={handleCancelUpdate}
          handleUpdate={handleUpdate}
          handleChangePassForm={handleChangePassForm}
        ></UpdateUserForm>
      ) : (
        <>
          <Overlay></Overlay>
          <dialog open className="view-menu">
            <div className="menu-title">
              <h2>Mi Cuenta</h2>
              <CrossButton handleClean={handleClean}></CrossButton>
            </div>
            {user && user?.role !== "patient" ? (
              <UserDataElement user={user}></UserDataElement>
            ) : (
              <PatientDataElement
                user={user as PatientData}
              ></PatientDataElement>
            )}
            {user?.role !== "patient" && (
              <button className="edit-button" onClick={handleStartUpdate}>
                Editar
              </button>
            )}
          </dialog>
        </>
      )}
    </>
  );
}
