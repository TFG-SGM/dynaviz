import { Dispatch, SetStateAction, useState } from "react";
import { UpdateUserForm } from "../forms/UpdateUserForm";
import { DeleteUserButton } from "../buttons/DeleteUserButton";
import { ErrorComponent } from "../other/ErrorComponent";
import { useData } from "../../hooks/useData";
import { PatientData, UserData, actual } from "../../utils/types";
import { UserDataElement } from "../elements/UserDataElement";
import { CrossButton } from "../buttons/CrossButton";
import { TestsViewButton } from "../buttons/TestsViewButton";
import { PatientDataElement } from "../elements/PatientDataElement";
import { Overlay } from "../other/Overlay";
import { ACTUAL_USER_ENDPOINT } from "../../utils/constants";
import { DeleteMenu } from "./DeleteMenu";
import { DataService } from "../../services/DataService";

export interface UserMenuView {
  endpoint: string;
  handleClean: () => void;
  setActual: Dispatch<SetStateAction<actual>>;
  setUsers: Dispatch<SetStateAction<UserData[] | null>>;
  handleUpdateList: (data: UserData) => void;
  isPatient?: boolean;
}

export function UserMenuView({
  endpoint,
  handleClean,
  setActual,
  setUsers,
  handleUpdateList,
  isPatient = false,
}: UserMenuView) {
  const [actualUser] = useData<UserData>(ACTUAL_USER_ENDPOINT);
  const [user, setUser] = useData<UserData | PatientData>(endpoint);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const handleStartDelete = () => setIsDelete(true);
  const handleCancelDelete = () => setIsDelete(false);

  const handleStartUpdate = () => setIsUpdate(true);
  const handleCancelUpdate = () => setIsUpdate(false);

  const handleUpdate = (data: UserData) => {
    setUser(data);
    handleUpdateList(data);
  };

  const handleDelete = async () => {
    const data = await DataService.deleteData(endpoint);
    setUsers((prevState) =>
      prevState
        ? prevState.filter((dataDict) => dataDict._id !== data)
        : prevState
    );
    if (setActual) setActual({ action: "", userId: "" });
  };

  if (!user) return;
  return (
    <>
      <Overlay></Overlay>
      {isUpdate ? (
        <UpdateUserForm
          endpoint={endpoint}
          handleClean={handleClean}
          handleCancel={handleCancelUpdate}
          handleUpdate={handleUpdate}
        ></UpdateUserForm>
      ) : (
        <dialog className="view-menu" open>
          <>
            {isDelete && (
              <DeleteMenu
                handleDelete={handleDelete}
                handleClean={handleCancelDelete}
              ></DeleteMenu>
            )}
            <CrossButton handleClean={handleClean}></CrossButton>
            {isPatient ? (
              <PatientDataElement
                user={user as PatientData}
              ></PatientDataElement>
            ) : (
              <UserDataElement user={user as UserData}></UserDataElement>
            )}
            <div className="buttons-container">
              <button className="delete-button" onClick={handleStartDelete}>
                Eliminar
              </button>
              <button onClick={handleStartUpdate}>Editar</button>
              {isPatient && actualUser?.role !== "admin" && (
                <TestsViewButton userId={user?._id}></TestsViewButton>
              )}
            </div>
          </>
        </dialog>
      )}
    </>
  );
}
